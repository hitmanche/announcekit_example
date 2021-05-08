using announcekit_api.Model;
using announcekit_api.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace announcekit_api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LoginController : ControllerBase
    {
        readonly IConfiguration _configuration;
        readonly IUserRepo _userRepo;

        public LoginController(IConfiguration configuration,IUserRepo userRepo)
        {
            _configuration = configuration;
            _userRepo = userRepo;
        }
        [HttpPost("[action]")]
        public async Task<bool> Create([FromForm] User user)
        {
            _userRepo.Add(user);
            return true;
        }
        [HttpPost("[action]")]
        public Token Login([FromBody] UserLogin userLogin)
        {
            User user = _userRepo.FirstOrDefault(x => x.Email == userLogin.Email && x.Password == userLogin.Password);
            if (user != null)
            {
                //Token üretiliyor.
                TokenHandler tokenHandler = new TokenHandler(_configuration);
                Token token = tokenHandler.CreateAccessToken(user);

                //Refresh token Users tablosuna işleniyor.
                user.RefreshToken = token.RefreshToken;
                user.RefreshTokenEndDate = token.Expiration.AddMinutes(3);
                return token;
            }
            return null;
        }

        [HttpPost("[action]")]
        public Token RefreshTokenLogin([FromBody] User refreshToken)
        {
            User user = _userRepo.FirstOrDefault(x => x.RefreshToken == refreshToken.RefreshToken);
            if (user != null && user?.RefreshTokenEndDate > DateTime.Now)
            {
                TokenHandler tokenHandler = new TokenHandler(_configuration);
                Token token = tokenHandler.CreateAccessToken(user);

                user.RefreshToken = token.RefreshToken;
                user.RefreshTokenEndDate = token.Expiration.AddMinutes(3);

                return token;
            }
            return null;
        }
    }
}
