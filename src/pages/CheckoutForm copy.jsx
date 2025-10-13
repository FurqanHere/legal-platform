import { useEffect } from "react";

const Checkout = () => {
  useEffect(() => {
    console.log("DOM Loaded - Initializing Frames...");

    if (typeof window.Frames === "undefined") {
      console.error("Frames.js not loaded!");
      return;
    }

    // Delay Frames initialization to ensure the div is available
    setTimeout(() => {
      window.Frames.init({
        publicKey: "pk_sbox_jxjhyso46n4efrcediii6opsbm7", // Replace with your actual Checkout.com Public Key
        frameSelector: "#card-frame", // Corrected selector
      });

      window.Frames.addEventHandler("cardTokenized", function (event) {
        console.log("Card Token:", event);
        processPayment(event.token);
      });

      console.log("Frames initialized successfully.");
    }, 500);
  }, []);

  const handlePayment = () => {
    if (!window.Frames.isCardValid()) {
      alert("Please enter valid card details.");
      return;
    }
    window.Frames.submitCard();
  };

  const processPayment = (token) => {
    console.log("Processing Payment with token:", token);
    alert("Processing Payment with token: " + token);
  };

  return (
    <div className="container bg-white shadow rounded mt-5 text-center p-6">
      <h2 className="text-2xl font-semibold mb-4">Checkout - Test Payment</h2>
      <div
        id="card-frame"
        className="border border-gray-300  "
      ></div>
      <button
        onClick={handlePayment}
        className="btn btn-base "
      >
        Pay Now
      </button>
    </div>
  );
};

export default Checkout;
