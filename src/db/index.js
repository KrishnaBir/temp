import mongoose from "mongoose";
import { DB_NAME } from "../constant.js"

// import express from "express"
// const app = express();

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);

    // app.on("error", (e) => {
    //   console.log('error after DB connection: ', e);
    //   throw e;
    // });

    // app.listen(process.env.PORT, () => {
    //   console.log(`listening @port: ${process.env.PORT}`);
    // })
    
    console.log(`\n DB Host: ${connectionInstance.connection.host}`);


  }
  catch (err) {
    console.log("error connecting to database", err);
    process.exit(1)
  }
}

export default connectDB;