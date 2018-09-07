using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ChessCompetitionApi.Data;
using ChessCompetitionApi.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Cryptography;
using System.Text;

namespace ChessCompetitionApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly CompetitionDbContext _context;
        private readonly SHA1 _sha1Hash;

        public AccountController(CompetitionDbContext context)
        {
            _context = context;
            _sha1Hash = SHA1.Create();
        }

        // POST api/accounts
        [HttpPost]
        public async Task<IActionResult> Post([FromBody]RegistrationViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var userIdentity = new User
            {
                UserName = model.Username,
                NormalizedUserName = model.Username,

                PasswordHash = Convert.ToBase64String(_sha1Hash.ComputeHash(Encoding.UTF8.GetBytes(model.Password)))
            };

            await _context.Users.AddAsync(userIdentity);
            await _context.SaveChangesAsync();

            return new OkObjectResult("Account created");
        }
    }
}