const {DataTypes}=require("sequelize");
module.exports=(sequelize)=>sequelize.define("specialty",{id:{type:DataTypes.INTEGER,autoIncrement:true,primaryKey:true},name:{type:DataTypes.STRING(120),allowNull:false},category_id:{type:DataTypes.INTEGER,allowNull:false}},{tableName:"specialties",timestamps:false});
