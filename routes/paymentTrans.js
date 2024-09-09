const express = require('express');
const router = express.Router();

const {processPayment, getAnAcceptPaymentPage} = require('../controllers/paymentController');



/////////////////////////// use routes ///////////////////////////
router.post('/charge', processPayment);
router.post('/paymentPage', getAnAcceptPaymentPage);

module.exports = router;