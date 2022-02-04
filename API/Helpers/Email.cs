using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Helpers
{
    public class Email
    {
        public string subject { get; set; }
        public string body { get; set; }
        public List<string> recipients { get; set; }
        public string author { get; set; }
        public DateTime sentDate { get; set; }
    }
}
