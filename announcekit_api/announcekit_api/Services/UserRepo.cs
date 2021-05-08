using announcekit_api.Model;
using System;
using System.Collections.Generic;
using System.Linq;

namespace announcekit_api.Services
{

    public class UserRepo : IUserRepo
    {
        private List<User> _user;

        public UserRepo()
        {
            _user = new List<User>();
            _user.Add(new User() { Email = "test@test.com", Password = "123456", Id = 1, Name = "Tayfun", Surname = "Akgun" });
        }

        public void Add(User user)
        {
            _user.Add(user);
        }

        public User FirstOrDefault(Func<User, bool> _expression)
        {
            return _user.FirstOrDefault(_expression);
        }
    }
}
