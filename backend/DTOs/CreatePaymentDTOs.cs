namespace Sneemy.API.Models.DTOs
{
    // Request to create payment intent
    public class CreatePaymentIntentDto
    {
        public decimal Amount { get; set; }
        public string Currency { get; set; } = "eur";
    }

    // Response with client secret
    public class PaymentIntentResponseDto
    {
        public string ClientSecret { get; set; } = string.Empty;
        public string PaymentIntentId { get; set; } = string.Empty;
    }

    // Extended order creation with payment
    public class CreateOrderWithPaymentDto
    {
        public string PaymentIntentId { get; set; } = string.Empty;

        // Original order fields
        public string NameAndLastName { get; set; } = string.Empty;
        public string EMail { get; set; } = string.Empty;
        public string? PhoneNumber { get; set; }
        public string? Website { get; set; }
        public string? CustomerRequest { get; set; }
        public bool IsR1Reciept { get; set; }
        public string? CompanyName { get; set; }
        public string? CompanyOIB { get; set; }
    }
}