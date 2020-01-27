using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using talnet.Models;
using System.Text.Json;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json.Converters;

namespace talnet.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class SalesController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        private readonly telnetContext _context;
        private ILogger _logger;

        public SalesController(telnetContext context, ILogger<SalesController> logger)
        {
            _context = context;
            _logger = logger;
        }

        protected override void Dispose(bool disposing)
        {
            _context.Dispose();
        }


        // create Customer
        [HttpPost]
          public IActionResult CreateSales(Sales sale)
          {
            string isoJson = JsonConvert.SerializeObject(sale);
            // {"Details":"Application started.","LogDate":"2009-02-15T00:00:00Z"}

            JsonSerializerSettings microsoftDateFormatSettings = new JsonSerializerSettings
            {
                DateFormatHandling = DateFormatHandling.MicrosoftDateFormat
            };
            string microsoftJson = JsonConvert.SerializeObject(sale, microsoftDateFormatSettings);
            // {"Details":"Application started.","LogDate":"\/Date(1234656000000)\/"}

            string javascriptJson = JsonConvert.SerializeObject(sale, new JavaScriptDateTimeConverter());
            // {"Details":"Application started.","LogDate":new Date(1234656000000)}
            try
            {
                  Console.WriteLine("adding");
                 // _context.Sales.Add(sale);
                 _context.Sales.Add(new Sales
                  {

                      Productid = sale.Productid,
                      Customerid = sale.Customerid,
                     Storeid = sale.Storeid,
                      Datesolde = sale.Datesolde.Date
                  });
                  _context.SaveChanges();

              }
              catch (Exception e)
              {
                  Console.WriteLine(e);
                  return Json(new { Data = "Create Customer Failed", c = sale });
              }
              return Json(new { Data = "Customer created", c = sale });
          }

        

        // GET Sales
        [HttpGet]
        public JsonResult GetSales()
        {
            try
            {
                var saleList = _context.Sales.Select(s => new
                {
                    Id = s.Id,
                    DateSold = s.Datesolde,
                    CustomerName = s.Customer.Name,
                    ProductName = s.Product.Name,
                    StoreName = s.Store.Name

                }).ToList();
                return  Json (new { Data = saleList });
            }
            catch (Exception e)
            {
                Console.Write("Exception Occured /n {0}", e.Data);
                return  Json(new { Data = "Data Not Found", });
            }
        }
        
        [HttpGet]
        public JsonResult GetCustomers()
        {
            try
            {
                var Customerdata =_context.Customer.Select(p => new { Id = p.Id, CustomerName = p.Name }).ToList();

                return Json (new { Data = Customerdata, });
            }
            catch (Exception e)
            {
                Console.Write("Exception Occured /n {0}", e.Data);
                return Json(new { Data = "Data Not Found", });
            }
        }
        
        [HttpGet]
        public JsonResult GetProducts()
        {
            try
            {
                var ProductsData = _context.Product.Select(p => new { Id = p.Id, ProductName = p.Name }).ToList();

                return Json(new { Data = ProductsData });
            }
            catch (Exception e)
            {
                Console.Write("Exception Occured /n {0}", e.Data);
                return Json   (new { Data = "Data Not Found" });
            }
        }
        
        [HttpGet]
        public JsonResult GetStores()
        {
            try
            {
                var StoresData = _context.Store.Select(p => new { Id = p.Id, StoreName = p.Name }).ToList();

                return Json(new { Data = StoresData });
            }
            catch (Exception e)
            {
                Console.Write(e.Data + "Exception Occured");
                return  Json (new { Data = "Data Not Found"});
            }
        }

        // DELETE Sale
        [HttpDelete("{id}")]
        public JsonResult DeleteSale(int id)
        {
            try
            {
                var sale = _context.Sales.Where(s => s.Id == id).SingleOrDefault();
                if (sale != null)
                {
                    _context.Sales.Remove(sale);
                    _context.SaveChanges();
                }
            }
            catch (Exception e)
            {
                Console.Write("Exception Occured /n {0}", e.Data);
                return Json (new { Data = "Deletion Falied" });
            }
            return Json (new { Data = "Success"});
        }
       
        // UPDATE Sale
        [HttpGet("{id}")]
        public JsonResult GetUpdateSale(int id)
        {
            try
            {
                Sales sale = _context.Sales.Where(s => s.Id == id).SingleOrDefault();
                string value = JsonConvert.SerializeObject(sale, Formatting.Indented, new JsonSerializerSettings
                {
                    ReferenceLoopHandling = ReferenceLoopHandling.Ignore
                });
                return Json (new { Data = sale,});
            }
            catch (Exception e)
            {
                Console.Write("Exception Occured /n {0}", e.Data);
                return Json (new { Data = "Sale Not Found", });
            }
        }

        [HttpPost("{id}")]
        public JsonResult UpdateSale(Sales sale)
        {
            try
            {
                Sales sa = _context.Sales.Where(s => s.Id == sale.Id).SingleOrDefault();
                sa.Customerid = sale.Customerid;
                sa.Productid = sale.Productid;
                sa.Storeid = sale.Storeid;
                sa.Datesolde = sale.Datesolde;

                _context.SaveChanges();
            }
            catch (Exception e)
            {
                Console.Write("Exception Occured /n {0}", e.Data);
                return Json (new { Data = "Sale Update Failed"});
            }
            return Json (new { Data = "Success"});
        }
    

}
}