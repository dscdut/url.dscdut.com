const express = require("express");
const router = express.Router();
const { getUrl, saveUrl } = require("../controller/url");

router.get("/", (req, res) => {
  return res.render("index");
});
router.get("/:id", getUrl);
router.post("/url", saveUrl);


module.exports = router;
