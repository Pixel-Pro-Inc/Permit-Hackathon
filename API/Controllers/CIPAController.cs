using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using API.DTO;
using OpenQA.Selenium.Firefox;

namespace API.Controllers
{
    public class CIPAController : BaseApiController
    {
        public string fullUrl = "https://www.cipa.co.bw//ng-cipa-master/ui/create/entitySearch";
        
        [HttpGet("check/{uin}")]
        public async Task<ActionResult<CompanySearchDto>> IncorporationCheck(string uin)
        {
            List<string> programmerLinks = new List<string>();

            var options = new ChromeOptions()
            {
                BinaryLocation = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"
            };

            options.AddArguments(new List<string>() { "headless", "disable-gpu" });
            var chromeDriver = new ChromeDriver(options);
            chromeDriver.Navigate().GoToUrl(fullUrl);


            //Search for search bar and search button and perform actions
            IWebElement searchBar= chromeDriver.FindElement(By.TagName("input"));

            searchBar.Clear();
            searchBar.SendKeys(uin);

            int count = 0;
            var elements = chromeDriver.FindElements(By.TagName("a"));
            foreach (var item in elements)
            {
                if (item.Text == "Search")
                {
                    count++;

                    if (count == 2)
                        item.Click();
                }
            }

            await Task.Delay(10000);

            var links = chromeDriver.FindElements(By.TagName("a"));

            //Await response and capture info

            string companyName = "";
            count = 0;

            foreach (var item in links)
            {
                count++;

                if (count == 37)
                    companyName = item.Text;
            }

            var elements1 = chromeDriver.FindElements(By.ClassName("value"));

            return new CompanySearchDto() {
                Name = companyName,
                IsRegistered = elements1[0].Text == "(Registered)"? true : false,
                Details = elements1[1].Text
            };
        }
    }
}
