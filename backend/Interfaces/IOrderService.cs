using Sneemy.API.Models.DTOs;

namespace Sneemy.API.Services
{
    public interface IOrderService
    {
        Task<IEnumerable<OrderDto>> GetAllAsync();
        Task<OrderDto> GetByIdAsync(Guid id);
        Task<OrderDto> CreateAsync(CreateOrderDto dto);
        Task UpdateAsync(Guid id, CreateOrderDto dto);
        Task DeleteAsync(Guid id);

        // Payment-related operations
        Task<PaymentIntentResponseDto> CreatePaymentIntentAsync(CreatePaymentIntentDto dto);
        Task<OrderDto> CreateOrderWithPaymentAsync(CreateOrderWithPaymentDto dto);
    }
}
