using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BusinessLayer.Interfaces;
using Common.ErrorObjects;
using Common.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

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

      
    }
}
