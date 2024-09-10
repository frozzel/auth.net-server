import { useState, useEffect } from 'react';
import axios from 'axios';
import { AcceptHosted } from 'react-acceptjs';

const client = axios.create({
    baseURL: 'http://localhost:8080/api',
});

function PaymentForm() {
    const [response, setResponse] = useState('');
    const [formToken, setFormToken] = useState('');

    const getToken = async () => {
        const response = await client.post('/paymentPage');
        return response.data;
      }

    useEffect(() => {
        getToken().then((token) => setFormToken(token));
      }
    , []);

      console.log('Response', response);
      return formToken ? (
              <AcceptHosted
                formToken={formToken}
                integration="iframe"
                settingName="hostedPaymentCustomerOptions"
                onTransactionResponse={(response) =>
                  setResponse(JSON.stringify(response, null, 2) + '\n')
                }
              >
                <AcceptHosted.Button className="btn btn-primary">
                  Form
                </AcceptHosted.Button>
                <AcceptHosted.IFrameBackdrop />
                <AcceptHosted.IFrameContainer>
                  <AcceptHosted.IFrame />
                </AcceptHosted.IFrameContainer>
              </AcceptHosted>
            ) : (
              <div>
                ...Loading
              </div>
            );
          };


export default PaymentForm;
