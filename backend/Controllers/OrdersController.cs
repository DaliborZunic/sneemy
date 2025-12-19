using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Sneemy.API.Interfaces;
using Sneemy.API.Models.DTOs;
using Sneemy.API.Services;

namespace Sneemy.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize] // default: protected
    public class OrdersController : ControllerBase
    {
        private readonly IOrderService _orderService;
        private readonly IStripeService _stripeService;

        public OrdersController(IOrderService orderService, IStripeService stripeService)
        {
            _orderService = orderService;
            _stripeService = stripeService;
        }

        // POST api/orders/create-payment-intent (PUBLIC)
        [HttpPost("create-payment-intent")]
        [AllowAnonymous]
        public async Task<ActionResult<PaymentIntentResponseDto>> CreatePaymentIntent(
            [FromBody] CreatePaymentIntentDto dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var paymentIntent = await _stripeService.CreatePaymentIntentAsync(
                    dto.Amount,
                    dto.Currency);

                return Ok(new PaymentIntentResponseDto
                {
                    ClientSecret = paymentIntent.ClientSecret,
                    PaymentIntentId = paymentIntent.Id
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.Message });
            }
        }

        // POST api/orders (PUBLIC - but requires payment)
        [HttpPost]
        [AllowAnonymous]
        public async Task<ActionResult<OrderDto>> CreateOrder(
    [FromBody] CreateOrderWithPaymentDto dto)
        {
            Console.WriteLine($"=== ORDER REQUEST ===");
            Console.WriteLine($"PaymentIntentId: {dto.PaymentIntentId}");
            Console.WriteLine($"Name: {dto.NameAndLastName}");

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Verify payment with Stripe
            Console.WriteLine("Verifying payment...");
            var paymentValid = await _stripeService.VerifyPaymentAsync(dto.PaymentIntentId);
            Console.WriteLine($"Payment valid: {paymentValid}");

            if (!paymentValid)
            {
                Console.WriteLine("PAYMENT VERIFICATION FAILED!");
                return BadRequest(new { error = "Payment not confirmed or failed" });
            }

            Console.WriteLine("Creating order in database...");
            var createOrderDto = new CreateOrderDto
            {
                NameAndLastName = dto.NameAndLastName,
                EMail = dto.EMail,
                PhoneNumber = dto.PhoneNumber,
                Website = dto.Website,
                CustomerRequest = dto.CustomerRequest,
                IsR1Reciept = dto.IsR1Reciept,
                CompanyName = dto.CompanyName,
                CompanyOIB = dto.CompanyOIB,
                StripePaymentIntentId = dto.PaymentIntentId
            };

            var created = await _orderService.CreateAsync(createOrderDto);
            Console.WriteLine($"Order created! ID: {created.Id}");

            return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
        }

        // GET api/orders (PROTECTED)
        [HttpGet]
        public async Task<ActionResult<IEnumerable<OrderDto>>> GetAll()
        {
            var orders = await _orderService.GetAllAsync();
            return Ok(orders);
        }

        // GET api/orders/{id} (PROTECTED)
        [HttpGet("{id:guid}")]
        public async Task<ActionResult<OrderDto>> GetById(Guid id)
        {
            var order = await _orderService.GetByIdAsync(id);
            if (order == null) return NotFound();
            return Ok(order);
        }

        // PUT api/orders/{id} (PROTECTED)
        [HttpPut("{id:guid}")]
        public async Task<IActionResult> Update(Guid id, [FromBody] CreateOrderDto dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var updated = await _orderService.UpdateAsync(id, dto);
            if (!updated) return NotFound();

            return NoContent();
        }

        // DELETE api/orders/{id} (PROTECTED)
        [HttpDelete("{id:guid}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var deleted = await _orderService.DeleteAsync(id);
            if (!deleted) return NotFound();

            return NoContent();
        }
    }
}