using System.Net;
using System.Net.Mail;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using Sneemy.API.Configuration;
using Sneemy.API.Interfaces;

namespace Sneemy.API.Services
{
    public class EmailService : IEmailService
    {
        private readonly EmailSettings _settings;
        private readonly ILogger<EmailService> _logger;

        public EmailService(IOptions<EmailSettings> settings, ILogger<EmailService> logger)
        {
            _settings = settings.Value;
            _logger = logger;
        }

        public async Task<bool> SendOrderEmailAsync(OrderEmailData orderData, List<IFormFile>? files)
        {
            try
            {
                using var message = new MailMessage();
                message.From = new MailAddress(_settings.SenderEmail, _settings.SenderName);
                message.To.Add(_settings.ReceiverEmail);
                message.Subject = $"{orderData.CustomerName} - {orderData.StripePaymentIntentId}";
                message.IsBodyHtml = true;
                message.Body = BuildEmailBody(orderData);

                // Add attachments
                if (files != null && files.Count > 0)
                {
                    foreach (var file in files)
                    {
                        if (file.Length > 0)
                        {
                            var stream = new MemoryStream();
                            await file.CopyToAsync(stream);
                            stream.Position = 0;
                            message.Attachments.Add(new Attachment(stream, file.FileName, file.ContentType));
                        }
                    }
                }

                using var client = new SmtpClient(_settings.SmtpHost, _settings.SmtpPort);
                client.EnableSsl = true;
                client.Credentials = new NetworkCredential(_settings.SenderEmail, _settings.AppPassword);

                await client.SendMailAsync(message);
                _logger.LogInformation("Order email sent successfully for {PaymentIntentId}", orderData.StripePaymentIntentId);
                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Failed to send order email for {PaymentIntentId}", orderData.StripePaymentIntentId);
                return false;
            }
        }

        private static string BuildEmailBody(OrderEmailData order)
        {
            var r1Section = order.IsR1Receipt
                ? $@"
                <tr><td style='padding: 8px; border: 1px solid #ddd;'><strong>R1 Račun</strong></td><td style='padding: 8px; border: 1px solid #ddd;'>Da</td></tr>
                <tr><td style='padding: 8px; border: 1px solid #ddd;'><strong>Naziv tvrtke</strong></td><td style='padding: 8px; border: 1px solid #ddd;'>{order.CompanyName ?? "-"}</td></tr>
                <tr><td style='padding: 8px; border: 1px solid #ddd;'><strong>OIB tvrtke</strong></td><td style='padding: 8px; border: 1px solid #ddd;'>{order.CompanyOIB ?? "-"}</td></tr>"
                : "<tr><td style='padding: 8px; border: 1px solid #ddd;'><strong>R1 Račun</strong></td><td style='padding: 8px; border: 1px solid #ddd;'>Ne</td></tr>";

            return $@"
<!DOCTYPE html>
<html>
<head>
    <meta charset='utf-8'>
</head>
<body style='font-family: Arial, sans-serif; line-height: 1.6; color: #333;'>
    <h2 style='color: #2c3e50;'>Nova narudžba</h2>

    <table style='border-collapse: collapse; width: 100%; max-width: 600px;'>
        <tr><td style='padding: 8px; border: 1px solid #ddd;'><strong>Usluga</strong></td><td style='padding: 8px; border: 1px solid #ddd;'>{order.ServiceName}</td></tr>
        <tr><td style='padding: 8px; border: 1px solid #ddd;'><strong>Cijena</strong></td><td style='padding: 8px; border: 1px solid #ddd;'>{order.ServicePrice:0.00} €</td></tr>
        <tr><td style='padding: 8px; border: 1px solid #ddd;'><strong>Stripe ID</strong></td><td style='padding: 8px; border: 1px solid #ddd;'>{order.StripePaymentIntentId}</td></tr>
        <tr><td style='padding: 8px; border: 1px solid #ddd;'><strong>Datum</strong></td><td style='padding: 8px; border: 1px solid #ddd;'>{order.CreatedAt:dd.MM.yyyy HH:mm}</td></tr>
        <tr><td style='padding: 8px; border: 1px solid #ddd;'><strong>Ime i prezime</strong></td><td style='padding: 8px; border: 1px solid #ddd;'>{order.CustomerName}</td></tr>
        <tr><td style='padding: 8px; border: 1px solid #ddd;'><strong>E-mail</strong></td><td style='padding: 8px; border: 1px solid #ddd;'>{order.CustomerEmail}</td></tr>
        <tr><td style='padding: 8px; border: 1px solid #ddd;'><strong>Telefon</strong></td><td style='padding: 8px; border: 1px solid #ddd;'>{order.CustomerPhone ?? "-"}</td></tr>
        <tr><td style='padding: 8px; border: 1px solid #ddd;'><strong>Web stranica</strong></td><td style='padding: 8px; border: 1px solid #ddd;'>{order.CustomerWebsite ?? "-"}</td></tr>
        <tr><td style='padding: 8px; border: 1px solid #ddd;'><strong>Zahtjev kupca</strong></td><td style='padding: 8px; border: 1px solid #ddd;'>{order.CustomerRequest ?? "-"}</td></tr>
        {r1Section}
    </table>
</body>
</html>";
        }
    }
}
