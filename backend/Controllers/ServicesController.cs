using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Sneemy.API.Data;
using Sneemy.API.Models.DTOs;

namespace Sneemy.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ServicesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ServicesController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ServiceDto>>> GetAll()
        {
            var services = await _context.Services
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

            return Ok(services);
        }
    }
}
