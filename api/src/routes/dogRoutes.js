const { Router } = require("express");
const router = Router();
const { getAllDogsOrName, getDogById, createDog } = require("../controllers/dog");


//all this routes start with '/dogs'
router.get("/", getAllDogsOrName);
router.get("/:id", getDogById);
router.post("/create", createDog);

module.exports = router;