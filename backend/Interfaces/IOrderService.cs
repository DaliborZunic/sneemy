using Sneemy.API.Models.DTOs;

namespace Sneemy.API.Services
{
    public interface IOrderService
    {
        Task<IEnumerable<OrderDto>> GetAllAsync();
        Task<OrderDto?> GetByIdAsync(Guid id);
        Task<OrderDto> CreateAsync(CreateOrderDto dto);
        Task<bool> UpdateAsync(Guid id, CreateOrderDto dto);
        Task<bool> DeleteAsync(Guid id);
    }
}
