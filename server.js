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
    const date = new Date();
    
    res.json({data: `🚀  Server running  🚀 \n ${date.toDateString()}`});
});

app.get('/', (req, res) => {
    const date = new Date();
    res.send(`<body style="background: #333; display: flex">
        <div style="width: 30%; height: auto"></div>
        <div style="display: flex-column; position: relative; top: 25%; width: 100%; height: 15%; box-shadow: 0 0 3px 2px #cec7c759; padding: 1em; border-radius: 8px;">
        <h1 style="text-align: center; color: white;">🚀  Server Running  🚀</h1> \n 
        <h3 style="text-align: center; color: white">${date.toString().slice(0, 24)}</h3>
        </div><div style="width: 30%; height: auto"></div>
        </body>`
     );
});


server.listen(PORT, () => {
    console.log(`................................................`)
    console.log(`🚀  Server running on http://localhost:${PORT}, 🚀`)
    console.log(`...............................................`)
    console.log(`...............Starting Database...............`)
});