const express = require("express");
const app = express();
require ("dotenv").config();
const PORT = process.env.PORT || 5000;
const connectDB = require("./DB/connect");
const mongoose = require("mongoose");
mongoose.set('strictQuery', true);
const products_routes = require("./routes/products")

app.get("/",(req, res)=>{
    res.send("hi, i am Live")
});

app.use("/api/products", products_routes);

const Start = async()=>{
    try{
        await connectDB(process.env.MONGODB_URL)
        app.listen(PORT,()=>{
            console.log(`yes i am connected to prot ${PORT}`);
        })
        
    }
    catch(err){
        console.log(err);
    }
};

Start();