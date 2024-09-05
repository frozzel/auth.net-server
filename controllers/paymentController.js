// const { ApiContracts, ApiControllers } = require('authorizenet');
var ApiContracts = require('authorizenet').APIContracts;
var ApiControllers = require('authorizenet').APIControllers;


exports.processPayment = async (req, res) => {
   
        const { cardNumber, expirationDate, amount } = req.body;
        console.log('cardNumber', cardNumber);
        console.log('expirationDate', expirationDate);
        console.log('amount', amount);
    
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
            console.log('response', response);
            if (response !== null) {
                
                if (response.getMessages().getResultCode() === ApiContracts.MessageTypeEnum.OK) {
                    console.log("Successful transaction.");
                    console.log("Response Code: ", response.getTransactionResponse().getTransId());
                    res.json({
                        success: true,
                        transactionId: response.getTransactionResponse().getTransId()
                    });
                } else {
                    console.log('Failed transaction.');
                    console.log('Result Code: ', response.getMessages().getMessage()[0].getText());
                    res.json({ success: false, message: response.getMessages().getMessage()[0].getText() });
                }
            } else {
                res.json({ success: false, message: 'No response from the payment gateway.' });
            }
        });
    }
