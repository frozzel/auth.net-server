/////////////////////////// import modules ///////////////////////////
const express = require('express');
var cors = require('cors')
const bodyParser = require('body-parser');
const { ApiContracts, ApiControllers } = require('authorizenet');
// const path = require("path");

require('dotenv').config();

/////////////////////////// use middleware ///////////////////////////

const app = express();
// app.use(express.static(path.join(__dirname, "scr"))); // put this line of code in app.js

app.use(cors());


app.use(bodyParser.json());

/////////////////////////// routes ///////////////////////////

app.post('/api/charge', async (req, res) => {
    const { cardNumber, expirationDate, amount } = req.body;

    const merchantAuthenticationType = new ApiContracts.MerchantAuthenticationType();
    merchantAuthenticationType.setName(process.env.AUTHORIZE_NET_API_LOGIN_ID);
    merchantAuthenticationType.setTransactionKey(process.env.AUTHORIZE_NET_TRANSACTION_KEY);

    const creditCard = new ApiContracts.CreditCardType();
    creditCard.setCardNumber(cardNumber);
    creditCard.setExpirationDate(expirationDate);

    const paymentType = new ApiContracts.PaymentType();
    paymentType.setCreditCard(creditCard);

    const transactionRequestType = new ApiContracts.TransactionRequestType();
    transactionRequestType.setTransactionType(ApiContracts.TransactionTypeEnum.AUTHCAPTURETRANSACTION);
    transactionRequestType.setPayment(paymentType);
    transactionRequestType.setAmount(amount);

    const createRequest = new ApiContracts.CreateTransactionRequest();
    createRequest.setMerchantAuthentication(merchantAuthenticationType);
    createRequest.setTransactionRequest(transactionRequestType);

    const ctrl = new ApiControllers.CreateTransactionController(createRequest.getJSON());

    ctrl.execute(function () {
        const apiResponse = ctrl.getResponse();
        const response = new ApiContracts.CreateTransactionResponse(apiResponse);

        if (response !== null) {
            if (response.getMessages().getResultCode() === ApiContracts.MessageTypeEnum.OK) {
                res.json({
                    success: true,
                    transactionId: response.getTransactionResponse().getTransId()
                });
            } else {
                res.json({ success: false, message: response.getMessages().getMessage()[0].getText() });
            }
        } else {
            res.json({ success: false, message: 'No response from the payment gateway.' });
        }
    });
});


/////////////////////////// start server ///////////////////////////
const server = require('http').Server(app); // import http module

const PORT = process.env.PORT || 8080;

/////////////////////// test server running ///////////////////////
app.get('/api/test', (req, res) => {
    res.json({data: 'Hello, World! 🚀  Server running  🚀'});
});

app.get('/', (req, res) => {
    res.send('Hello, World! 🚀  Server running  🚀' );
});


server.listen(PORT, () => {
    console.log(`................................................`)
    console.log(`🚀  Server running on http://localhost:${PORT}, 🚀`)
    console.log(`...............................................`)
    console.log(`...............Starting Database...............`)
});