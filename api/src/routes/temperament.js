const { Router } = require("express");
const router = Router();
const { getTemperaments } = require("../controllers/temeperament");

//all this routes start with "/temperament"
router.get("/", getTemperaments);

module.exports = router;