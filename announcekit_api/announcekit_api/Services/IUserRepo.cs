using announcekit_api.Model;
using System;
using System.Linq.Expressions;

namespace announcekit_api.Services
{
    public interface IUserRepo
    {
        public void Add(User user);

        public User FirstOrDefault(Func<User,bool> _expression);
    }
}
