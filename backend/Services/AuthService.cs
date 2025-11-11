using Microsoft.AspNetCore.Identity;
using Sneemy.API.DTOs.Auth;
using Sneemy.API.Interfaces;
using Sneemy.API.Models;

public class AuthService : IAuthService
{
    private readonly UserManager<User> _userManager;
    private readonly IJwtService _jwt;

    public AuthService(UserManager<User> userManager, IJwtService jwt)
    {
        _userManager = userManager;
        _jwt = jwt;
    }

    public async Task<AuthResponseDto?> Register(RegisterDto dto)
    {
        var existing = await _userManager.FindByEmailAsync(dto.Email);
        if (existing != null) return null;

        var user = new User
        {
            Email = dto.Email,
            UserName = dto.Email,
            FirstName = dto.FirstName,
            LastName = dto.LastName
        };

        var result = await _userManager.CreateAsync(user, dto.Password);
        if (!result.Succeeded) return null;

        await _userManager.AddToRoleAsync(user, "User");

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

    public async Task<AuthResponseDto?> Login(LoginDto dto)
    {
        var user = await _userManager.FindByEmailAsync(dto.Email);
        if (user == null) return null;

        var valid = await _userManager.CheckPasswordAsync(user, dto.Password);
        if (!valid) return null;

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
