using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ChessCompetitionApi.Data;
using ChessCompetitionApi.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace ChessCompetitionApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly CompetitionDb _competitionDb;
        private readonly UserManager<Account> _userManager;

        public AccountController(UserManager<Account> userManager, CompetitionDb competitionDb)
        {
            _userManager = userManager;
            _competitionDb = competitionDb;
        }

        // POST api/account
        [HttpPost]
        public async Task<IActionResult> Post([FromBody]RegistrationViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var userIdentity = new Account
            {
                UserName = model.Email,
                Enabled = false
            };

            var result = await _userManager.CreateAsync(userIdentity, model.Password);

            if (!result.Succeeded) return new BadRequestObjectResult("invalid username or password");            

            return new OkObjectResult("Account created");
        }
    }
}