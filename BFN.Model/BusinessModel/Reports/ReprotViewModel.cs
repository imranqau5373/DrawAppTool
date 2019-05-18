using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BFN.Model.BusinessModel.Reports
{
    public class ReprotViewModel
    {
        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }

        public List<string> SelectedEvents { get; set; }

       // public string[] SelectedEvent = new string[] { "Creation", "Change", "Holiday", "Ownership", "Reopening", "Removal" };




        public string selectedOption { get; set; }

        public string isCreateEvent { get; set; }

        public string isUpdateEvent { get; set; }

        public string isRemovalEvent { get; set; }

        public string isReopeningEvent { get; set; }

        public string isHolidayEvent { get; set; }

        public string isOwnerShipEvent { get; set; }



    }

}
