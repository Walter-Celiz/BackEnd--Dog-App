const { Router } = require("express");
const router = Router();
const { getAllTemperaments } = require("../controllers/temperamentController");

//all this routes start with '/dogs'
router.get("/", getAllTemperaments);


module.exports = router;