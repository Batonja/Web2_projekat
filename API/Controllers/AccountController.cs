using System.Security.Claims;
using System.Threading.Tasks;
using API.DTOs;
using API.Services;
using AutoMapper;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [AllowAnonymous]
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly TokenService _tokenService;
        private readonly RoleManager<IdentityRole> _roleManager;

        public AccountController(UserManager<AppUser> userManager, RoleManager<IdentityRole> roleManager, SignInManager<AppUser> signInManager, TokenService tokenService)
        {
            _roleManager = roleManager;

            _tokenService = tokenService;
            _signInManager = signInManager;
            _userManager = userManager;

        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {

            var user = await _userManager.FindByEmailAsync(loginDto.Email);
            if (user == null) return Unauthorized();

            var result = await _signInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);

            if (result.Succeeded)
            {
                return new UserDto
                {
                    DisplayName = user.DisplayName,
                    Username = user.UserName,
                    Token = _tokenService.CreateToken(user),
                    Image = null
                };
            }

            return Unauthorized();
        }

        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDTO registerDTO)
        {
            if (await _userManager.Users.AnyAsync(x => x.Email == registerDTO.Email))
                return BadRequest("Email taken");
            if (await _userManager.Users.AnyAsync(x => x.UserName == registerDTO.UserName))
                return BadRequest("Username taken");
            var user = new AppUser
            {
                UserName = registerDTO.UserName,
                Email = registerDTO.Email,
                PassportID = registerDTO.PassportID,
                PhoneNumber = registerDTO.PhoneNumber,
                FirstName = registerDTO.FirstName,
                LastName = registerDTO.LastName,

            };


            var result = await _userManager.CreateAsync(user, registerDTO.Password);

            if (result.Succeeded)
            {
                var createdUser = await _userManager.FindByEmailAsync(user.Email);
                await _userManager.AddToRoleAsync(createdUser, RoleConstants.RegularUser);
                return CreateUserDtoObject(user);
            }

            return BadRequest("Problem registring user");


        }
        [Authorize]
        [HttpGet]
        public async Task<ActionResult<UserDto>> GetCurrentUser()
        {
            var user = await _userManager.FindByEmailAsync(User.FindFirstValue(ClaimTypes.Email));
            return CreateUserDtoObject(user);
        }

        private UserDto CreateUserDtoObject(AppUser user)
        {
            return new UserDto
            {
                DisplayName = user.DisplayName,
                Image = null,
                Token = _tokenService.CreateToken(user),
                Username = user.UserName
            };
        }
    }
}