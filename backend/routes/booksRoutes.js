import express from "express";
import { Book } from "../models/bookModel.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { title, author, publishYear } = req.body;
    const errors = [];

    if (!title || typeof title !== "string") {
      errors.push("Title must be a non-empty string");
    }
    if (!author || typeof author !== "string") {
      errors.push("Author must be a non-empty string");
    }
    if (!publishYear || typeof publishYear !== "number") {
      errors.push("PublishYear must be a valid number");
    }

    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    const newBook = { title, author, publishYear };
    const book = await Book.create(newBook);
    return res.status(201).send(book);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const books = await Book.find({});

    return res.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.error(error);
    res.status(404).send("cannot find all books");
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const book = await Book.findById(id);

    return res.status(200).json(book);
  } catch (error) {
    console.error(error.message);
    res.status(404).send({ message: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { title, author, publishYear } = req.body;
    const errors = [];

    if (title && typeof title !== "string") {
      errors.push("Title must be a string");
    }
    if (author && typeof author !== "string") {
      errors.push("Author must be a string");
    }
    if (publishYear && typeof publishYear !== "number") {
      errors.push("PublishYear must be a number");
    }

    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    const { id } = req.params;
    const book = await Book.findByIdAndUpdate(id);

    if (!book) {
      return res.status(404).json({ message: "book not found" });
    }
    return res.status(200).send({ message: "book updated successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const book = await Book.findByIdAndDelete(id, req.body);

    if (!book) {
      return res.status(404).json({ message: "book not found" });
    }

    return res.status(200).send({ message: "book deleted successfully" });
  } catch (error) {
    console.error(error.message);
  }
});

export default router;
