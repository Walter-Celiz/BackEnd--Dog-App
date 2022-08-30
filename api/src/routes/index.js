const { Router } = require('express');
const dogsRoutes = require('./dog')
const temperamentRoutes = require('./temperament')

const router = Router();

router.use('/dogs', dogsRoutes)
router.use('/temperaments', temperamentRoutes)

module.exports = router;
