import React from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

const App = () => {
  const onSuccess = (details, data) => {
    alert('Transaction completed');
    console.log(details);
    console.log(data);
    //alert('Transaction completed by ' + details.payer.name.given_name);
    //console.log('Transaction completed by ' + details.payer.name.given_name);
	   //document.write("Transaction completed");
  };

  const onError = (err) => {
    console.error(err);
    alert('An error occurred during the transaction');
  };

  return (
    <div className="App">
      <PayPalScriptProvider
        options={{
          'client-id': 'Adu3ag770c8_7MNphpd9IF6j3CLRyUDeaFssefr3QrdhWTuRi9HtK40hA__mIWcbubkID06otXfNDNCD',
          'currency': 'USD',
        }}
      >
        <PayPalButtons
          style={{ layout: 'vertical' }}
          createOrder={(data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: '9.99',
                  },
                },
              ],
            });
          }}
          onApprove={onSuccess}
          onError={onError}
        />
      </PayPalScriptProvider>
    </div>
  );
};

export default App;
