
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


        public string? approver { get; set; }


        public string? performanceChallenges { get; set; }
     

        public string? StatusOfPlanning { get; set; }


      public int ApprovalTaskId  { get; set; }
         public int ApproverId { get; set; }
      public string? ApproverName { get; set; }
        public int PlannerId { get; set; }
         public string? ApprovalStatus { get; set; }
        public string? CreatedOn { get; set; }


      



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

    public enum Approvr
    {
        Ruchir,
        Chandan,
        Rachana
    }

    

}
