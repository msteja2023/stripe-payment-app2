// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentPage from './components/PaymentPage';
import ViewTransactionsPage from './components/ViewTransactionsPage';

const stripePromise = loadStripe('pk_test_51ODouxSA9DNdHYlELEh5M7FgvRxAu7h6MQXOyjwi4WvCcOtHGtdZWp4PyXNveKZ1CxxQERjz2womMpfrvY9vporF00wtsImujY');

function App() {
  return (
    <Elements stripe={stripePromise}>
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/payment">Payment</Link>
              </li>
              <li>
                <Link to="/transactions">View Transactions</Link>
              </li>
            </ul>
          </nav>

          <hr />

          <Route path="/payment" exact component={PaymentPage} />
          <Route path="/transactions" exact component={ViewTransactionsPage} />
        </div>
      </Router>
    </Elements>
  );
}

export default App;
