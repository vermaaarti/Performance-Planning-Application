using AADTask.Models;
using Microsoft.AspNetCore.Authentication;
using Microsoft.Data.SqlClient;
using System.Data;
using System.Security.Claims;



namespace AADTask.DBdata
{
    public class AddRolesToEmployee
    {
        public static DataTable GetRoles(string email, string _connectionString)
        {
            DataTable returnDataTable = new();
            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                connection.Open();
                SqlCommand cmd = new();
                cmd.Connection = connection;
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.CommandText = "EmployeeRolesInfos";
                cmd.Parameters.Add(new SqlParameter("@Email", email));

                SqlDataAdapter dataAdp = new SqlDataAdapter(cmd);
                dataAdp.Fill(returnDataTable);
                connection.Close();
            }
            return returnDataTable;
        }

        public static List<EmployeeRoleInfo> ConvertRoleDataTableToList(DataTable dataTable)
        {

            List<EmployeeRoleInfo> RoleList = dataTable.AsEnumerable().Select(firstData =>
                new EmployeeRoleInfo()
                {
                    EmployeeEmail = firstData.Field<string>("employeemail"),

                    RoleName = firstData.Field<string>("RoleName"),

                    EmployeeName = firstData.Field<string>("employeename"),

                }).ToList();

            return RoleList;
        }





    }
}











