import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import { HostedForm, AcceptHosted } from 'react-acceptjs';


const client = axios.create({
    baseURL: 'http://localhost:8080/api',
 
 
});

// const authData = {
//     apiLoginID: import.meta.env.VITE_AUTHORIZE_NET_API_LOGIN_ID,
//     clientKey: import.meta.env.VITE_AUTHORIZE_NET_PUBLIC_CLIENT_KEY,
//   };
  

// function App() {
//     const [cardNumber, setCardNumber] = useState('');
//     const [expirationDate, setExpirationDate] = useState('');
//     const [amount, setAmount] = useState('');
//     const [message, setMessage] = useState("🚀  Server running  🚀");

    
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setMessage(null);

//         try {
//             const response = await client.post('/charge', { cardNumber, expirationDate, amount });

//             if (response.data.success) {
//                 console.log('response success', response);
//                 setMessage(`Transaction successful! Transaction ID: ${response.request.responseText}`);
//             } else {
//                 console.log('response', response);
//                 setMessage(`Transaction failed: ${response.data.message}`);
//             }
//         } catch (error) {
//             setMessage('Error: Could not process the transaction.', error);
//         }
//     };
//     // const handleSubmit2 = (response) => {
//     //     console.log('Received response:', response);
//     //   };


//     return (<>
//       <div className="container">
//           <div className="form-wrapper">
//           {message && <p className='alert'>{message}</p>}
//               <h1>Payment Form</h1>
//               <form onSubmit={handleSubmit}>
//                   <div>
//                       <label>Card Number</label>
//                       <input
//                           type="text"
//                           value={cardNumber}
//                           onChange={(e) => setCardNumber(e.target.value)}
//                           required
//                       />
//                   </div>
//                   <div>
//                       <label>Expiration Date (MMYY)</label>
//                       <input
//                           type="text"
//                           value={expirationDate}
//                           onChange={(e) => setExpirationDate(e.target.value)}
//                           required
//                       />
//                   </div>
//                   <div>
//                       <label>Amount</label>
//                       <input
//                           type="number"
//                           value={amount}
//                           onChange={(e) => setAmount(e.target.value)}
//                           required
//                       />
//                   </div>
//                   <button type="submit">Pay</button>
//               </form>
             

             
              
//           </div>
//           {/* <div className="form-wrapper2">
//           <HostedForm authData={authData}  onSubmit={handleSubmit2} />
//           </div> */}
          
//       </div>

   
      
//   </>);
// }



const App = () => {
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
          Subscribe Now!
        </AcceptHosted.Button>
        <AcceptHosted.IFrameBackdrop />
        <AcceptHosted.IFrameContainer>
          <AcceptHosted.IFrame />
        </AcceptHosted.IFrameContainer>
      </AcceptHosted>
    ) : (
      <div>
        You must have a form token. Have you made a call to the
        getHostedPaymentPageRequestAPI?
      </div>
    );
  };



export default App;
