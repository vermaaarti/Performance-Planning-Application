using AADTask.Models;
using Azure.Core;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using Microsoft.Data.SqlClient;
using Newtonsoft.Json;
using System.Data;
using System.Diagnostics;
using System.Security.Claims;

namespace AADTask.Controllers
{
    [Authorize]
    public class HomeController : Controller
    {
        private readonly string connectionString;
        public HomeController(IConfiguration config)
        {
            connectionString = config.GetConnectionString("DefaultConnection");
        }


        public IActionResult Index()
        {
            var claimsIdentity = User.Identities.FirstOrDefault();
            if (claimsIdentity != null)
            {
                var emailClaim = claimsIdentity?.Claims;
                if (emailClaim != null)
                {
                    var data = emailClaim.FirstOrDefault((p) => p.Type == "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/upn").Value;


                    ViewData["name"] = data;

                    return View();
                }
            }



            return View();
        }



        // fn to get the employees based on admin or planner
        public DataTable EmployeeData()

        {

            var claimsIdentity = User.Identities.FirstOrDefault();
            
                var emailClaim = claimsIdentity?.Claims;
               
                    var email = emailClaim.FirstOrDefault((p) => p.Type == "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/upn").Value;

            DataTable returnDataTable = new DataTable();

            using (SqlConnection connection = new SqlConnection(connectionString))

            {

                connection.Open();

                SqlCommand cmd = new SqlCommand();

                cmd.Connection = connection;

                cmd.CommandType = CommandType.StoredProcedure;

                cmd.CommandText = "procedureToGetEmployeeData_aartiD"; // Use the name of your stored procedure

                cmd.Parameters.Add(new SqlParameter("@Email", email));

                SqlDataAdapter dataAdp = new SqlDataAdapter(cmd);

                dataAdp.Fill(returnDataTable);

                connection.Close();

            }

            return returnDataTable;

         }



       public List<AllEmployee> ConvertTableIntoModel(DataTable returnDataTable)
        {
            List<AllEmployee> objectList = new List<AllEmployee>();

            foreach (DataRow dr in returnDataTable.Rows)
            {
                AllEmployee newObj = new AllEmployee();

                newObj.EmployeeId = Convert.ToInt32(dr["EmployeeId"]);
                newObj.EmployeeName = dr["EmployeeName"].ToString();
                newObj.EmployeeEmail = dr["EmployeeEmail"].ToString();
                newObj.ManagerName = dr["ManagerName"].ToString();
                newObj.PlannerName = dr["PlannerName"].ToString();
                newObj.Department = dr["Department"].ToString();
                newObj.PerformanceRating = dr["PerformanceRating"].ToString();
                newObj.performanceChallenges = dr["performanceChallenges"].ToString();
                newObj.StatusOfPlanning = dr["StatusOfPlanning"].ToString();

                

                objectList.Add(newObj);
            }
            return objectList;
        }

      
        // fn to convert data into json
        public IActionResult JSONEmployeeData()
        {
            var Data = ConvertTableIntoModel(EmployeeData());
            return Ok(Data);
        }



        [HttpGet]
        public IActionResult GetEmployeeData()
        {
             var filteredData = ConvertTableIntoModel(EmployeeData());
            return View("EmployeeDataList", filteredData);
        }




        // fn to save data on database when submit button is clicked by the planner
        public DataTable UpdateEmployeeStatus(List<AllEmployee> employeeList)

        {

            var returnDataTable = new DataTable();
            var JSONData = JsonConvert.SerializeObject(employeeList);
            using (SqlConnection connection = new SqlConnection(connectionString))

            {
                connection.Open();

                SqlCommand cmd = new SqlCommand();

                cmd.Connection = connection;

                cmd.CommandType = CommandType.StoredProcedure;

                cmd.CommandText = "ChangeStatusToCompleted_a"; // Use the name of your stored procedure

                cmd.Parameters.Add(new SqlParameter("@JsonEmployee", JSONData));

                SqlDataAdapter dataAdp = new SqlDataAdapter(cmd);

                dataAdp.Fill(returnDataTable);

                connection.Close();

            }
            return returnDataTable;


        }

        [HttpPost]
        public IActionResult UpdateStatusToCompleted(List<AllEmployee> employeeList)
        {
            // Call the procedure to change the status of planning
         
            var data = UpdateEmployeeStatus(employeeList);
            if (data != null)
            {
                return Ok();
            }
            return BadRequest();
        }

        // fn ends here





        // fn to send the updated array to the database after changing the performance rating 
        public DataTable UpdatedRawData(List<AllEmployee> employeeList)

        {

            var returnDataTable = new DataTable();
            var JSONData = JsonConvert.SerializeObject(employeeList);
            using (SqlConnection connection = new SqlConnection(connectionString))

            {
                connection.Open();

                SqlCommand cmd = new SqlCommand();

                cmd.Connection = connection;

                cmd.CommandType = CommandType.StoredProcedure;

                cmd.CommandText = "SaveEmployeeDatasAsDraft_artiA"; // Use the name of your stored procedure

                cmd.Parameters.Add(new SqlParameter("@JsonEmployee", JSONData));

                SqlDataAdapter dataAdp = new SqlDataAdapter(cmd);

                dataAdp.Fill(returnDataTable);

                connection.Close();

            }
            return returnDataTable;


        }


        [HttpPost]
        public IActionResult UpdatedData(List<AllEmployee> employeeList)
        {
            var data = UpdatedRawData(employeeList);
            if (data != null)
            {
                return Ok();
            }
            return BadRequest();
        }


        // fn ends here



        //   method to update employees existing record by clicking on their name and adding new employee 
        public IActionResult AddEmployeeForm(EmployeeList employeeList)
        {

            return View(new AllEmployee());
        }
      

        public DataTable AddUpdateEmployee(AllEmployee employeeList)
        {
            var returnDataTable = new DataTable();
            var JsonData = JsonConvert.SerializeObject(employeeList);
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                connection.Open();
                SqlCommand cmd = new SqlCommand();
                cmd.Connection = connection;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "InsertOrUpdateEmployee";
                cmd.Parameters.Add(new SqlParameter("@EmpJson", JsonData));
                SqlDataAdapter dataAdp = new SqlDataAdapter(cmd);
                dataAdp.Fill(returnDataTable);
                connection.Close();
            }
            return returnDataTable;
        }

        [HttpPost]
        public IActionResult AddToTable(AllEmployee empList)
        {
            AddUpdateEmployee(empList);

           
            return Ok();
        }

        public IActionResult EmployeeDetailView(int id)
        {
            if (id != 0)
            {
                var data = ConvertTableIntoModel(EmployeeData());
                var filteredData = data.FirstOrDefault(row => row.EmployeeId == id);
                return View(filteredData);

            }
            var emptyData = new AllEmployee();
            return View(emptyData);

        }

        //fn ends here


        public IActionResult EmployeeList()
        {

            return View();
        }



       





       


        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}