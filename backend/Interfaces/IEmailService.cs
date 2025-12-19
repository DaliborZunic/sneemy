using Microsoft.AspNetCore.Http;

namespace Sneemy.API.Interfaces
{
    public class OrderEmailData
    {
        public string CustomerName { get; set; } = null!;
        public string CustomerEmail { get; set; } = null!;
        public string? CustomerPhone { get; set; }
        public string? CustomerWebsite { get; set; }
        public string? CustomerRequest { get; set; }
        public bool IsR1Receipt { get; set; }
        public string? CompanyName { get; set; }
        public string? CompanyOIB { get; set; }
        public string StripePaymentIntentId { get; set; } = null!;
        public DateTime CreatedAt { get; set; }
    }

    public interface IEmailService
    {
        Task<bool> SendOrderEmailAsync(OrderEmailData orderData, List<IFormFile>? files);
    }
}
