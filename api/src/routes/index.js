const { Router } = require('express');
const dogsRoutes = require('./dogRoutes')
const temperamentsRoutes = require('./temperamentRoutes')

const router = Router();

// Routers config
router.use("/dogs", dogsRoutes);
router.use("/temperaments", temperamentsRoutes);

module.exports = router;
