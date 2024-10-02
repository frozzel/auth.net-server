import { HostedForm } from 'react-acceptjs';
import './App.css';
import PaymentForm from './PaymentForm';



function Header() {
    const authData = {
        apiLoginID: import.meta.env.VITE_AUTHORIZE_NET_API_LOGIN_ID,
        clientKey: import.meta.env.VITE_AUTHORIZE_NET_PUBLIC_CLIENT_KEY,
       
    };

    const billingAddressOptions = {
        show: true,
        required: true,
      };

    const paymentOptions = {
        showCreditCard: true,
        showBankAccount: true,
      };

      const handleSubmit2 = (response) => {
        console.log('Received response:', response);
      };


      const amount = 10.00;
      const customerID = '123456789';

    return (
        <nav className='menu'>
            <ul className="header">
                <li>
                    <PaymentForm />
                </li>
                <li>
                    <HostedForm 
                    authData={authData} 
                    paymentOptions={paymentOptions}
                    environment='sandbox'
                    billingAddressOptions={billingAddressOptions} 
                    buttonText='Pay Now'
                    formHeaderText = 'Fuck You Pay Me'

                    onSubmit={handleSubmit2} />
                 </li>
            </ul>
        </nav>
    )
}
export default Header;