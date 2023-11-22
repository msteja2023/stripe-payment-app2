// src/components/PaymentPage.jsx
import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import firebase from 'firebase/compat/app'; 
import 'firebase/compat/firestore';

const PaymentPage = () => {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const stripe = useStripe();
  const elements = useElements();
  const history = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    try {
      const response = await axios.post('/api/payment', {
        name,
        amount,
      });

      const { paymentIntent, error } = await stripe.confirmCardPayment(response.data.clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (error) {
        console.error(error);
        alert('Payment failed');
      } else {
        // Upload to Firebase Firestore after successful payment
        const db = firebase.firestore();
        await db.collection('transactions').add({
          name,
          amount,
          transactionID: paymentIntent.id,
        });

        alert('Payment succeeded');
        history.push('/transactions');
      }
    } catch (error) {
      console.error(error);
      alert('Payment failed');
    }
  };

  return (
    <div>
      <h2>Payment Page</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <label>
          Amount:
          <input type="text" value={amount} onChange={(e) => setAmount(e.target.value)} />
        </label>
        <label>
          Card Details:
          <CardElement />
        </label>
        <button type="submit">Submit Payment</button>
      </form>
    </div>
  );
};

export default PaymentPage;
