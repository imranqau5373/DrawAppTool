﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BFN.Model.BusinessModel
{
    public class ResponseResult
    {
        public bool Success { get; set; } = false;
        public string Message { get; set; } = "Some unknown error occurred";

    }
}
