using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using BusinessLayer.Interfaces;
using Common.ErrorObjects;
using Common.Models;
using Google.Apis.Auth;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace Backend.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        IUserBusiness _userBusiness;

        public UserController(IUserBusiness userBusiness)
        {
            _userBusiness = userBusiness;
        }


        [HttpPost]
        public Holder<Friend> ConfirmFriendship([FromBody]Friend friend)
        {
            return _userBusiness.ConfirmFriendship(friend);
        }


        // POST: api/User
        [HttpPost]
        public Holder<User> SignUp([FromBody] User user)
        {
            return _userBusiness.SignUp(user);
        }

        [HttpPost]
        public Holder<User> SignIn([FromBody] User user)
        {
           
            return _userBusiness.SignIn(user);
        }

        
        [HttpGet]
        public List<User> GetUsers()
        {
            return _userBusiness.GetUsers();
        }

        [HttpGet]
        public List<Friend> GetFriends()
        {
            return _userBusiness.GetFriends();
        }

        [HttpPost]
        public Holder<Friend> AddFriend([FromBody]Friend friend)
        {
            Holder<Friend> retVal = _userBusiness.AddFriend(friend);

            return retVal;
        }

        [HttpPost]
        public async Task<IActionResult> googleAuthorization([FromBody]User theUser)
        {
            try
            {
                //SimpleLogger.Log("userView = " + userView.tokenId);
                var payload = GoogleJsonWebSignature.ValidateAsync(theUser.TokenId, new GoogleJsonWebSignature.ValidationSettings()).Result;
                
                await Task.Delay(1);
                User user = _userBusiness.FindUserOrAdd(theUser);

                

                var claims = new[]
                {
                    new Claim(JwtRegisteredClaimNames.Sub, _userBusiness.Encrypt(AppSettings.appSettings.JwtEmailEncryption + user.Email)),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                };

                var key = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(AppSettings.appSettings.JwtSecret));
                var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

                var token = new JwtSecurityToken(String.Empty,
                  String.Empty,
                  claims,
                  expires: DateTime.Now.AddSeconds(55 * 60),
                  signingCredentials: creds);
                return Ok(new
                {
                    token = new JwtSecurityTokenHandler().WriteToken(token)
                });
            }
            catch (Exception ex)
            {
               
                BadRequest(ex.Message + "USO");
            }
            return BadRequest();
        }
    }
}
