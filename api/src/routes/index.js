const { Router } = require('express');
const dogsRoutes = require('./dog')
const temperamentRoutes = require('./temperament')

const router = Router();

// Routers config
router.use("/dogs", dogRoutes);
router.use("/temperaments", temperamentRoutes);

module.exports = router;
