import mongoose from "mongoose";
import { DB_NAME } from "./constant.js";

import express from "express"
const app = express();

(async ()=>{
  try{
    await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
    
    app.on("error", (e)=>{
      console.log('error after DB connection: ', e);
      throw e
    })

    app.listen(process.env.PORT, ()=>{
      console.log(`listening @port: ${process.env.PORT}`);
    })
  }
  catch(err){
    console.log("error while connecting to DB: ",err);
  }
})

();