using Microsoft.AspNetCore.Mvc;
using Sneemy.API.Interfaces;
using Sneemy.API.Models.DTOs;

namespace Sneemy.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ServicesController : ControllerBase
    {
        private readonly IServiceService _serviceService;

        public ServicesController(IServiceService serviceService)
        {
            _serviceService = serviceService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ServiceDto>>> GetAll()
            => Ok(await _serviceService.GetAllActiveAsync());
    }
}
