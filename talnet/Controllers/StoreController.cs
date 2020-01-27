using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using talnet.Models;

namespace talnet.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class StoreController : Controller
    {
        private readonly telnetContext _context;

        public StoreController(telnetContext context)
        {
            _context = context;
        }

        // GET: Customer
        [HttpGet]
        public JsonResult GetStore()
        {
            try
            {
                ///var customerList = _context.Customers.Select(x => new {x.Id, x.Name, x.Address}).ToList();
                var StoreList = _context.Store.ToList();
                return Json(new { Data = StoreList });

            }
            catch (Exception e)
            {
                Console.Write("Exception Occured /n {0}", e.Data);
                return Json(new { Data = "Data Not Found" });

            }
        }

        // create Customer
        [HttpPost]
        public JsonResult CreateStore(Store store)
        {



            try
            {
                Console.WriteLine("adding");
                _context.Store.Add(new Store
                {
                    Name = store.Name,
                    Address = store.Address
                });
                _context.SaveChanges();

            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return Json(new { Data = "Create Customer Failed", c = store });
            }
            return Json(new { Data = "Customer created", c = store });
        }
        public IActionResult Privacy()
        {
            return View();
        }

        //Delete Customer
        [HttpDelete("{id}")]

        public JsonResult DeleteStore(int id)
        {
            try
            {
                var store = _context.Store.Where(x => x.Id == id).SingleOrDefault();
                if (store != null)
                {
                    _context.Store.Remove(store);
                    _context.SaveChanges();
                }
            }
            catch (Exception e)
            {
                Console.Write("Exception Occured /n {0}", e.Data);
                return Json(new { Data = "Deletion Failed" });

            }
            return Json(new { Data = "Success Store Deleted" });
        }



        //Update Customer


        [HttpPost("{id}")]
        public JsonResult UpdateStore(Store store)
        {
            try
            {
                Store dbstore = _context.Store.Where(x => x.Id == store.Id).SingleOrDefault();
                dbstore.Name = store.Name;
                dbstore.Address = store.Address;
                _context.SaveChanges();
            }
            catch (Exception e)
            {
                Console.Write("Exception Occured /n {0}", e.Data);
                return Json(new { Data = "Update Failed" });
            }
            return Json(new { Data = "Store details updated" });

        }


        //GetUpdate Customer
        [HttpGet("{id}")]
        public JsonResult GetStoreCustomer(int id)
        {
            try
            {
                Store store = _context.Store.Where(x => x.Id == id).SingleOrDefault();
                return Json(new { Data = store });
            }
            catch (Exception e)
            {
                Console.Write("Exception Occured /n {0}", e.Data);
                return Json(new { Data = "Store Not Found" });
            }
        }

       
    }
}