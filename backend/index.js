import express from "express";
import { mongoDBURL, PORT } from "./config.js";
import mongoose from "mongoose";
import bookRoutes from "./routes/booksRoutes.js";
import cors from "cors";

const app = express();

// middlewares
app.use(express.json());
app.use(cors());

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
