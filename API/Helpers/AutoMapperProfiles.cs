using API.DTO;
using API.Entities;
using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Helpers
{
    public class AutoMapperProfiles: Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<LoginDto, User>();
            CreateMap<Message, MessageDto>();
            //The top one wasn't Message but instead User according to section 8 2:33
            CreateMap<User, MessageDto>();
        }

    }
}
