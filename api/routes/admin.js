const express = require("express");
const { connectToDb } = require("../db.js");

const router = express.Router();

// Add a new project
router.post("/projects", async (req, res) => {
  try {
    const db = await connectToDb();
    const { name, overview, youtubeLink, date, imageFile, description } =
      req.body;

    const result = await db.collection("projects").insertOne({
      name,
      overview,
      description,
      youtubeLink,
      date,
      imageFile,
    });

    res.status(200).json(result);
  } catch (error) {
    console.error("Error adding project:", error);
    res
      .status(500)
      .json({ error: "1 An error occurred while adding the project" });
  }
});

module.exports = router;
