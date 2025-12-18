using System.ComponentModel.DataAnnotations;

namespace Sneemy.API.Validation
{
    public class CroatianOibAttribute : ValidationAttribute
    {
        public CroatianOibAttribute() : base("Invalid Croatian OIB format.")
        {
        }

        protected override ValidationResult? IsValid(object? value, ValidationContext validationContext)
        {
            if (value == null || string.IsNullOrWhiteSpace(value.ToString()))
            {
                return ValidationResult.Success; // Let [Required] handle null/empty
            }

            var oib = value.ToString()!;

            if (!IsValidOib(oib))
            {
                return new ValidationResult(ErrorMessage);
            }

            return ValidationResult.Success;
        }

        public static bool IsValidOib(string oib)
        {
            // OIB must be exactly 11 digits
            if (string.IsNullOrWhiteSpace(oib) || oib.Length != 11)
                return false;

            if (!oib.All(char.IsDigit))
                return false;

            // ISO 7064, MOD 11-10 algorithm
            int remainder = 10;

            for (int i = 0; i < 10; i++)
            {
                int digit = oib[i] - '0';
                remainder = remainder + digit;

                remainder = remainder % 10;
                if (remainder == 0)
                    remainder = 10;

                remainder = remainder * 2;
                remainder = remainder % 11;
            }

            int checkDigit = 11 - remainder;
            if (checkDigit == 10)
                checkDigit = 0;

            int lastDigit = oib[10] - '0';

            return checkDigit == lastDigit;
        }
    }
}
