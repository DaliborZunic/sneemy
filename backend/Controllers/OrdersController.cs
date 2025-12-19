using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Sneemy.API.Models.DTOs;
using Sneemy.API.Services;

namespace Sneemy.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class OrdersController : ControllerBase
    {
        private readonly IOrderService _orderService;

        public OrdersController(IOrderService orderService)
        {
            _orderService = orderService;
        }

        [HttpPost("create-payment-intent")]
        [AllowAnonymous]
        public async Task<ActionResult<PaymentIntentResponseDto>> CreatePaymentIntent([FromBody] CreatePaymentIntentDto dto)
            => Ok(await _orderService.CreatePaymentIntentAsync(dto));

        [HttpPost]
        [AllowAnonymous]
        [RequestSizeLimit(30 * 1024 * 1024)]
        public async Task<ActionResult<OrderDto>> CreateOrder([FromForm] CreateOrderWithPaymentDto dto, [FromForm] List<IFormFile>? files)
            => Ok(await _orderService.CreateOrderWithPaymentAsync(dto, files));

        [HttpGet]
        public async Task<ActionResult<IEnumerable<OrderDto>>> GetAll()
            => Ok(await _orderService.GetAllAsync());

        [HttpGet("{id:guid}")]
        public async Task<ActionResult<OrderDto>> GetById(Guid id)
            => Ok(await _orderService.GetByIdAsync(id));

        [HttpPut("{id:guid}")]
        public async Task<IActionResult> Update(Guid id, [FromBody] CreateOrderDto dto)
        {
            await _orderService.UpdateAsync(id, dto);
            return NoContent();
        }

        [HttpDelete("{id:guid}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            await _orderService.DeleteAsync(id);
            return NoContent();
        }
    }
}