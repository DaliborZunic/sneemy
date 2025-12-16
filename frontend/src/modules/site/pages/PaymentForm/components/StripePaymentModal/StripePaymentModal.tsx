import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import api from "../../../../../../api";

const stripePromise = loadStripe("pk_test_tNoYGmY8xGIhDq3IhCQs7hws00agvlMvzW");

interface PaymentModalProps {
  formData: {
    nameAndLastName: string;
    eMail: string;
    phoneNumber: string;
    website: string;
    customerRequest: string;
    isR1Reciept: boolean;
    companyName: string;
    companyOIB: string;
  };
  amount: number;
  onSuccess: () => void;
  onCancel: () => void;
}

function CheckoutForm({ formData, amount, onSuccess, onCancel }: PaymentModalProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setIsProcessing(true);
    setError("");

    try {
      const { error: stripeError, paymentIntent } = await stripe.confirmPayment({
        elements,
        redirect: "if_required",
      });

      if (stripeError) {
        setError(stripeError.message || "Plaćanje nije uspjelo");
        setIsProcessing(false);
        return;
      }

      if (paymentIntent && paymentIntent.status === "succeeded") {

        await api.post("/orders", {
            paymentIntentId: paymentIntent.id,
            nameAndLastName: formData.nameAndLastName,
            eMail: formData.eMail,
            phoneNumber: formData.phoneNumber,
            website: formData.website,
            customerRequest: formData.customerRequest,
            isR1Reciept: formData.isR1Reciept,
            companyName: formData.companyName,
            companyOIB: formData.companyOIB
        });

        onSuccess();
      }
    } catch (err: any) {
      console.error("Error:", err);
      setError(err.response?.data?.error || "Došlo je do pogreške pri stvaranju narudžbe");
      setIsProcessing(false);
    }
  };

  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0,0,0,0.7)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1000,
      padding: "20px"
    }}>
      <div style={{
        backgroundColor: "white",
        padding: "30px",
        borderRadius: "12px",
        maxWidth: "500px",
        width: "100%",
        boxShadow: "0 4px 6px rgba(0,0,0,0.1)"
      }}>
        <h2 style={{ marginTop: 0 }}>Dovršite plaćanje</h2>
        <p style={{ marginBottom: "25px", fontSize: "18px", fontWeight: "bold" }}>
          Iznos: €{amount.toFixed(2)}
        </p>

        <form onSubmit={handleSubmit}>
          <PaymentElement />

          {error && (
            <div style={{
              color: "#dc3545",
              marginTop: "15px",
              padding: "10px",
              backgroundColor: "#f8d7da",
              borderRadius: "4px",
              fontSize: "14px"
            }}>
              {error}
            </div>
          )}

          <div style={{ marginTop: "25px", display: "flex", gap: "10px" }}>
            <button
              type="button"
              onClick={onCancel}
              disabled={isProcessing}
              style={{
                flex: 1,
                padding: "14px",
                backgroundColor: "#6c757d",
                color: "white",
                border: "none",
                borderRadius: "6px",
                fontSize: "16px",
                fontWeight: "500",
                cursor: isProcessing ? "not-allowed" : "pointer",
                opacity: isProcessing ? 0.6 : 1
              }}
            >
              Odustani
            </button>
            <button
              type="submit"
              disabled={!stripe || isProcessing}
              style={{
                flex: 2,
                padding: "14px",
                backgroundColor: (!stripe || isProcessing) ? "#ccc" : "#5469d4",
                color: "white",
                border: "none",
                borderRadius: "6px",
                fontSize: "16px",
                fontWeight: "500",
                cursor: (!stripe || isProcessing) ? "not-allowed" : "pointer"
              }}
            >
              {isProcessing ? "Obrađujem..." : `Plati €${amount.toFixed(2)}`}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function StripePaymentModal({ formData, amount, onSuccess, onCancel }: PaymentModalProps) {
  const [clientSecret, setClientSecret] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [intentCreated, setIntentCreated] = useState(false);

  useEffect(() => {
  if (!intentCreated) {
    createPaymentIntent();
    setIntentCreated(true);
  }
}, [intentCreated]);

  const createPaymentIntent = async () => {
    try {
      const response = await api.post("/orders/create-payment-intent", {
        amount: amount
      });

      setClientSecret(response.data.clientSecret);
      setIsLoading(false);
    } catch (err: any) {
      console.error("Payment intent error:", err);
      setError("Nije moguće inicijalizirati plaćanje");
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,0.7)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000
      }}>
        <div style={{
          backgroundColor: "white",
          padding: "30px",
          borderRadius: "12px",
          textAlign: "center"
        }}>
          <p>Učitavam obrazac za plaćanje...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,0.7)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000
      }}>
        <div style={{
          backgroundColor: "white",
          padding: "30px",
          borderRadius: "12px",
          textAlign: "center"
        }}>
          <p style={{ color: "#dc3545", marginBottom: "20px" }}>{error}</p>
          <button
            onClick={onCancel}
            style={{
              padding: "10px 20px",
              backgroundColor: "#6c757d",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer"
            }}
          >
            Zatvori
          </button>
        </div>
      </div>
    );
  }

  const options = {
    clientSecret,
    appearance: { 
      theme: "stripe" as const,
    },
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm 
        formData={formData}
        amount={amount}
        onSuccess={onSuccess}
        onCancel={onCancel}
      />
    </Elements>
  );
}