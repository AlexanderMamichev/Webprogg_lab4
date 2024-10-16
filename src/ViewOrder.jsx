import { Prev } from "react-bootstrap/esm/PageItem";
import { useOutletContext } from "react-router-dom";
import { useState } from 'react';

function ViewOrder() {
  const { shoppingCart } = useOutletContext(); // Shopping cart passed via context
  const [orderConfirmation, setOrderConfirmation] = useState(null); // To store order confirmation

  if (!shoppingCart || shoppingCart.length === 0) {
    return <p>Kundvagnen är tom.</p>;
  }

  const handlePlaceOrder = async () => {
    // Extracting the ingredient names for each salad
    const orderData = shoppingCart.map((salad) => {
      return Object.values(salad.ingredients).concat(salad.extras); // Combine ingredients and extras
    });

    try {
      const response = await fetch("http://localhost:8080/orders/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData), // Send array of salads
      });

      const data = await response.json();
      setOrderConfirmation(data); // Store the order confirmation in state
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  return (
    <div className="mb-4">
      <h2>Din kundvagn</h2>
      <ul>
        {shoppingCart.map((salad) => (
          <li key={salad.uuid}>
            {Object.values(salad.ingredients).join(", ")}
            {Array.isArray(salad.extras) && salad.extras.length > 0 && (
              <span> (Extras: {salad.extras.join(", ")})</span>
            )}
            <br />
            {'Pris: ' + salad.getPrice() + ' kr'}
            <br />
            {'ID: ' + salad.uuid}
          </li>
        ))}
      </ul>

      <button className="btn btn-primary" onClick={handlePlaceOrder}>
        Beställ
      </button>

      {orderConfirmation && (
        <div
          className="toast show"
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
        >
          <div className="toast-header">
            <strong className="me-auto">Order Confirmation</strong>
            <small>Just now</small>
            <button type="button" className="btn-close" data-bs-dismiss="toast"></button>
          </div>
          <div className="toast-body">
            Order confirmed! <br />
            Order ID: {orderConfirmation.uuid} <br />
            Total Price: {orderConfirmation.price} kr
          </div>
        </div>
      )}
    </div>
  );
}

  
  export default ViewOrder;