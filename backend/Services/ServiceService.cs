using Microsoft.EntityFrameworkCore;
using Sneemy.API.Data;
using Sneemy.API.Interfaces;
using Sneemy.API.Models.DTOs;

namespace Sneemy.API.Services
{
    public class ServiceService : IServiceService
    {
        private readonly ApplicationDbContext _context;

        public ServiceService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<ServiceDto>> GetAllActiveAsync()
        {
            return await _context.Services
                .Where(s => s.IsActive)
                .OrderBy(s => s.DisplayOrder)
                .Select(s => new ServiceDto
                {
                    Id = s.Id,
                    Name = s.Name,
                    Description = s.Description,
                    Price = s.Price,
                    Features = s.Features
                })
                .ToListAsync();
        }
    }
}
