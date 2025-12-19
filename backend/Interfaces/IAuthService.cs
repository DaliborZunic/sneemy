using Sneemy.API.DTOs.Auth;

namespace Sneemy.API.Interfaces
{
    public interface IAuthService
    {
        Task<AuthResponseDto> Login(LoginDto loginDto);
        Task<AuthResponseDto> Register(RegisterDto registerDto);
    }
}