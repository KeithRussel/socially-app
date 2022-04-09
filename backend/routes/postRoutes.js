const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "Get posts" });
});

router.post("/", (req, res) => {
  res.json({ message: "Set post" });
});

router.put("/:id", (req, res) => {
  res.json({ message: `Update post ${req.params.id}` });
});

router.delete("/:id", (req, res) => {
  res.json({ message: `Delete post ${req.params.id}` });
});

module.exports = router;
