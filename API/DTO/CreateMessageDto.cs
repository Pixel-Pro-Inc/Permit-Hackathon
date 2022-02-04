using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTO
{
    public class CreateMessageDto
    {
        public int SenderphoneNumber { get; set; }
        public string SenderEmail { get; set; }
        public string RecipientUsername { get; set; }
        public string RecipientEmail { get; set; }
        public string Content { get; set; }
    }
}
