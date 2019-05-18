using System.Web;
using System.Web.Optimization;

namespace BFN.Web
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.validate*"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/fontFiles").Include(
                      "~/Content/fonts/fontawesome-webfont.woff2",
                      "~/Content/fonts/fontawesome-webfont.woff",
                      "~/Content/fonts/Simple-Line-Icons.woff2",
                      "~/Content/fonts/Simple-Line-Icons.woff"));


            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/bootstrap.js",
                      "~/Scripts/respond.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/bootstrap.css",
                      //"~/Content/css/vendors/easy-autocomplete.css",
                      "~/Content/css/vendors/angular-busy.css",
                      "~/Content/site.css"));


            bundles.Add(new ScriptBundle("~/bundles/BFNScript").Include(
                    "~/Scripts/Vendor/angular.js",
                    "~/Scripts/Vendor/angular-route.js",
                    "~/Scripts/Vendor/angular-ui-router.min.js",
                    "~/Scripts/Vendor/angular-busy.js",
                    "~/Scripts/Vendor/loading-bar.js",
                    "~/Scripts/Vendor/angular-cookies.js",
                    "~/Scripts/Vendor/toastr.js",
                    "~/Scripts/Vendor/jquery.easy-autocomplete.js",                    
                    "~/Scripts/Vendor/bootstrap.min.js",
                    "~/Scripts/Vendor/dirPagination.js",
                    "~/Scripts/Vendor/moment.js",
                    "~/Scripts/Vendor/angular-moment.js",
                    "~/Scripts/SPA/Module/Common.Core.js",
                    "~/Scripts/SPA/Module/Constants.js",
                    "~/Scripts/SPA/Module/underscore-min.js",
                    "~/Scripts/SPA/app.js",
                    "~/Scripts/SPA/Services/ApiService.js",
                    "~/Scripts/SPA/Services/notificationService.js",
                    "~/Scripts/SPA/Controller/rootCtrl.js",

                     //Customer Records
                     "~/Scripts/SPA/Controller/CustomerRecord/CustomerIndexCtrl.js",
                    "~/Scripts/SPA/Controller/CustomerRecord/CustomerAddCtrl.js",
                    "~/Scripts/SPA/Controller/CustomerRecord/CustomerViewCtrl.js",
                    "~/Scripts/SPA/Controller/CustomerRecord/CustomerEditCtrl.js",


                     //Commite Records
                     "~/Scripts/SPA/Controller/CommiteRecord/CommiteIndexCtrl.js",
                     "~/Scripts/SPA/Controller/CommiteRecord/CommiteViewCtrl.js",
                    "~/Scripts/SPA/Controller/CommiteRecord/CommiteAddCtrl.js",
                    "~/Scripts/SPA/Controller/CommiteRecord/Dialogs/payment-member.js",
                    "~/Scripts/SPA/Controller/CommiteRecord/Dialogs/payment-memberDirective.js",
                    "~/Scripts/SPA/Controller/CommiteRecord/Dialogs/payment-record.js",
                    "~/Scripts/SPA/Controller/CommiteRecord/Dialogs/payment-recordDirective.js",

                    // Payment Records

                    "~/Scripts/SPA/Controller/Payment Record/PaymentAddCtrl.js",
                    "~/Scripts/SPA/Controller/Payment Record/PaymentIndexCtrl.js",
                    "~/Scripts/SPA/Controller/Payment Record/PaymentViewCtrl.js",


                                        //Reports Records

                    "~/Scripts/SPA/Controller/Report/ReportIndexCtrl.js"





            ));
            //"~/Scripts/Vendor/jquery.min.js",

            bundles.Add(new ScriptBundle("~/Content/js").Include(
                      "~/Content/js/jquery-3.2.1.js",
                      "~/Content/js/popper.min.js",
                      "~/Content/js/bootstrap.min.js",
                      "~/Content/js/FooTable.js",
                      "~/Content/js/app.js"));
        }
    }
}
