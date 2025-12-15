using Sneemy.API.Interfaces;
using Stripe;

namespace Sneemy.API.Services
{
    public class StripeService : IStripeService
    {
        public StripeService(IConfiguration configuration)
        {
            var secretKey = configuration["Stripe:SecretKey"];
            StripeConfiguration.ApiKey = secretKey;
        }

        public async Task<PaymentIntent> CreatePaymentIntentAsync(decimal amount, string currency = "eur")
        {
            var options = new PaymentIntentCreateOptions
            {
                Amount = (long)(amount * 100), // Convert to cents
                Currency = currency,
                AutomaticPaymentMethods = new PaymentIntentAutomaticPaymentMethodsOptions
                {
                    Enabled = true,
                },
            };

            var service = new PaymentIntentService();
            return await service.CreateAsync(options);
        }

        public async Task<bool> VerifyPaymentAsync(string paymentIntentId)
        {
            try
            {
                var paymentIntent = await GetPaymentIntentAsync(paymentIntentId);

                Console.WriteLine($"Payment Intent Status: {paymentIntent?.Status}"); // DEBUG
                Console.WriteLine($"Payment Intent ID: {paymentIntentId}"); // DEBUG

                // Accept both "succeeded" and "requires_capture" (for some payment methods)
                return paymentIntent?.Status == "succeeded" ||
                       paymentIntent?.Status == "requires_capture";
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error verifying payment: {ex.Message}"); // DEBUG
                return false;
            }
        }

        // ADD THIS METHOD:
        public async Task<PaymentIntent?> GetPaymentIntentAsync(string paymentIntentId)
        {
            try
            {
                var service = new PaymentIntentService();
                return await service.GetAsync(paymentIntentId);
            }
            catch (StripeException)
            {
                return null;
            }
        }
    }
}