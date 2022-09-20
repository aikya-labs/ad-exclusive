import mongoose from "mongoose";

require("dotenv").config();
const mongourl = process.env.MONGOURI;
const config = {
  useNewUrlParser: true,
};
mongoose.connect(mongourl, (err) => {
  if (err) {
    console.log("error in connecting to mongoose", err);
    return;
  }
  console.log("connected to mongoose on ", mongourl);
});
