import { useEffect, useState } from "react";

import { toast } from 'react-toastify';
import ApiService from "../services/ApiService";
// Declare globals to satisfy ESLint
/* global ApplePaySession, google */

const Checkout = () => {
  const [paymentMethods, setPaymentMethods] = useState({
    applePay: true,
    googlePay: true
  });

  useEffect(() => {
    console.log("DOM Loaded - Initializing Frames...");

    if (typeof window.Frames === "undefined") {
      console.error("Frames.js not loaded!");
      return;
    }

    const initializePaymentMethods = async () => {
      try {
        // Initialize Frames
        window.Frames.init({
          publicKey: "pk_sbox_jxjhyso46n4efrcediii6opsbm7",
          frameSelector: "#card-frame",
          localization: {
            cardNumberPlaceholder: "Card number",
            expiryMonthPlaceholder: "MM",
            expiryYearPlaceholder: "YY",
            cvvPlaceholder: "CVV"
          },
          style: {
            base: {
              color: "#333",
              fontSize: "16px"
            }
          }
        });

        // Check for Apple Pay
        if (typeof window.ApplePaySession !== 'undefined' && 
            window.ApplePaySession.canMakePayments()) {
          setPaymentMethods(prev => ({ ...prev, applePay: true }));
          console.log("Apple Pay is available");
        }

        // Check for Google Pay
        if (typeof window.google !== 'undefined' && 
            typeof google.payments !== 'undefined' && 
            typeof google.payments.api !== 'undefined') {
          try {
            const paymentsClient = new google.payments.api.PaymentsClient({
              environment: "TEST"
            });
            
            const isReadyToPay = await paymentsClient.isReadyToPay({
              apiVersion: 2,
              apiVersionMinor: 0,
              allowedPaymentMethods: [{
                type: "CARD",
                parameters: {
                  allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
                  allowedCardNetworks: ["AMEX", "DISCOVER", "JCB", "MASTERCARD", "VISA"]
                }
              }]
            });
            
            if (isReadyToPay.result) {
              setPaymentMethods(prev => ({ ...prev, googlePay: true }));
              console.log("Google Pay is available");
            }
          } catch (error) {
            console.error("Google Pay check failed:", error);
          }
        }

        // Event handlers
        window.Frames.addEventHandler("cardTokenized", (event) => {
          console.log("Card Token:", event);
          processPayment(event.token);
        });

        console.log("Frames initialized successfully.");
      } catch (error) {
        console.error("Error initializing payment methods:", error);
      }
    };

    initializePaymentMethods();
  }, []);

  const handlePayment = () => {
    if (!window.Frames.isCardValid()) {
      alert("Please enter valid card details.");
      return;
    }
    window.Frames.submitCard();
  };

  const handleApplePay = async () => {
    try {
      // First check if Apple Pay is available
      if (typeof window.ApplePaySession === 'undefined' || 
          !window.ApplePaySession.canMakePayments()) {
        alert("Apple Pay is not available on this device");
        return;
      }

      // Create Apple Pay session
      const session = new window.ApplePaySession(3, {
        countryCode: "US",
        currencyCode: "USD",
        merchantCapabilities: ["supports3DS"],
        supportedNetworks: ["amex", "discover", "masterCard", "visa"],
        total: {
          label: "Your Store Name",
          amount: "10.00"
        }
      });

      // Handle Apple Pay events
      session.onvalidatemerchant = async (event) => {
        try {
          const validationURL = event.validationURL;
          // In production, you would call your backend here
          // const merchantSession = await fetchApplePayValidation(validationURL);
          // session.completeMerchantValidation(merchantSession);
          
          // For demo purposes:
          session.completeMerchantValidation({ validationURL });
        } catch (error) {
          console.error("Apple Pay merchant validation failed:", error);
          session.abort();
        }
      };

      session.onpaymentauthorized = (event) => {
        // Process the payment token
        const token = event.payment.token;
        console.log("Apple Pay token:", token);
        processPayment(token.paymentData);
        session.completePayment(window.ApplePaySession.STATUS_SUCCESS);
      };

      session.begin();
    } catch (error) {
      console.error("Apple Pay error:", error);
      alert("Apple Pay failed to initialize");
    }
  };

  const handleGooglePay = async () => {
    try {
      if (typeof window.google === 'undefined' || 
          typeof google.payments === 'undefined' || 
          typeof google.payments.api === 'undefined') {
        alert("Google Pay is not available");
        return;
      }

      const paymentsClient = new google.payments.api.PaymentsClient({
        environment: "TEST"
      });

      const paymentDataRequest = {
        apiVersion: 2,
        apiVersionMinor: 0,
        merchantInfo: {
          merchantId: "YOUR_MERCHANT_ID",
          merchantName: "Your Store Name"
        },
        allowedPaymentMethods: [{
          type: "CARD",
          parameters: {
            allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
            allowedCardNetworks: ["AMEX", "DISCOVER", "JCB", "MASTERCARD", "VISA"]
          },
          tokenizationSpecification: {
            type: "PAYMENT_GATEWAY",
            parameters: {
              gateway: "checkoutltd",
              gatewayMerchantId: "YOUR_CHECKOUT_MERCHANT_ID"
            }
          }
        }],
        transactionInfo: {
          totalPriceStatus: "FINAL",
          totalPrice: "10.00",
          currencyCode: "USD",
          countryCode: "US"
        }
      };

      const paymentData = await paymentsClient.loadPaymentData(paymentDataRequest);
      console.log("Google Pay payment data:", paymentData);
      processPayment(paymentData.paymentMethodData.tokenizationData.token);
    } catch (error) {
      console.error("Google Pay error:", error);
      alert("Google Pay payment failed");
    }
  };

  const processPayment = async (googlePayToken) => {
    try {
      const response = await ApiService.request({
          method: "POST",
          url: "process-google-pay", 
          data:{
            token: googlePayToken,
            amount: 10.00, // Example amount
            currency: 'USD'
          }
      });
      const data = response.data;
     
      if (data.status) {
        alert("Payment successful!");
      } else {
        alert(`Payment failed: ${data.message}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert("Payment processing error");
    }
  };

  // Rest of your component remains the same...
  return (
    <div className="container bg-white shadow rounded mt-5 text-center p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Checkout - Payment Methods</h2>
      
      {/* Card Payment */}
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-2">Credit/Debit Card</h3>
        <div id="card-frame" className="border border-gray-300 p-4 rounded mb-4"></div>
        <button
          onClick={handlePayment}
          className="btn btn-primary w-full py-2 px-4 rounded bg-blue-600 text-white hover:bg-blue-700"
        >
          Pay with Card
        </button>
      </div>
      
      {/* Apple Pay */}
      {paymentMethods.applePay && (
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-2">Apple Pay</h3>
          <button
            onClick={handleApplePay}
            className="btn w-full py-2 px-4 rounded bg-black text-white hover:bg-gray-800"
            style={{ WebkitAppearance: "none" }}
          >
            Pay with Apple Pay
          </button>
        </div>
      )}
      
      {/* Google Pay */}
      {paymentMethods.googlePay && (
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-2">Google Pay</h3>
          <button
            onClick={handleGooglePay}
            className="btn w-full py-2 px-4 rounded bg-white text-gray-800 hover:bg-gray-100 border border-gray-300"
          >
            <div className="flex items-center justify-center">
              Pay with Google Pay
            </div>
          </button>
        </div>
      )}
    </div>
  );
};

export default Checkout;