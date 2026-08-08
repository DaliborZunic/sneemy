import { useState } from "react";
import { loadStripe, type StripeElementsOptions } from "@stripe/stripe-js";
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import api from "@api";
import type { StripePaymentModalProps } from "@/types";

const stripePromise = loadStripe("pk_test_tNoYGmY8xGIhDq3IhCQs7hws00agvlMvzW");

function CheckoutForm({ formData, files, serviceId, amount, onSuccess, onCancel }: StripePaymentModalProps) {
    const stripe = useStripe();
    const elements = useElements();
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState("");
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!stripe || !elements)
            return;
        setIsProcessing(true);
        setError("");
        try {
            // First, validate the payment element inputs
            const { error: submitError } = await elements.submit();
            if (submitError) {
                setError(submitError.message || "Plaćanje nije uspjelo");
                setIsProcessing(false);
                return;
            }
            // Create PaymentIntent only when user clicks Pay (deferred creation)
            const response = await api.post("/orders/create-payment-intent", {
                serviceId: serviceId
            });
            const { clientSecret } = response.data;
            // Now confirm the payment with the newly created PaymentIntent
            const { error: stripeError, paymentIntent } = await stripe.confirmPayment({
                elements,
                clientSecret,
                confirmParams: {
                    return_url: window.location.href,
                },
                redirect: "if_required",
            });
            if (stripeError) {
                setError(stripeError.message || "Plaćanje nije uspjelo");
                setIsProcessing(false);
                return;
            }
            if (paymentIntent && paymentIntent.status === "succeeded") {
                const formDataToSend = new FormData();
                formDataToSend.append('paymentIntentId', paymentIntent.id);
                formDataToSend.append('serviceId', String(serviceId));
                formDataToSend.append('nameAndLastName', formData.nameAndLastName);
                formDataToSend.append('eMail', formData.eMail);
                formDataToSend.append('phoneNumber', formData.phoneNumber || '');
                formDataToSend.append('website', formData.website || '');
                formDataToSend.append('customerRequest', formData.customerRequest || '');
                formDataToSend.append('isR1Reciept', String(formData.isR1Reciept));
                formDataToSend.append('companyName', formData.companyName || '');
                formDataToSend.append('companyOIB', formData.companyOIB || '');
                Array.from(files).forEach((file) => {
                    formDataToSend.append('files', file);
                });
                await api.post("/orders", formDataToSend);
                onSuccess();
            }
        }
        catch (err: any) {
            console.error("Error:", err);
            setError(err.response?.data?.error || "Došlo je do pogreške pri stvaranju narudžbe");
            setIsProcessing(false);
        }
    };
    return (<div style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,0.7)",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        zIndex: 1000,
        padding: "20px",
        overflowY: "auto"
    }}>
      <div style={{
        backgroundColor: "white",
        padding: "30px",
        borderRadius: "12px",
        maxWidth: "500px",
        width: "100%",
        maxHeight: "90vh",
        overflowY: "auto",
        boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
        margin: "auto 0"
      }}>
        <h2 style={{ marginTop: 0, color: "#1a1a1a" }}>Dovršite plaćanje</h2>
        <p style={{ marginBottom: "25px", fontSize: "18px", fontWeight: "bold", color: "#4500a2" }}>
          Iznos: €{amount.toFixed(2)}
        </p>

        <form onSubmit={handleSubmit}>
          <PaymentElement />
 
          {error && (<div style={{
                color: "#dc3545",
                marginTop: "15px",
                padding: "10px",
                backgroundColor: "#f8d7da",
                borderRadius: "4px",
                fontSize: "14px"
            }}>
              {error}
            </div>)}

          <div style={{ marginTop: "25px", display: "flex", gap: "10px" }}>
            <button type="button" onClick={onCancel} disabled={isProcessing} style={{
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
        }}>
              Odustani
            </button>
            <button type="submit" disabled={!stripe || isProcessing} style={{
            flex: 2,
            padding: "14px",
            backgroundColor: (!stripe || isProcessing) ? "#ccc" : "#5469d4",
            color: "white",
            border: "none", 
            borderRadius: "6px",
            fontSize: "16px",
            fontWeight: "500",
            cursor: (!stripe || isProcessing) ? "not-allowed" : "pointer"
        }}>
              {isProcessing ? "Obrađujem..." : `Plati €${amount.toFixed(2)}`}
            </button>
          </div>
        </form>
      </div>
    </div>);
}
export default function StripePaymentModal({ formData, files, serviceId, amount, onSuccess, onCancel }: StripePaymentModalProps) {
    // Use deferred intent creation - no PaymentIntent created until user clicks Pay
    const options: StripeElementsOptions = {
        mode: 'payment',
        amount: Math.round(amount * 100), // Convert to cents
        currency: 'eur',
        paymentMethodTypes: ['card'],
        appearance: {
            theme: "stripe",
        },
        locale: 'hr',
    };
    return (<Elements stripe={stripePromise} options={options}>
      <CheckoutForm formData={formData} files={files} serviceId={serviceId} amount={amount} onSuccess={onSuccess} onCancel={onCancel}/>
    </Elements>);
}
