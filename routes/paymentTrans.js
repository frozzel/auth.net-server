const express = require('express');
const router = express.Router();

const {processPayment} = require('../controllers/paymentController');



/////////////////////////// use routes ///////////////////////////
router.post('/charge', processPayment);

module.exports = router;