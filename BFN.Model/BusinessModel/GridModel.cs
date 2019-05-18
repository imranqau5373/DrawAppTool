using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BFN.Model.BusinessModel
{
    public class GridModel
    {
        public GridModel()
        {
            FilterKeyValue = new List<KeyValuePair<string, string>>();

        }

        public List<KeyValuePair<string, string>> FilterKeyValue { get; set; }

        public int Page { get; set; }

        public int ItemsPerPage { get; set; }

        public string SortBy { get; set; }

        public bool Reverse { get; set; }

        public string FilterList { get; set; }


        public int CommiteId { get; set; }
    }

}
