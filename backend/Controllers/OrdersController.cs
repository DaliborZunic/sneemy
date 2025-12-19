using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Sneemy.API.Exceptions;
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
        private const long MaxTotalFileSize = 25 * 1024 * 1024; // 25MB
        private static readonly HashSet<string> AllowedExtensions = new(StringComparer.OrdinalIgnoreCase)
        {
            ".pdf", ".ppt", ".pptx", ".doc", ".docx", ".txt",
            ".jpeg", ".jpg", ".png", ".gif", ".zip", ".rar"
        };
        private static readonly HashSet<string> BlockedExtensions = new(StringComparer.OrdinalIgnoreCase)
        {
            ".exe", ".bat", ".cmd", ".com", ".msi", ".scr", ".ps1", ".vbs", ".js", ".dll"
        };

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
        [RequestSizeLimit(30 * 1024 * 1024)] // 30MB to allow some overhead
        public async Task<ActionResult<OrderDto>> CreateOrder([FromForm] CreateOrderWithPaymentDto dto, [FromForm] List<IFormFile>? files)
        {
            if (files != null && files.Count > 0)
            {
                var totalSize = files.Sum(f => f.Length);
                if (totalSize > MaxTotalFileSize)
                    throw new BadRequestException($"Ukupna veličina datoteka prelazi 25MB limit ({totalSize / 1024 / 1024}MB)");

                foreach (var file in files)
                {
                    var ext = Path.GetExtension(file.FileName);
                    if (BlockedExtensions.Contains(ext))
                        throw new BadRequestException($"Vrsta datoteke '{ext}' nije dozvoljena");
                    if (!AllowedExtensions.Contains(ext))
                        throw new BadRequestException($"Vrsta datoteke '{ext}' nije podržana. Dozvoljene: pdf, ppt, pptx, doc, docx, txt, jpeg, jpg, png, gif, zip, rar");
                }
            }

            return Ok(await _orderService.CreateOrderWithPaymentAsync(dto, files));
        }

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