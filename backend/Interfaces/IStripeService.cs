using Stripe;

namespace Sneemy.API.Interfaces
{
    public interface IStripeService
    {
        Task<PaymentIntent> CreatePaymentIntentAsync(decimal amount, string currency = "eur");
        Task<bool> VerifyPaymentAsync(string paymentIntentId);
        Task<PaymentIntent?> GetPaymentIntentAsync(string paymentIntentId); // ← ADD THIS LINE
    }
}