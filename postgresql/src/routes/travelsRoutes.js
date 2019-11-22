const { Router } = require('express');
const router = Router();
const { getUserTravels } = require('../controllers/travelController');

router.get('/userTravels', getUserTravels);

module.exports = router;
