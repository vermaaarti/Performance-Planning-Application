using Microsoft.AspNetCore.Authentication;
using System.Security.Claims;
using AADTask.DBdata;


namespace AADTask.CliamsFile.ClaimsFile
{
    public class AddRolesClaimsTransformation : IClaimsTransformation
    {
        private readonly string _connectionString;

        public AddRolesClaimsTransformation(IConfiguration config)
        {

            _connectionString = config.GetConnectionString("DefaultConnection");


        }
        public Task<ClaimsPrincipal> TransformAsync(ClaimsPrincipal principal)
        {
            var identity = (ClaimsIdentity?)principal.Identity;
            var Email = identity.Name;

            var roles = AddRolesToEmployee.ConvertRoleDataTableToList(AddRolesToEmployee.GetRoles(Email, _connectionString));

            foreach (var item in roles)
            {
                identity?.AddClaim(new Claim(ClaimTypes.Role, item.RoleName));

            }


            return Task.FromResult(principal);
        }
    }
}