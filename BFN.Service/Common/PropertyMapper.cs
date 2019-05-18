using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace BFN.Service.Common
{
    public static class PropertyMapper
    {
        /// <summary>
        /// Extension for 'Object' that copies the properties to a destination object.
        /// </summary>
        /// <param name="source">The source.</param>
        /// <param name="destination">The destination.</param>
        /// 

        public static string ToString(this DateTime? dt, string format) => dt == null ? "" : ((DateTime)dt).ToString(format);
        public static void CopyProperties(this object source, object destination)
        {
            // If any this null throw an exception
            if (source == null || destination == null)
                throw new Exception("Source or/and Destination Objects are null");
            // Getting the Types of the objects
            Type typeDest = destination.GetType();
            Type typeSrc = source.GetType();
            // Collect all the valid properties to map
            var results = from srcProp in typeSrc.GetProperties()
                          let targetProperty = typeDest.GetProperty(srcProp.Name)
                          where srcProp.CanRead
                          && targetProperty != null
                          && (targetProperty.GetSetMethod(true) != null && !targetProperty.GetSetMethod(true).IsPrivate)
                          && (targetProperty.GetSetMethod().Attributes & MethodAttributes.Static) == 0
                          && targetProperty.PropertyType.IsAssignableFrom(srcProp.PropertyType)
                          select new { sourceProperty = srcProp, targetProperty = targetProperty };
            //map the properties
            foreach (var props in results)
            {
                if(props.targetProperty.DeclaringType.Name == "CompanyModel")
                {
                    //companyModel is view model. we need id filed to view its data.
                    props.targetProperty.SetValue(destination, props.sourceProperty.GetValue(source, null), null);
                }
                else
                {
                    if (props.targetProperty.Name != "Id")
                    {
                        props.targetProperty.SetValue(destination, props.sourceProperty.GetValue(source, null), null);

                    }
                }

            }
        }



        public static void compareValues(this object source, object destination)
        {
            // If any this null throw an exception
            if (source == null || destination == null)
                throw new Exception("Source or/and Destination Objects are null");
            // Getting the Types of the objects
            Type typeDest = destination.GetType();
            Type typeSrc = source.GetType();
            // Collect all the valid properties to map
            var results = from srcProp in typeSrc.GetProperties()
                          let targetProperty = typeDest.GetProperty(srcProp.Name)
                          where srcProp.CanRead
                          && targetProperty != null
                          && (targetProperty.GetSetMethod(true) != null && !targetProperty.GetSetMethod(true).IsPrivate)
                          && (targetProperty.GetSetMethod().Attributes & MethodAttributes.Static) == 0
                          && targetProperty.PropertyType.IsAssignableFrom(srcProp.PropertyType)
                          select new { sourceProperty = srcProp, targetProperty = targetProperty };
            //map the properties
            foreach (var props in results)
            {
                if (props.targetProperty.DeclaringType.Name == "CompanyModel")
                {
                    //companyModel is view model. we need id filed to view its data.
                    props.targetProperty.SetValue(destination, props.sourceProperty.GetValue(source, null), null);
                }
                else
                {
                    if (props.sourceProperty.GetValue(source, null) != props.sourceProperty.GetValue(destination, null) && props.targetProperty.Name != "Id")
                    {
                        props.targetProperty.SetValue(destination, props.sourceProperty.GetValue(source, null), null);

                    }
                }

            }
        }


    }
}
