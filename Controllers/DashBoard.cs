using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Auth_Angular_Core.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DashBoard: Controller
    {
        [Authorize]
        [HttpGet]
        public IActionResult GetDashBoard() {
            return Ok("Onil");
        }
    }
}