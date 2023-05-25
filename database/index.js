import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

// const DATABASE = process.env.DATABASE;

// connecting to the database
try {
  await mongoose.connect("mongodb+srv://jpsabile:VUNVL7QcJ2tYPbZr@jpsabile.nvysktb.mongodb.net/clearME?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("\nConnected to mongodb database.");
} catch (e) {
  console.log(`\nCannot connect to mongodb database.\nError:${e}`);
}

// Initialize server
const app = express();

// Plugin for reading JSON payloads
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Import router
import router from "./router.js";
router(app);

// Server listens at Port 3001
app.listen(3001, () => {
  console.log("API listening at port 3001.");
});
