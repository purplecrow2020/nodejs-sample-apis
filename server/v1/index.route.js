const express = require("express");
const router = express.Router();


// route requiremets
const userRoutes = require("./user/user.route");
const blogRoutes = require("./blog/blog.route");



// router usages
router.get("/health-check", (req, res) => res.send("OK2"));
router.use("/user", userRoutes);
router.use("/blog", blogRoutes);


module.exports = router;
