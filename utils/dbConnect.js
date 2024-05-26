const {default:mongoose}=require("mongoose");
const dotenv=require('dotenv').config();

const db_username=process.env.DB_USERNAME || '';
const db_passwords=process.env.DB_PASSWORD || '';
const db_cluster=process.env.DB_CLUSTER || '';
const db_name=process.env.DB_NAME || '';
const cloudMongoUrl=`mongodb+srv://${db_username}:${db_passwords}@${db_cluster}/${db_name}?retryWrites=true&w=majority&appName=Cluster0`;
const dbConnection=async()=>{
    try{
        await mongoose.connect(cloudMongoUrl,{
            useNewUrlParser:true
        })
        console.log("DB connected successfully") 
    }
    catch(error){
        console.log(error)
    }
}
module.exports=dbConnection
