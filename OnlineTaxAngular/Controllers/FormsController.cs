using System.Collections.Generic;
using System.Web.Http;
using OnlineTaxAngular.Models;

namespace OnlineTaxAngular.Controllers
{
    public class FormsController : ApiController 
    {
        public IEnumerable<Forms> Get()
        {
            return new List<Forms>
                       {
                           new Forms
                               {
                                   Name = "Tax credit claim form 2014 IR526",
                                   Path = "526",
                                   Country = "New Zealand",
                                   Description = 
                                            @"Complete this form to claim tax credits for donations for the tax year 1 April 
                                            2013 to 31 March 2014. If you are making a claim for the years 2011 and before, 
                                            or the 2012 year, please use either the Tax credit claim form 2000-2011 (IR526) 
                                            and/or the Tax credit claim form 2013 (IR526)."
                               },
                           new Forms
                               {
                                   Name = "BAS",
                                   Path = "BAS",
                                   Country = "Australia",
                                   Description = 
                                            @"The business activity statement (BAS) is a form submitted to the Australian Taxation
                                               Office by all businesses to report their taxation obligations.
                                                These include pay as you go withholding (PAYGW), pay as you go instalments (PAYGI)
                                                , fringe benefits tax (FBT), wine equalisation tax (WET) and luxury car tax (LCT).
                                                PAYGW is sometimes known as 'Income Tax Withholding (ITW),' PAYGI is sometimes 
                                                known as 'Income Tax Instalments (ITI)'"
                               },
                           new Forms
                               {
                                   Name = "Tax code declaration IR330",
                                   Path = "330",
                                   Country = "New Zealand",
                                   Description = 
                                            @"Form for employees to complete when starting their job or changing their tax code."
                               },
                           new Forms
                               {
                                   Name = "Individual tax return 2013 IR3",
                                   Path = "IR3",
                                   Country = "New Zealand",
                                   Description = 
                                            @"Use this form to complete your individual tax return. This is for the 2013 year."
                               },
                           new Forms
                               {
                                   Name = "Individual tax return 2012 IR3",
                                   Path = "IR3",
                                   Country = "New Zealand",
                                   Description = 
                                            @"Use this form to complete your individual tax return. This is for the 2012 year."
                               }
                       };
        }
    }
}