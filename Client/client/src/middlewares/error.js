// 404
function notFound(req,res,next){
  res.status(404).json({error:"Not found"});
}

// handler centralisé
function errorHandler(err,req,res,next){
  console.error(err);
  if (err.message === "Not allowed by CORS") {
    return res.status(403).json({error:"CORS forbidden"});
  }
  res.status(500).json({error:"Internal Server Error"});
}

module.exports = { notFound, errorHandler };
