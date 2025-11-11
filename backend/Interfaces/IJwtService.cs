using Sneemy.API.Models;

namespace Sneemy.API.Interfaces
{
    public interface IJwtService
    {
        Task<string> GenerateToken(User user);
    }
}