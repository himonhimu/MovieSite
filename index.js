const express = require("express");
const connectDB = require("./config/config");
require('dotenv').config()
const app = express();


app.listen(process.env.PROT, async ()=>{
    console.log(`serveris running at http://localhost:${process.env.PROT}`);
    await connectDB()
})