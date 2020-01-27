using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using talnet.Models;

namespace talnet.Controllers
{
   [ApiController]
     [Route("api/[controller]")]
    public class CustomerController : Controller
    {
       private readonly telnetContext _context;

        public CustomerController(telnetContext context)
        {
            _context = context;
        }

        public IActionResult Index()
        {
            return View();
        }

        // GET: Customer
        [HttpGet]
        public JsonResult GetCustomer()
        {
            try
            {
                ///var customerList = _context.Customers.Select(x => new {x.Id, x.Name, x.Address}).ToList();
               var customerList = _context.Customer.ToList();
                return  Json (new { Data = customerList});

            }
            catch (Exception e)
            {
                Console.Write("Exception Occured /n {0}", e.Data);
                return Json (new { Data = "Data Not Found"});

            }
        }

        // create Customer
        [HttpPost]
       public JsonResult CreateCustomer(Customer customer)
        {

            

            try
            {
                Console.WriteLine("adding");
                _context.Customer.Add(new Customer { 
                    Name = customer.Name,
                    Address = customer.Address
                });
                _context.SaveChanges();

            }
           catch (Exception e)
            {
               Console.WriteLine(e);
                return Json ( new {Data = "Create Customer Failed", c=customer});
           }
            return Json(new { Data = "Customer created", c = customer});
        }
        public IActionResult Privacy()
        {
            return View();
        }
       
        //Delete Customer
        [HttpDelete("{id}")]
        
        public JsonResult DeleteCustomer(int id)
        {
            try
            {
                var customer = _context.Customer.Where(x => x.Id == id).SingleOrDefault();
                if (customer != null)
                {
                    _context.Customer.Remove(customer);
                    _context.SaveChanges();
                }
            }
            catch (Exception e)
            {
                Console.Write("Exception Occured /n {0}", e.Data);
                return Json(new { Data = "Deletion Failed" });

            }
            return  Json(new { Data = "Success Customer Deleted" });
        }



        //Update Customer


        [HttpPost("{id}")]
        public JsonResult UpdateCustomer(Customer customer)
        {
            try
            {
                Customer dbCustomer = _context.Customer.Where(x => x.Id == customer.Id).SingleOrDefault();
                dbCustomer.Name = customer.Name;
                dbCustomer.Address = customer.Address;
                _context.SaveChanges();
            }
            catch (Exception e)
            {
                Console.Write("Exception Occured /n {0}", e.Data);
                return  Json (new { Data = "Update Failed"});
            }
            return  Json(new { Data = "Customer details updated" });

        }


        //GetUpdate Customer
        [HttpGet("{id}")]
        public JsonResult GetUpdateCustomer(int id)
        {
            try
            {
                Customer customer = _context.Customer.Where(x => x.Id == id).SingleOrDefault();
                return  Json (new { Data = customer });
            }
            catch (Exception e)
            {
                Console.Write("Exception Occured /n {0}", e.Data);
                return  Json(new { Data = "Customer Not Found" });
            }
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
