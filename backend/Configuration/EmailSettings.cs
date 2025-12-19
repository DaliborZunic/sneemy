namespace Sneemy.API.Configuration
{
    public class EmailSettings
    {
        public string SenderEmail { get; set; } = null!;
        public string SenderName { get; set; } = null!;
        public string AppPassword { get; set; } = null!;
        public string ReceiverEmail { get; set; } = null!;
        public string SmtpHost { get; set; } = "smtp.gmail.com";
        public int SmtpPort { get; set; } = 587;
    }
}
