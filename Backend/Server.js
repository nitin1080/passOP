const express =require("express");
const dotenv=require("dotenv");
const bodyparser = require("body-parser");
const {MongoClient}=require("mongodb");
const cors = require("cors");

dotenv.config();
const dbName="passwordManager";
const app = express();
app.use(bodyparser.json());
const client= new MongoClient(process.env.MONGO_URL);
client.connect();
app.use(cors());

app.get("/",async(req,res)=>{
    const db=client.db(dbName);
    const collection=db.collection("passwords");
    const findResult=await collection.find({}).toArray();
    res.json(findResult);
})

app.post("/",async(req,res)=>{
    const passwords=req.body;
    const db=client.db(dbName);
    const collection=db.collection("passwords");
    const findResult=await collection.insertOne(passwords);
    res.send({success:true,result:findResult});
})

app.delete("/",async(req,res)=>{
    const password=req.body;
    const db=client.db(dbName);
    const collection=db.collection("passwords");
    const findResult=await collection.deleteOne(password);
    res.send({success:true,result:findResult});
})

app.listen(3000,()=>{
    console.log(`App listening on port 3000...`);
});