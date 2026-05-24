import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import axios from "axios";

function CartPage() {
  const { cart, removeFromCart } = useContext(CartContext);

  // TOTAL PRICE
  const total = cart.reduce((sum, item) => sum + Number(item.price), 0);

  // LOAD RAZORPAY SCRIPT
  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  // CHECKOUT FUNCTION (UPDATED)
  const handleCheckout = async () => {
    try {
      const isLoaded = await loadRazorpay();

      if (!isLoaded) {
        alert("Razorpay SDK failed to load ❌");
        return;
      }

      // Step 1: Create order from backend
      const { data } = await axios.post(
        "http://localhost:5000/api/payment/create-order",
        { amount: total }
      );

      // Step 2: Open Razorpay
      const options = {
        key: "rzp_test_SZYNYNkt1j8LgbF", // 👈 apna key id
        amount: data.amount,
        currency: "INR",
        order_id: data.id,

        handler: async function () {
          // Step 3: Save order after payment
          await axios.post("http://localhost:5000/api/orders", {
            items: cart,
            total: total,
          });

          alert("Payment Successful 🎉");
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();

    } catch (error) {
      console.log(error);
      alert("Checkout Failed ❌");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Cart Page 🛒</h2>

      <h3>Total: ₹{total}</h3>

      {/* 🔥 EMPTY CART */}
      {cart.length === 0 ? (
        <p>No items in cart</p>
      ) : (
        <>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
            {cart.map((item, index) => (
              <div
                key={index}
                style={{
                  border: "1px solid green",
                  padding: "10px",
                  width: "150px",
                  textAlign: "center",
                }}
              >
                <img src={item.image} width="100" height="100" />
                <h5>{item.name}</h5>
                <p>₹{item.price}</p>

                <button onClick={() => removeFromCart(index)}>
                  Remove ❌
                </button>
              </div>
            ))}
          </div>

          <br />

          {/* 🔥 CHECKOUT BUTTON */}
          <button onClick={handleCheckout}>
            Pay Now 💳
          </button>
        </>
      )}
    </div>
  );
}

export default CartPage;