import express from "express";
import AdUtils from "./utils/Ad";
require("dotenv").config();
require("./config/mongoose");
import cors from 'cors';
const app = express();
app.use(cors);
const port = process.env.port || 3002;

app.get("/fetch-ad", async (req, res) => {
  try {
    let { categoryId } = req.query;

    let slotData = await AdUtils.mainFetcher({
      categoryId,
      ipAddress: req.ip,
      requestUrl: req.query.requestUrl || "",
    });

    return res.send({ slotData });
  } catch (e) {
    console.log("error in fetching ad ", e);
    return res.send({
      status: false,
      message: "Technical Error In Fetching Ad.",
    });
  }
});

app.get("/click-ad", async (req, res) => {
  try {
    let { adId, requestUrl } = req.query;

    let data = await AdUtils.adClickHandler({
      adId,
      ipAddress: req.ip,
      requestUrl,
    });

    return res.send(data);
  } catch (e) {
    console.log("error in clicking ad", e);
    return res.send({ status: false });
  }
});

app.listen(port, () => {
  console.log("server runnning at port 🚀🚀🚀🚀", port);
});
