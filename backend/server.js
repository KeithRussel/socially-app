const express = require("express");
const dotenv = require("dotenv").config();
const port = process.env.PORT || 5000;

const app = express();

app.use("/api/posts", require("./routes/postRoutes"));

app.listen(port, () => console.log(`Server running on port ${port}`));
