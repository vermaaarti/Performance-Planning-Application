
namespace AADTask.Models
{
    public class AllEmployee
    {

        public int EmployeeId { get; set; }

        public string? EmployeeName { get; set; }


        public string? EmployeeEmail { get; set; }

   
        public string? ManagerName { get; set; }

        public string? Department { get; set; }

        public string? PerformanceRating { get; set; }

        public string? PlannerName { get; set; }

        public string? planneremail { get; set; }


        public string? performanceChallenges { get; set; }
     

        public string? StatusOfPlanning { get; set; }




    }
    public enum Dept
    {
        CS,
        IT
    }
    public enum Mngr
    {
        Srishti,
        Ravi,
        Ruchir
    }
    public enum Plnr
    {
        Srishti,
        Ravi,
        Ruchir
    }
    public enum Perfr
    {
         Poor,
        Good,
        Satisfactory,
        Excellent
    }
    public enum Perch
    {
        Training_Required,
        Was_Is_in_PIP,
        No_certification,
        No_challenges
    }


}
