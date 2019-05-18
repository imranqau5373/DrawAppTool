using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Diagnostics;
using System.Linq;
using System.ServiceProcess;
using System.Text;
using System.Threading.Tasks;
using System.Diagnostics;
using System.Timers;
using System.Net.Http;
//using System.Timers;

namespace BFN_Handover.Service
{   
    public partial class Service1 : ServiceBase
    {
        private ElapsedEventHandler OnTimer;
        private int eventId = 1;
        public Service1()
        {
            InitializeComponent();
            eventLog1 = new EventLog();
            if (!EventLog.SourceExists("BFNHandoverService"))
            {
                EventLog.CreateEventSource(
                    "BFNHandoverService", "NewLog");
            }
            eventLog1.Source = "BFNHandoverService";
            eventLog1.Log = "NewLog";
        }

        protected override void OnStart(string[] args)
        {
            timer1.Start();
            eventLog1.WriteEntry("BFNHandover OnStart");
            /*eventLog1.WriteEntry("BFNHandover OnStart");
            timer1.Interval = 60000; // 60 seconds  
            timer1.Elapsed += new System.Timers.ElapsedEventHandler(this.OnTimer);
            timer1.Start();
            eventLog1.WriteEntry("Monitoring the BFNHandover System", EventLogEntryType.Information, eventId++);*/


        }
        private void timer1_Elapsed(object sender, System.Timers.ElapsedEventArgs e)
        {
            try
            {
                timer1.Stop();
                //DoWork(); // http://localhost:58676/
                HttpClient client = new HttpClient();
                client.BaseAddress = new Uri("http://dev.bfn.dk/");
                HttpResponseMessage singleHttpResponse = client.GetAsync("api/Handover/HandedoverCompaniesShopService").Result;
                System.Diagnostics.EventLog.WriteEntry("BFNHandover Window Service", "Job complete successfully on " + DateTime.Now.ToString() + " Response is:" + singleHttpResponse);
            }
            catch (Exception ex)
            {
                System.Diagnostics.EventLog.WriteEntry("BFNHandover Window Service", ex.ToString());
            }
            finally
            {
                timer1.Start();
            }
        }
        protected override void OnContinue()
        {
            eventLog1.WriteEntry("BFNHandover Continue.");
        }
        protected override void OnStop()
        {
            eventLog1.WriteEntry("BFNHandover Stop.");
        }
    }
}
