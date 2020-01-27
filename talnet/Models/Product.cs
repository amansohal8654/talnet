using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace talnet.Models
{
    public partial class Product
    {
        public Product()
        {
            Sales = new HashSet<Sales>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string Price { get; set; }

        public virtual ICollection<Sales> Sales { get; set; }
    }
}
