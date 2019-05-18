using BFN.Model.BusinessModel.Company;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace BFN.Service.Common
{
    public class CVRApiService
    {
        public static CvrApiResult GetCompanyInfo(long CVRNumber)
        {
            CvrApiResult res = new CvrApiResult();
            using (var webClient = new WebClient())
            {
                webClient.Headers["User-Agent"] = "BFN";
               
             
                try
                {
                    var resultContent = webClient.DownloadString(string.Format("http://cvrapi.dk/api?search={0}&country=dk", CVRNumber));
                    res = JsonConvert.DeserializeObject<CvrApiResult>(resultContent);
                    res.Success = true;
                    
                }
                catch (Exception ex)
                {
                    res.Message = ex.Message;
                    res.Success = false;
                    return res;
                }                
                                
                //if(res == null)
                //{
                //    res.Success = false;
                //    res.Message = "Server not Responding";
                //}
                //else
                //{
                    
                //}
            }

            return res;
        }
    }
}
