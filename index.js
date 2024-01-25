import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import connectToMongoDB from "./Database/Connection.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import session from "express-session";
import UserRouter from "./Routers/UserRouter.js";

const app = express();

// Load environment variables from .env file
dotenv.config({ path: ".env" });

const PORT = process.env.PORT || 8000

app.use(bodyParser.json()); // Parse incoming requests with JSON payloads

app.use(cookieParser())

// app.use(session({
//   secret: process.env.SESSION_SECRET, 
//   name: process.env.SESSION_NAME,
//   resave: false,
//   saveUninitialized: true,
//   cookie: {
//       httpOnly: true,
//       maxAge: 24 * 60 * 60 * 1000 // 24 hours
//   }
// }));

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);


app.use("/user", UserRouter);

// Connect to MongoDB database using Mongoose
connectToMongoDB();
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
