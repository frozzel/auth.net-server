import { useState, useEffect } from 'react';
import axios from 'axios';
import { AcceptHosted } from 'react-acceptjs';

const client = axios.create({
    baseURL: 'http://localhost:8080/api',
});

const testChild = "123456789"

function PaymentForm() {
    // const [response, setResponse] = useState('');
    const [formToken, setFormToken] = useState('');

    const getToken = async (userId) => {
        const response = await client.post('/paymentPage', { userId });
        return response.data;
      }

    useEffect(() => {
        getToken(testChild).then((token) => setFormToken(token));
      }
    , []);

      return formToken ? (
            //   <AcceptHosted
            //     formToken={formToken}
            //     integration="iframe"
            //     settingName="hostedPaymentCustomerOptions"
            //     onTransactionResponse={(response) =>
            //       setResponse(JSON.stringify(response, null, 2) + '\n')
            //     }
            //   >
            //     <AcceptHosted.Button className="btn btn-primary">
            //       Form
            //     </AcceptHosted.Button>
            //     <AcceptHosted.IFrameBackdrop />
            //     <AcceptHosted.IFrameContainer>
            //       <AcceptHosted.IFrame />
            //     </AcceptHosted.IFrameContainer>
            //   </AcceptHosted>
            <>
            	<form method="post" action="https://test.authorize.net/payment/payment" id="formAuthorizeNetTestPage" name="formAuthorizeNetTestPage">
		<input type="hidden" name="token" value={formToken} />
		Continue to Authorize.net to Payment Page
		<button id="btnContinue">Continue to next page</button>
	</form>         
            </>
            ) : (
              <div>
                ...Loading
              </div>
            );
          };


export default PaymentForm;
