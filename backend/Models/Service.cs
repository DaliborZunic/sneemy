using System.ComponentModel.DataAnnotations;

namespace Sneemy.API.Models
{
    public class Service
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(100)]
        public string Name { get; set; } = null!;

        [Required]
        [MaxLength(500)]
        public string Description { get; set; } = null!;

        [Required]
        public decimal Price { get; set; }

        public List<string> Features { get; set; } = new();

        public bool IsActive { get; set; } = true;

        public int DisplayOrder { get; set; }

        [Required]
        [MaxLength(20)]
        public string VideoType { get; set; } = "landscape"; // "reel" for portrait, "landscape" for YouTube-style
    }
}
