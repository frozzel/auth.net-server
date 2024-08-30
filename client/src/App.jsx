import { useState } from 'react';
import axios from 'axios';
import './App.css';

const client = axios.create({
    baseURL: 'http://localhost:8080/api',
 
 
});

function App() {
    const [cardNumber, setCardNumber] = useState('');
    const [expirationDate, setExpirationDate] = useState('');
    const [amount, setAmount] = useState('');
    const [message, setMessage] = useState(null);

    const testRoute = async () => {
        try {
            const response = await client.get('/test');
            setMessage(response.data.data);
        } catch (error) {
            console.log('Error: Could not fetch the data.', error);
            setMessage('Error: Could not fetch the data.');
        }
    }
    testRoute();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage(null);

        try {
            const response = await client.post('/charge', { cardNumber, expirationDate, amount });

            if (response.data.success) {
                setMessage(`Transaction successful! Transaction ID: ${response.data.transactionId}`);
            } else {
                setMessage(`Transaction failed: ${response.data.message}`);
            }
        } catch (error) {
            setMessage('Error: Could not process the transaction.', error);
        }
    };


    return (
      <div className="container">
          <div className="form-wrapper">
          {message && <p className='alert'>{message}</p>}
              <h1>Payment Form</h1>
              <form onSubmit={handleSubmit}>
                  <div>
                      <label>Card Number</label>
                      <input
                          type="text"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          required
                      />
                  </div>
                  <div>
                      <label>Expiration Date (MMYY)</label>
                      <input
                          type="text"
                          value={expirationDate}
                          onChange={(e) => setExpirationDate(e.target.value)}
                          required
                      />
                  </div>
                  <div>
                      <label>Amount</label>
                      <input
                          type="number"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                          required
                      />
                  </div>
                  <button type="submit">Pay</button>
              </form>
              
          </div>
          
      </div>
      
  );
}

export default App;
