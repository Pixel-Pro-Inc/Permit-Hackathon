using API.Data;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BaseApiController : Controller
    {
        protected readonly FirebaseDataContext _firebaseDataContext;
        protected readonly IFileService _fileService;
        protected static readonly IConfiguration Configuration = new ConfigurationBuilder().AddJsonFile("appsettings.json", optional: false, reloadOnChange: true).Build();

        public BaseApiController()
        {
            _firebaseDataContext = new FirebaseDataContext();
        }


        [HttpGet]
        public IActionResult Index()
        {
            return View();
        }

        //Removed this from AccountController so it can be shared with all controllers but noone else, hence the protected modifier
        //Also Why did you decided to use only email and PhoneNumbers here
        protected async Task<User> GetUser(string accountID)
        {
            if (string.IsNullOrEmpty(accountID))
                return null;

            List<User> users = await _firebaseDataContext.GetData<User>("Account");

            int count = users.Where(u => u.Email == accountID || u.PhoneNumber.ToString() == accountID).ToList().Count;

            if (count != 0)
            {
                return users.Where(u => u.Email == accountID || u.PhoneNumber.ToString() == accountID).ToList()[0];
            }

            return null;
        }
        //I changed this method to include a parameter so that it can work for any type that needs an Id
        protected async Task<int> SetId(string entityType)
        {
            //I changed this to set Id cause it does not in effect the id from the database
            List<User> users = await _firebaseDataContext.GetData<User>(entityType);

            int lastId = -1;

            if (users.Count != 0)
                lastId = users.Where(u => u.Id == (users.Count - 1)).ToList()[0].Id;

            return (lastId + 1);
        }
    }
}
