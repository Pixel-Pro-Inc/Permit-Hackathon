using API.DTO;
using API.Entities;
using API.Extentions;
using API.Helpers;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Controllers
{
    public class MessageController : BaseApiController, IMessageRepository
    {
        private readonly IMapper _mapper;

        public MessageController( IMapper mapper)
        {
            _mapper = mapper;
        }

        // The below methods requires datacontext
        public void AddMessage(Message message)=> throw new NotImplementedException();
        public void DeleteMessage(Message message) => throw new NotImplementedException();

        public Task<PagedList<MessageDto>> GetMessagesForUser()
        {
            throw new NotImplementedException();
        }

        #region Create Message

        [HttpPost("messages/createmessage")]
        public async Task<ActionResult<MessageDto>> CreateMessage(CreateMessageDto createMessageDto)
        {
            User sender = await GetUser(createMessageDto.SenderphoneNumber.ToString());
            if (createMessageDto.SenderEmail == createMessageDto.RecipientUsername.ToLower()) return BadRequest("You cannot send messages to yourself");

            var recipient = await GetUser(createMessageDto.RecipientEmail);
            if (recipient == null) return NotFound();

            var message = new Message
            {
                Sender = sender,
                Recipient = recipient,
                SenderUsername = sender.GetUserName(),
                RecipientUsername = recipient.GetUserName(),
                content = createMessageDto.Content,
                Id = await SetId("Message")
            };
            //There is no point putting a messageDto in a database so this makes sense and shouldn't be changed.
            _firebaseDataContext.StoreData("Messages/" + sender.Id + message.Id, message); //Consider replacing message with _mapper.Map<MessageDto>(message)
            

            return Ok(_mapper.Map<MessageDto>(message));// It's neccessary to Map this cause We need the map in get messages

        }

        #endregion
        #region Get Message

        [HttpGet("messages/getmessages")]
        public async Task<ActionResult<IEnumerable<MessageDto>>> GetMessagesForUser([FromQuery] MessageParams messageParams)
        {
            var messages = await GetMessages(messageParams); //firebase call
            if(messages==null)
            {
                return BadRequest("There are no messages");
            }
            //The below code is removed cause it throws an error: The provider for the source IQueryable doesn't implement IAsyncQueryProvider
            //Response.AddPaginationHeader(messages.CurrentPage, messages.Pagesize, messages.TotalCount, messages.TotalPages);
            return messages;
        }

        async Task<List<MessageDto>> GetMessages(MessageParams messageParams)
        {
            ///Use this as a template for the firebase equivalent in MessageController
            var query = await _firebaseDataContext.GetData<Message>("Messages");
            IQueryable<Message> checlist = query.AsQueryable<Message>().OrderByDescending(m=>m.MessageSent); //needs to be IQueryable 

            checlist = messageParams.Container switch
            {
                "Inbox" => checlist.Where(u => u.Recipient.GetUserName() == messageParams.Username),
                "Outbox" => checlist.Where(u => u.Sender.GetUserName() == messageParams.Username),
                _ => checlist.Where(u => u.Recipient.GetUserName() == messageParams.Username && u.DateRead == null)
            };
            if (checlist.Count()==0)
            {
                BadRequest("There are no messages from this person");
                return null;
            }
            var messages = checlist.ProjectTo<MessageDto>(_mapper.ConfigurationProvider); //this is necessary cause PagedList doesn't work with Messages but its Dto

            return messages.ToList();
            //The below code is removed cause it throws an error: The provider for the source IQueryable doesn't implement IAsyncQueryProvider
            //await PagedList<MessageDto>.CreateAsync(messages, messageParams.PageNumber, messageParams.pageSize);
        }

        #endregion

        #region Get Message Thread

        [HttpGet("messages/thread/{otherGetUserName()}")]
        public async Task<ActionResult<IEnumerable<MessageDto>>> GetMessageThread(string UserEmail, string otherusername)
        {
            User sender = await GetUser(UserEmail); //We using this method cause this is all Yewo left to our disposal and I'm not going to write more code
            var currentusername = sender.GetUserName();

            return Ok(await GetThread(currentusername, otherusername));

        }

        async Task<IEnumerable<MessageDto>> GetThread(string currentusername, string recipientusername)
        {
            var answer = await _firebaseDataContext.GetData<Message>("Messages");

            //This gets all the messages that involve the user and had sent between them and some other person. Basically their conversations
            var messages = answer.Where(m => m.Recipient.GetUserName() == currentusername
                && m.Sender.GetUserName() == m.Recipient.GetUserName()
                || m.Recipient.GetUserName() == recipientusername
                && m.Sender.GetUserName() == currentusername)
                .OrderBy(m => m.MessageSent)
                .ToList();

            //Checks for unread messages
            var unreadMessages = messages.Where(m => m.DateRead == null && m.Recipient.GetUserName() == currentusername).ToList();
            if (unreadMessages.Any())
            {
                foreach (var message in unreadMessages)
                {
                    message.DateRead = DateTime.Now;
                    _firebaseDataContext.EditData("Messages/" + message.SenderId + message.Id, message);
                    /*I want it to overide just the message DateRead so We might need to introduce a new node here  */
                }
            }
            return _mapper.Map<IEnumerable<MessageDto>>(messages);

        }


        #endregion

    }
}
