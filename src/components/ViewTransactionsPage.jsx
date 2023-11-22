// src/components/ViewTransactionsPage.jsx
import React, { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app'; 
import 'firebase/compat/firestore';

const ViewTransactionsPage = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    // Fetch transactions from Firebase Firestore
    const db = firebase.firestore();
    const unsubscribe = db.collection('transactions').onSnapshot((snapshot) => {
      const data = [];
      snapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
      });
      setTransactions(data);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div>
      <h2>View Transactions Page</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
        {transactions.map((transaction) => (
          <div key={transaction.id} style={{ border: '1px solid #ddd', padding: '16px' }}>
            <p>Name: {transaction.name}</p>
            <p>Amount: {transaction.amount}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewTransactionsPage;
