using System;
using Auth_Angular_Core.models;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using Auth_Angular_Core.helper;
using System.Collections.Generic;

namespace Auth_Angular_Core.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SignUpController : Controller
    {
        private DataBaseContext context;

        public SignUpController(DataBaseContext ctx)
        {
            context = ctx;
        }

        [HttpPost]
        public async Task<IActionResult> SignUp([FromBody] User model)
        {
            if (ModelState.IsValid)
            {
                var salt = Salt.Create();
                var user = await context.Users.FirstOrDefaultAsync(u => u.Email == model.Email);

                if(user == null){
                    return BadRequest("This Email isn't register");
                }

                var match = Hash.Validate(model.Password, salt, user.Password);

                if(match){
                    var token = Token.Create(user.Email);

                    return Json(Ok(token));
                }else {
                    return BadRequest("This password ins't correct");
                }
            }
            return BadRequest(ModelState);
        }
    }
}