const express = require('express');
const router = express.Router();

const {processPayment, getAnAcceptPaymentPage, webhook} = require('../controllers/paymentController');



/////////////////////////// use routes ///////////////////////////
router.post('/charge', processPayment);
router.post('/paymentPage', getAnAcceptPaymentPage);
router.post('/webhook', webhook);

module.exports = router;