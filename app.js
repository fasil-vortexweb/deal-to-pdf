import express from "express";

import {
  fetchDealDetails,
  processDeal,
  isValidDealEvent,
} from "./utils/index.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/webhook", async (req, res) => {
  const data = req.body;
  const dealId = Number(data?.data?.FIELDS?.ID);

  try {
    if (isValidDealEvent(data)) {
      const deal = await fetchDealDetails(dealId);
      if (deal) processDeal(deal, dealId);
    }

    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(500);
  }
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
