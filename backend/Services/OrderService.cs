using Microsoft.EntityFrameworkCore;
using Sneemy.API.Data;
using Sneemy.API.Models;
using Sneemy.API.Models.DTOs;

namespace Sneemy.API.Services
{
    public class OrderService : IOrderService
    {
        private readonly ApplicationDbContext _context;

        public OrderService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<OrderDto>> GetAllAsync()
        {
            return await _context.Orders
                .OrderByDescending(o => o.CreatedAt)
                .Select(o => new OrderDto
                {
                    Id = o.Id,
                    NameAndLastName = o.NameAndLastName,
                    EMail = o.EMail,
                    PhoneNumber = o.PhoneNumber,
                    Website = o.Website,
                    CustomerRequest = o.CustomerRequest,
                    IsR1Reciept = o.IsR1Reciept,
                    CompanyName = o.CompanyName,
                    CompanyOIB = o.CompanyOIB,
                    CreatedAt = o.CreatedAt
                })
                .ToListAsync();
        }

        public async Task<OrderDto?> GetByIdAsync(Guid id)
        {
            return await _context.Orders
                .Where(o => o.Id == id)
                .Select(o => new OrderDto
                {
                    Id = o.Id,
                    NameAndLastName = o.NameAndLastName,
                    EMail = o.EMail,
                    PhoneNumber = o.PhoneNumber,
                    Website = o.Website,
                    CustomerRequest = o.CustomerRequest,
                    IsR1Reciept = o.IsR1Reciept,
                    CompanyName = o.CompanyName,
                    CompanyOIB = o.CompanyOIB,
                    CreatedAt = o.CreatedAt
                })
                .FirstOrDefaultAsync();
        }

        public async Task<OrderDto> CreateAsync(CreateOrderDto dto)
        {
            var order = new Order
            {
                NameAndLastName = dto.NameAndLastName,
                EMail = dto.EMail,
                PhoneNumber = dto.PhoneNumber,
                Website = dto.Website,
                CustomerRequest = dto.CustomerRequest,
                IsR1Reciept = dto.IsR1Reciept,
                CompanyName = dto.CompanyName,
                CompanyOIB = dto.CompanyOIB,
                CreatedAt = DateTime.UtcNow
            };

            _context.Orders.Add(order);
            await _context.SaveChangesAsync();

            return new OrderDto
            {
                Id = order.Id,
                NameAndLastName = order.NameAndLastName,
                EMail = order.EMail,
                PhoneNumber = order.PhoneNumber,
                Website = order.Website,
                CustomerRequest = order.CustomerRequest,
                IsR1Reciept = order.IsR1Reciept,
                CompanyName = order.CompanyName,
                CompanyOIB = order.CompanyOIB,
                CreatedAt = order.CreatedAt
            };
        }

        public async Task<bool> UpdateAsync(Guid id, CreateOrderDto dto)
        {
            var order = await _context.Orders.FindAsync(id);
            if (order == null) return false;

            order.NameAndLastName = dto.NameAndLastName;
            order.EMail = dto.EMail;
            order.PhoneNumber = dto.PhoneNumber;
            order.Website = dto.Website;
            order.CustomerRequest = dto.CustomerRequest;
            order.IsR1Reciept = dto.IsR1Reciept;
            order.CompanyName = dto.CompanyName;
            order.CompanyOIB = dto.CompanyOIB;

            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteAsync(Guid id)
        {
            var order = await _context.Orders.FindAsync(id);
            if (order == null) return false;

            _context.Orders.Remove(order);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
