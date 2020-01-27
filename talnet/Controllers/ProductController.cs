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
    public class ProductController : Controller
    {
        private readonly telnetContext _context;

        public ProductController(telnetContext context)
        {
            _context = context;
        }

        // GET: Customer
        [HttpGet]
        public JsonResult GetProduct()
        {
            try
            {
                ///var customerList = _context.Customers.Select(x => new {x.Id, x.Name, x.Address}).ToList();
                var productList = _context.Product.ToList();
                return Json(new { Data = productList });

            }
            catch (Exception e)
            {
                Console.Write("Exception Occured /n {0}", e.Data);
                return Json(new { Data = "Data Not Found" });

            }
        }


        // create Product
        [HttpPost]
        public JsonResult CreateProduct(Product product)
        {
            try
            {
                Console.WriteLine("adding");
                _context.Product.Add(new Product {
                    Name = product.Name,
                    Price = product.Price
                });
                _context.SaveChanges();

            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return Json(new { Data = "Create Product Failed", c = product });
            }
            return Json(new { Data = "Product created", c = product });
        }

        //Delete Customer
       
        [HttpDelete("{id}")]

        public JsonResult DeleteProduct(int id)
        {
            try
            {
                var product = _context.Product.Where(x => x.Id == id).SingleOrDefault();
                if (product != null)
                {
                    _context.Product.Remove(product);
                    _context.SaveChanges();
                }
            }
            catch (Exception e)
            {
                Console.Write("Exception Occured /n {0}", e.Data);
                return Json(new { Data = "Deletion Failed", c = id });

            }
            return Json(new { Data = "Success Product Deleted", c= id });
        }

      


        //GetUpdate Customer
        [HttpGet("{id}")]
        public JsonResult GetUpdateProduct(int id)
        {
            try
            {
                Product product = _context.Product.Where(x => x.Id == id).SingleOrDefault();
                return Json(new { Data = product });
            }
            catch (Exception e)
            {
                Console.Write("Exception Occured /n {0}", e.Data);
                return Json(new { Data = "Customer Not Found" });
            }
        }

        //Update Customer


        [HttpPost("{id}")]
        public JsonResult UpdateProduct(Product product)
        {
            try
            {
                Product dbproduct = _context.Product.Where(x => x.Id == product.Id).SingleOrDefault();
                dbproduct.Name = product.Name;
                dbproduct.Price = product.Price;
                _context.SaveChanges();
            }
            catch (Exception e)
            {
                Console.Write("Exception Occured /n {0}", e.Data);
                return Json(new { Data = "Update Failed", p = product });
            }
            return Json(new { Data = "Customer details updated", p = product });

        }

    }
}