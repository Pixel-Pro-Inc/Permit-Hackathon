using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Helpers
{
    public class MessageParams:PaginationParams
    {
        public string SenderEmail { get; set; } // Who they want to see from. Can't be the same person as the user
        public string Username { get; set; } // This her is the person using the app. The client 
        public string Container { get; set; } = "Unread";
    }
}
