const express = require("express");
const { connectToDb } = require("./db");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());

const studentRouter = require("./routes/student");
const adminRouter = require("./routes/admin");
const userRouter = require("./routes/user");

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});

// Connect to the database
connectToDb()
  .then(() => {
    // Middleware
    app.use(bodyParser.json({ limit: "10mb" }));
    app.use(bodyParser.urlencoded({ extended: true, limit: "10mb" }));
    

    app.use((req, res, next) => {
      console.log(req.path, req.method);
      next();
    });

    // Routes
    app.get("/", (req, res) => {
      res.send("Hello World!");
    });
    app.use("/api/admin", adminRouter);
    app.use("/api/student", studentRouter);
    app.use("/api/user", userRouter);

    // Start the server
    app.listen(3001, () => {
      console.log("Server is running on port 3001");
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

module.exports = app;
