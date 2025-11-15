namespace Sneemy.API.Models.DTOs
{
    public class OrderDto
    {
        public Guid Id { get; set; }
        public string NameAndLastName { get; set; } = null!;
        public string EMail { get; set; } = null!;
        public string? PhoneNumber { get; set; }
        public string? Website { get; set; }
        public string? CustomerRequest { get; set; }
        public bool IsR1Reciept { get; set; }
        public string? CompanyName { get; set; }
        public string? CompanyOIB { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
