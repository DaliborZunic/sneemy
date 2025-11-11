using Sneemy.API.DTOs.User;

namespace Sneemy.API.Interfaces
{
    public interface IUserService
    {
        Task<List<UserDto>> GetAllUsers();
        Task<UserDto?> GetUserById(string id);
        Task<UserDto?> CreateUser(CreateUserDto createUserDto);
        Task<UserDto?> UpdateUser(string id, CreateUserDto updateUserDto);
        Task<bool> DeleteUser(string id);
    }
}