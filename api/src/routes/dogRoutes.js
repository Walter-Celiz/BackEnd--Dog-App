const { Router } = require("express");
const router = Router();
const { getAllDogsOrName, getDogsById, createDog } = require("../controllers/dogController");

//all this routes start with '/dogs'
router.get("/", getAllDogsOrName);
router.get("/:id", getDogsById);
router.post("/create", createDog);

module.exports = router;