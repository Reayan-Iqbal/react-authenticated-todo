const express = require("express");
const { userRoutes } = require("./user");
const { todoRouter } = require("./todo");
const router = express.Router();

router.use("/user", userRoutes);
router.use("/todos", todoRouter);
module.exports = router;
// /api/v1/user
