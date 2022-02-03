using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTO
{
    public class CompanySearchDto
    {
        public string Name { get; set; }
        public bool IsRegistered { get; set; }
        public string Details { get; set; }
    }
}
