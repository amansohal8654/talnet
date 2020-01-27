using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;
namespace talnet.Models
{
    
    public partial class Sales
    {
        public int Id { get; set; }
        public int Productid { get; set; }
        public int Customerid { get; set; }
        public int Storeid { get; set; }
       
        public DateTime Datesolde { get; set; }

        public virtual Customer Customer { get; set; }
        public virtual Product Product { get; set; }
        public virtual Store Store { get; set; }
    }
}
