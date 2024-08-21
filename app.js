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
  const { data } = req.body;
  const dealId = Number(data?.FIELDS?.ID);
  console.log(dealId);

  if (!dealId) {
    console.error("Invalid data received: Missing deal ID.");
    return res
      .status(400)
      .json({ error: "Invalid data received: Missing deal ID." });
  }

  try {
    const deal = await fetchDealDetails(dealId);

    if (!deal) {
      console.warn(`Deal not found: ID ${dealId}`);
      return res.status(404).json({ error: "Deal not found." });
    }

    processDeal(deal, dealId);
    console.log("Deal processed: ", deal);

    res.sendStatus(200);
  } catch (error) {
    console.error("Error processing webhook:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
