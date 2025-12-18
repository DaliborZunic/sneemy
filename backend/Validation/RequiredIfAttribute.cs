using System.ComponentModel.DataAnnotations;

namespace Sneemy.API.Validation
{
    public class RequiredIfAttribute : ValidationAttribute
    {
        private readonly string _dependentProperty;
        private readonly object _targetValue;

        public RequiredIfAttribute(string dependentProperty, object targetValue)
        {
            _dependentProperty = dependentProperty;
            _targetValue = targetValue;
        }

        protected override ValidationResult? IsValid(object? value, ValidationContext validationContext)
        {
            var dependentPropertyInfo = validationContext.ObjectType.GetProperty(_dependentProperty);

            if (dependentPropertyInfo == null)
            {
                return new ValidationResult($"Unknown property: {_dependentProperty}");
            }

            var dependentValue = dependentPropertyInfo.GetValue(validationContext.ObjectInstance);

            // Check if the dependent property equals the target value
            if (Equals(dependentValue, _targetValue))
            {
                // Field is required
                if (value == null || string.IsNullOrWhiteSpace(value.ToString()))
                {
                    return new ValidationResult(ErrorMessage ?? $"{validationContext.DisplayName} is required.");
                }
            }

            return ValidationResult.Success;
        }
    }
}
