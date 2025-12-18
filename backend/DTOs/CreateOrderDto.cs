using System.ComponentModel.DataAnnotations;
using Sneemy.API.Validation;

namespace Sneemy.API.Models.DTOs
{
    public class CreateOrderDto
    {
        [Required(ErrorMessage = "Name and last name is required.")]
        [StringLength(200, MinimumLength = 2, ErrorMessage = "Name must be between 2 and 200 characters.")]
        public string NameAndLastName { get; set; } = null!;

        [Required(ErrorMessage = "Email is required.")]
        [EmailAddress(ErrorMessage = "Invalid email format.")]
        public string EMail { get; set; } = null!;

        [RegularExpression(@"^\+?[\d\s\-()]+$", ErrorMessage = "Invalid phone number format.")]
        public string? PhoneNumber { get; set; }

        [RegularExpression(@"^(https?://)?([\w-]+\.)+[\w-]+(/[\w\-./?%&=]*)?$", ErrorMessage = "Invalid website URL format.")]
        public string? Website { get; set; }

        [StringLength(2000, ErrorMessage = "Customer request cannot exceed 2000 characters.")]
        public string? CustomerRequest { get; set; }

        public bool IsR1Reciept { get; set; }

        [RequiredIf(nameof(IsR1Reciept), true, ErrorMessage = "Company name is required for R1 receipt.")]
        [StringLength(300, ErrorMessage = "Company name cannot exceed 300 characters.")]
        public string? CompanyName { get; set; }

        [RequiredIf(nameof(IsR1Reciept), true, ErrorMessage = "Company OIB is required for R1 receipt.")]
        [CroatianOib(ErrorMessage = "Invalid Croatian OIB. Must be 11 digits with valid check digit.")]
        public string? CompanyOIB { get; set; }
    }
}