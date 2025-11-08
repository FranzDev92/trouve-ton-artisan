const express=require("express");
const router=express.Router();
const {Artisan,Specialty,Category}=require("../models");
const Joi=require("joi");
const rateLimit=require("express-rate-limit");
const nodemailer=require("nodemailer");

router.get("/categories",async(req,res)=>{const cats=await Category.findAll({order:[["name","ASC"]]});res.json(cats);});

router.get("/artisans",async(req,res)=>{
  const {categoryId,q}=req.query;
  const where={};
  if(q){where.name={[Artisan.sequelize.Op.like]:`%${q}%`};}
  const include=[{model:Specialty,include:[Category]}];
  if(categoryId){include[0].where={category_id:categoryId};}
  const rows=await Artisan.findAll({where,include,order:[["rating","DESC"]]});
  res.json(rows.map(a=>({id:a.id,name:a.name,rating:a.rating,locality:a.locality,picture_url:a.picture_url,website:a.website,specialty:{id:a.specialty.id,name:a.specialty.name,category:a.specialty.category}})));
});

router.get("/artisans/:id",async(req,res)=>{
  const a=await Artisan.findByPk(req.params.id,{include:[{model:Specialty,include:[Category]}]});
  if(!a)return res.status(404).json({error:"Not found"});
  res.json({id:a.id,name:a.name,rating:a.rating,locality:a.locality,picture_url:a.picture_url,website:a.website,about:a.about,email:a.email,specialty:{id:a.specialty.id,name:a.specialty.name,category:a.specialty.category}});
});

const contactLimiter=rateLimit({windowMs:15*60*1000,max:20,standardHeaders:true,legacyHeaders:false});
router.post("/artisans/:id/contact",contactLimiter,async(req,res)=>{
  const schema=Joi.object({name:Joi.string().min(2).max(100).required(),email:Joi.string().email().required(),subject:Joi.string().min(3).max(150).required(),message:Joi.string().min(10).max(2000).required()});
  const v=schema.validate(req.body);if(v.error)return res.status(400).json({error:v.error.message});
  const a=await Artisan.findByPk(req.params.id);if(!a||!a.email)return res.status(404).json({error:"Not found"});
  try{
    const transporter=nodemailer.createTransport({
      host:process.env.SMTP_HOST||"localhost",
      port:process.env.SMTP_PORT?+process.env.SMTP_PORT:1025,
      secure:false,
      auth:process.env.SMTP_USER?{user:process.env.SMTP_USER,pass:process.env.SMTP_PASS}:undefined
    });
    const html=`<p>Nouveau message via Trouve ton artisan</p><ul><li>De: ${v.value.name} (${v.value.email})</li><li>Sujet: ${v.value.subject}</li></ul><pre style="white-space:pre-wrap">${v.value.message}</pre>`;
    await transporter.sendMail({from:process.env.MAIL_FROM||"no-reply@tta.local",to:a.email,subject:`[TTA] ${v.value.subject}`,html});
    res.json({ok:true});
  }catch(e){console.error(e);res.status(500).json({error:"Send failed"});}
});

module.exports=router;
