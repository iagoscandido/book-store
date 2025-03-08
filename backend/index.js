import express from "express";
import { mongoDBURL, PORT } from "./config.js";
import mongoose from "mongoose";
import bookRoutes from "./routes/booksRoutes.js";
import cors from "cors";
const app = express();

// middleware for parsing request body
app.use(express.json());

// middleware for handling CORS Policy
// option 1: allow all origins with default of cors(*)
app.use(cors());

// option 2: allow custom origins
// app.use(
//   cors({
//     origin: "http://localohost:3000",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type"],
//   })
// );

app.use("/books", bookRoutes);

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("app connected to database");
    app.listen(PORT, () => {
      console.log(`app is listening at port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.error(error);
  });
