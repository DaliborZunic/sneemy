using Microsoft.AspNetCore.Identity;
using Sneemy.API.DTOs.Auth;
using Sneemy.API.Exceptions;
using Sneemy.API.Interfaces;
using Sneemy.API.Models;

namespace Sneemy.API.Services
{
    public class AuthService : IAuthService
    {
        private readonly UserManager<User> _userManager;
        private readonly IJwtService _jwt;

        public AuthService(UserManager<User> userManager, IJwtService jwt)
        {
            _userManager = userManager;
            _jwt = jwt;
        }

        public async Task<AuthResponseDto> Register(RegisterDto dto)
        {
            var existing = await _userManager.FindByEmailAsync(dto.Email);
            if (existing != null)
                throw new BadRequestException("User with this email already exists");

            var user = new User
            {
                Email = dto.Email,
                UserName = dto.Email,
                FirstName = dto.FirstName,
                LastName = dto.LastName
            };

            var result = await _userManager.CreateAsync(user, dto.Password);
            if (!result.Succeeded)
                throw new BadRequestException(string.Join(", ", result.Errors.Select(e => e.Description)));

            await _userManager.AddToRoleAsync(user, "User");

            return await BuildAuthResponse(user);
        }

        public async Task<AuthResponseDto> Login(LoginDto dto)
        {
            var user = await _userManager.FindByEmailAsync(dto.Email);
            if (user == null)
                throw new UnauthorizedException("Invalid email or password");

            var valid = await _userManager.CheckPasswordAsync(user, dto.Password);
            if (!valid)
                throw new UnauthorizedException("Invalid email or password");

            return await BuildAuthResponse(user);
        }

        private async Task<AuthResponseDto> BuildAuthResponse(User user)
        {
            var token = await _jwt.GenerateToken(user);
            var roles = await _userManager.GetRolesAsync(user);

            return new AuthResponseDto
            {
                Token = token,
                Email = user.Email ?? string.Empty,
                FirstName = user.FirstName ?? string.Empty,
                LastName = user.LastName ?? string.Empty,
                Roles = roles.ToList()
            };
        }
    }
}
