using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Auth_Angular_Core.helper;
using Auth_Angular_Core.models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using System.Text;
using Npgsql;
using Microsoft.AspNetCore.Http;
using System.Text.RegularExpressions;

namespace Auth_Angular_Core.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SignInController : Controller
    {
        private DataBaseContext context;

        public SignInController(DataBaseContext ctx)
        {
            context = ctx;
        }

        [HttpPost]
        public IActionResult Login([FromBody] User model)
        {
            if(ModelState.IsValid)
            {
                context.Users.Add(model);
                try
                {
                    context.SaveChanges();
                }
                catch (DbUpdateException ex)
                {
                    if (ex.InnerException != null)
                    {
                        PostgresException excep = ex.InnerException as PostgresException;
                        if (excep.Code == "23505")
                        {
                            return Conflict(new { message = "Email is Exist" });
                        }
                    }
                }
                return Json(Ok());
            }

            return BadRequest(ModelState);
        }

        [HttpPost]
        [Route("[action]")]
        public IActionResult ExistUser([FromBody] string email)
        {
           if(Regex.IsMatch(email, @"^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$")) {
            var user = context.Users.Where(u => u.Email == email).Select(u => u.Email);
            return Ok(user);
           }

           return BadRequest("This e-mail address is not valid...");
        }
    }
}