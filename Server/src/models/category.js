const {DataTypes}=require("sequelize");
module.exports=(sequelize)=>sequelize.define("category",{id:{type:DataTypes.INTEGER,autoIncrement:true,primaryKey:true},name:{type:DataTypes.STRING(100),allowNull:false,unique:true}},{tableName:"categories",timestamps:false});
