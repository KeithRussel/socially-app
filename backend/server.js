const express = require("express");
const { process_params } = require("express/lib/router");
const dotenv = require("dotenv").config();
const { errorHandler } = require("./middleware/errorMiddleware");
const port = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/posts", require("./routes/postRoutes"));

app.use(errorHandler);

app.listen(port, () => console.log(`Server running on port ${port}`));
