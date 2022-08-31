const { Router } = require("express");
const dogRoutes = require("./dogRoutes");
const temperamentRoutes = require("./temperamentRoutes");

const router = Router();

// Routers config
router.use("/dogs", dogRoutes);
router.use("/temperaments", temperamentRoutes);

module.exports = router;
