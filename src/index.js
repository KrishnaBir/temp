// require('dotenv').config({path:'./env'})
import connectDB from "./db/index.js";

import dotenv from 'dotenv'
dotenv.config({
  path:'./env'
})



connectDB()
.then(() => {
  app.on("error", (e) => {
      console.log('error after DB connection: ', e);
      throw e;
    });

    app.listen(process.env.PORT || 8000, () => {
      console.log(`listening @port: ${process.env.PORT}`);
    })
})
.catch((err) =>{
  console.log("MongoDB connection failed ", err);
})