using API.Interfaces;
using Firebase.Storage;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace API.Services
{
    public class FileService : IFileService
    {
        //Firebase Storage
        private readonly string Bucket;
        protected static readonly IConfiguration Configuration = new ConfigurationBuilder().AddJsonFile("appsettings.json", optional: false, reloadOnChange: true).Build();

        public FileService()
        {
            Bucket = Configuration["FirebaseStorageSettings:Bucket"];
        }
        public async Task<string> Submit(string path, string name)
        {
            string b = Bucket;
            int n = path.IndexOf("base64,");

            path = path.Remove(0, n + 7);
            var bytes = Convert.FromBase64String(path);

            var stream = new MemoryStream(bytes);

            try
            {
                var downloadUrl = await new FirebaseStorage(Bucket, new FirebaseStorageOptions()).Child("Societies Files").Child(name).PutAsync(stream);
                return downloadUrl;
            }
            catch(Exception ex)
            {
                Exception e = ex;
                return null;
            }

            return null;
        }
    }
}
