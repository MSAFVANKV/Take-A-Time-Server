import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import connectToMongoDB from "./Database/Connection.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import UserRouter from "./Routers/UserRouter.js";
import path from "path";
import {createOrder, captureOrder} from "./Controllers/CONTROLLES1/paypalPayment.js";
const app = express();

// Load environment variables from .env file
dotenv.config({ path: ".env" });

const PORT = process.env.PORT || 8000

app.use(bodyParser.json()); // Parse incoming requests with JSON payloads

app.use(cookieParser())


app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);


app.use("/user", UserRouter);

app.post("/my-server/create-paypal-order", async (req, res) => {
  try {
    const order = await createOrder(req.body);

    res.json(order);
  } catch (error) {
    console.error("Failed to create order:", error);
    res.status(500).json({ error: "Failed to create order." });
  }
});

app.post("/my-server/capture-paypal-order", async (req, res) => {
  try {
    const { orderID } = req.body;
    console.log('=== 2 ====')
    const captureData = await captureOrder(orderID);
    res.json(captureData);
  } catch (error) {
    console.error("Failed to create order:", error);
    res.status(500).json({ error: "Failed to capture order." });
  }
});

// Connect to MongoDB database using Mongoose
connectToMongoDB();
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
