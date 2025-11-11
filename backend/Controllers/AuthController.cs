using Microsoft.AspNetCore.Mvc;
using Sneemy.API.DTOs.Auth;
using Sneemy.API.Interfaces;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IAuthService _auth;

    public AuthController(IAuthService auth)
    {
        _auth = auth;
    }

    [HttpPost("register")]
    public async Task<ActionResult<AuthResponseDto>> Register([FromBody] RegisterDto dto)
    {
        var res = await _auth.Register(dto);
        if (res == null) return BadRequest("Unable to register user.");
        return Ok(res);
    }

    [HttpPost("login")]
    public async Task<ActionResult<AuthResponseDto>> Login([FromBody] LoginDto dto)
    {
        var res = await _auth.Login(dto);
        if (res == null) return Unauthorized();
        return Ok(res);
    }
}
