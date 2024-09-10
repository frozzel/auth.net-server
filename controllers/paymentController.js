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

exports.getAnAcceptPaymentPage = (req, res) => {
    
    var userId = req.body.userId;
    var merchantAuthenticationType = new ApiContracts.MerchantAuthenticationType();
	merchantAuthenticationType.setName(process.env.AUTHORIZE_NET_API_LOGIN_ID);
	merchantAuthenticationType.setTransactionKey(process.env.AUTHORIZE_NET_TRANSACTION_KEY);

    // Create a CustomerDataType object to hold the customer ID
    var customerData = new ApiContracts.CustomerDataType();
    customerData.setId(userId)  // Replace CUSTOMER_ID with your actual customer ID

	var transactionRequestType = new ApiContracts.TransactionRequestType();
	transactionRequestType.setTransactionType(ApiContracts.TransactionTypeEnum.AUTHCAPTURETRANSACTION);
	transactionRequestType.setAmount(12.00);
    transactionRequestType.setCustomer(customerData);
	
	var setting1 = new ApiContracts.SettingType();
	setting1.setSettingName('hostedPaymentButtonOptions');
	setting1.setSettingValue('{\"text\": \"Subscribe\"}');

	var setting2 = new ApiContracts.SettingType();
	setting2.setSettingName('hostedPaymentOrderOptions');
	setting2.setSettingValue('{\"show\": true}');

        // Adding the return URL setting
    var returnUrlSetting = new ApiContracts.SettingType();
    returnUrlSetting.setSettingName('hostedPaymentReturnOptions');
    returnUrlSetting.setSettingValue(`{"url": "${process.env.PAYMENT_REDIRECT}", "urlText": "Home", "cancelUrl": "${process.env.PAYMENT_CANCEL}", "cancelUrlText": "Cancel"}`);

	var settingList = [];
	settingList.push(setting1);
	settingList.push(setting2);
    settingList.push(returnUrlSetting); // Add the return URL setting to the list
   

	var alist = new ApiContracts.ArrayOfSetting();
	alist.setSetting(settingList);

	var getRequest = new ApiContracts.GetHostedPaymentPageRequest();
	getRequest.setMerchantAuthentication(merchantAuthenticationType);
	getRequest.setTransactionRequest(transactionRequestType);
	getRequest.setHostedPaymentSettings(alist);
    // getRequest.setRefId('123456');

	// console.log(JSON.stringify(getRequest.getJSON(), null, 2));
		
	var ctrl = new ApiControllers.GetHostedPaymentPageController(getRequest.getJSON());

	ctrl.execute(function(){

		var apiResponse = ctrl.getResponse();

		var response = new ApiContracts.GetHostedPaymentPageResponse(apiResponse);

		//pretty print response
		// console.log(JSON.stringify(response, null, 2));

		if(response != null) 
		{
			if(response.getMessages().getResultCode() == ApiContracts.MessageTypeEnum.OK)
			{
				console.log('🔑 Hosted payment page token Retrieved 🔑');
				// console.log(response.getToken());
                res.json(response.getToken());
			}
			else
			{
				//console.log('Result Code: ' + response.getMessages().getResultCode());
				console.log('Error Code: ' + response.getMessages().getMessage()[0].getCode());
				console.log('Error message: ' + response.getMessages().getMessage()[0].getText());
                res.json(response);
			}
		}
		else
		{
			console.log('Null response received');
            res.json(response);
		}

		// res.json(response.token);
	});
}

if (require.main === module) {
	getAnAcceptPaymentPage(function(){
		console.log('getAnAcceptPaymentPage call complete.');
	});
}
