using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Sneemy.API.Data;
using Sneemy.API.Exceptions;
using Sneemy.API.Interfaces;
using Sneemy.API.Models;
using Sneemy.API.Models.DTOs;

namespace Sneemy.API.Services
{
    public class OrderService : IOrderService
    {
        private readonly ApplicationDbContext _context;
        private readonly IStripeService _stripeService;
        private readonly IEmailService _emailService;

        public OrderService(ApplicationDbContext context, IStripeService stripeService, IEmailService emailService)
        {
            _context = context;
            _stripeService = stripeService;
            _emailService = emailService;
        }

        public async Task<PaymentIntentResponseDto> CreatePaymentIntentAsync(CreatePaymentIntentDto dto)
        {
            var paymentIntent = await _stripeService.CreatePaymentIntentAsync(dto.Amount, dto.Currency);

            return new PaymentIntentResponseDto
            {
                ClientSecret = paymentIntent.ClientSecret,
                PaymentIntentId = paymentIntent.Id
            };
        }

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

        public async Task<OrderDto> CreateOrderWithPaymentAsync(CreateOrderWithPaymentDto dto, List<IFormFile>? files)
        {
            var paymentValid = await _stripeService.VerifyPaymentAsync(dto.PaymentIntentId);

            if (!paymentValid)
                throw new BadRequestException("Payment not confirmed or failed");

            var hasFiles = files != null && files.Count > 0;

            if (hasFiles)
            {
                var totalSize = files!.Sum(f => f.Length);
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
            var createdAt = DateTime.UtcNow;

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
                CreatedAt = createdAt,
                StripePaymentIntentId = dto.PaymentIntentId,
                FilesAttached = hasFiles
            };

            _context.Orders.Add(order);
            await _context.SaveChangesAsync();

            // Send email with order details and files (don't fail if email fails)
            var emailData = new OrderEmailData
            {
                CustomerName = dto.NameAndLastName,
                CustomerEmail = dto.EMail,
                CustomerPhone = dto.PhoneNumber,
                CustomerWebsite = dto.Website,
                CustomerRequest = dto.CustomerRequest,
                IsR1Receipt = dto.IsR1Reciept,
                CompanyName = dto.CompanyName,
                CompanyOIB = dto.CompanyOIB,
                StripePaymentIntentId = dto.PaymentIntentId,
                CreatedAt = createdAt
            };

            await _emailService.SendOrderEmailAsync(emailData, files);

            return MapToDto(order);
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
                    CreatedAt = o.CreatedAt,
                    StripePaymentIntentId = o.StripePaymentIntentId,
                    FilesAttached = o.FilesAttached
                })
                .ToListAsync();
        }

        public async Task<OrderDto> GetByIdAsync(Guid id)
        {
            var order = await _context.Orders.FindAsync(id);

            if (order == null)
                throw new NotFoundException("Order not found");

            return MapToDto(order);
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
                CreatedAt = DateTime.UtcNow,
                StripePaymentIntentId = dto.StripePaymentIntentId,
                FilesAttached = false
            };

            _context.Orders.Add(order);
            await _context.SaveChangesAsync();

            return MapToDto(order);
        }

        public async Task UpdateAsync(Guid id, CreateOrderDto dto)
        {
            var order = await _context.Orders.FindAsync(id);
            if (order == null)
                throw new NotFoundException("Order not found");

            order.NameAndLastName = dto.NameAndLastName;
            order.EMail = dto.EMail;
            order.PhoneNumber = dto.PhoneNumber;
            order.Website = dto.Website;
            order.CustomerRequest = dto.CustomerRequest;
            order.IsR1Reciept = dto.IsR1Reciept;
            order.CompanyName = dto.CompanyName;
            order.CompanyOIB = dto.CompanyOIB;

            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(Guid id)
        {
            var order = await _context.Orders.FindAsync(id);
            if (order == null)
                throw new NotFoundException("Order not found");

            _context.Orders.Remove(order);
            await _context.SaveChangesAsync();
        }

        private static OrderDto MapToDto(Order order)
        {
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
                CreatedAt = order.CreatedAt,
                StripePaymentIntentId = order.StripePaymentIntentId,
                FilesAttached = order.FilesAttached
            };
        }
    }
}
