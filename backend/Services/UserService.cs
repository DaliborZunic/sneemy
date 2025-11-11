using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Sneemy.API.DTOs.User;
using Sneemy.API.Interfaces;
using Sneemy.API.Models;

public class UserService : IUserService
{
    private readonly UserManager<User> _userManager;
    private readonly RoleManager<Microsoft.AspNetCore.Identity.IdentityRole> _roleManager;

    public UserService(UserManager<User> userManager,
        RoleManager<Microsoft.AspNetCore.Identity.IdentityRole> roleManager)
    {
        _userManager = userManager;
        _roleManager = roleManager;
    }

    public async Task<List<UserDto>> GetAllUsers()
    {
        var users = await _userManager.Users.OrderBy(u => u.Email).ToListAsync();
        var result = new List<UserDto>();
        foreach (var u in users)
        {
            var roles = await _userManager.GetRolesAsync(u);
            result.Add(new UserDto
            {
                Id = u.Id,
                Email = u.Email ?? string.Empty,
                FirstName = u.FirstName ?? string.Empty,
                LastName = u.LastName ?? string.Empty,
                Roles = roles.ToList(),
                CreatedAt = u.CreatedAt
            });
        }
        return result;
    }

    public async Task<UserDto?> GetUserById(string id)
    {
        var u = await _userManager.FindByIdAsync(id);
        if (u == null) return null;
        var roles = await _userManager.GetRolesAsync(u);
        return new UserDto
        {
            Id = u.Id,
            Email = u.Email ?? string.Empty,
            FirstName = u.FirstName ?? string.Empty,
            LastName = u.LastName ?? string.Empty,
            Roles = roles.ToList(),
            CreatedAt = u.CreatedAt
        };
    }

    public async Task<UserDto?> CreateUser(CreateUserDto dto)
    {
        var exists = await _userManager.FindByEmailAsync(dto.Email);
        if (exists != null) return null;

        var user = new User
        {
            Email = dto.Email,
            UserName = dto.Email,
            FirstName = dto.FirstName,
            LastName = dto.LastName
        };

        var create = await _userManager.CreateAsync(user, dto.Password);
        if (!create.Succeeded) return null;

        if (!await _roleManager.RoleExistsAsync(dto.Role))
            await _roleManager.CreateAsync(new IdentityRole(dto.Role));

        await _userManager.AddToRoleAsync(user, dto.Role);

        var roles = await _userManager.GetRolesAsync(user);
        return new UserDto
        {
            Id = user.Id,
            Email = user.Email ?? string.Empty,
            FirstName = user.FirstName ?? string.Empty,
            LastName = user.LastName ?? string.Empty,
            Roles = roles.ToList(),
            CreatedAt = user.CreatedAt
        };
    }

    public async Task<UserDto?> UpdateUser(string id, CreateUserDto dto)
    {
        var u = await _userManager.FindByIdAsync(id);
        if (u == null) return null;

        u.Email = dto.Email;
        u.UserName = dto.Email;
        u.FirstName = dto.FirstName;
        u.LastName = dto.LastName;

        var update = await _userManager.UpdateAsync(u);
        if (!update.Succeeded) return null;

        // Roles: replace with provided one
        var currentRoles = await _userManager.GetRolesAsync(u);
        await _userManager.RemoveFromRolesAsync(u, currentRoles);
        if (!await _roleManager.RoleExistsAsync(dto.Role))
            await _roleManager.CreateAsync(new IdentityRole(dto.Role));
        await _userManager.AddToRoleAsync(u, dto.Role);

        return await GetUserById(id);
    }

    public async Task<bool> DeleteUser(string id)
    {
        var u = await _userManager.FindByIdAsync(id);
        if (u == null) return false;
        var res = await _userManager.DeleteAsync(u);
        return res.Succeeded;
    }
}
