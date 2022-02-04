using API.DTO;
using API.Entities;
using API.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Interfaces
{
    public interface IMessageRepository
    {
        void AddMessage(Message message);
        void DeleteMessage(Message message);
        Task<PagedList<MessageDto>> GetMessagesForUser();
        //Task<bool> SaveAllAsync();
    }
}
