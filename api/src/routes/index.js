const { Router } = require('express');
const dogsRoutes = require('./dogRoutes')
const temperamentRoutes = require('./temperamentRoutes')

const router = Router();

router.use('/dogs', dogsRoutes)
router.use('/temperaments', temperamentRoutes)

module.exports = router;
