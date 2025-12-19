using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Sneemy.API.Models
{
    public class Order
    {
        public Guid Id { get; set; } = Guid.NewGuid();

        [Required]
        public int ServiceId { get; set; }

        [ForeignKey(nameof(ServiceId))]
        public Service Service { get; set; } = null!;

        [Required]
        public decimal ServicePrice { get; set; }

        [Required]
        [MaxLength(200)]
        public string NameAndLastName { get; set; } = null!;

        [Required]
        [MaxLength(254)]
        public string EMail { get; set; } = null!;

        [MaxLength(50)]
        public string? PhoneNumber { get; set; }

        [MaxLength(500)]
        public string? Website { get; set; }

        [MaxLength(2000)]
        public string? CustomerRequest { get; set; }

        public bool IsR1Reciept { get; set; }

        [MaxLength(300)]
        public string? CompanyName { get; set; }

        [MaxLength(11)]
        public string? CompanyOIB { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        [Required]
        [MaxLength(255)]
        public string StripePaymentIntentId { get; set; } = null!;

        public bool FilesAttached { get; set; }
    }
}
