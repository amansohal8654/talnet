using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace talnet.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Product()
        {
            return View();
        }

        public IActionResult Store()
        {
            return View();
        }
        public IActionResult Sales()
        {
            return View();
        }



    }
}