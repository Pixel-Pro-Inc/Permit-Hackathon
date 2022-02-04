using API.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTO
{
    public class MessageDto
    {
        public int Id { get; set; }

        public int SenderId { get; set; }
        public string SenderUsername { get; set; }

        public int RecipientId { get; set; }
        public string RecipientUsername { get; set; }

        public string content { get; set; }
        public DateTime? DateRead { get; set; }
        public DateTime MessageSent { get; set; }

    }
}
