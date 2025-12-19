using Sneemy.API.Models.DTOs;

namespace Sneemy.API.Interfaces
{
    public interface IServiceService
    {
        Task<IEnumerable<ServiceDto>> GetAllActiveAsync();
    }
}
