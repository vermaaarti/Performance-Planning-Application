namespace AADTask.Models
{
   
    public class EmployeeList
    {
        public int EmployeeId { get; set; }
        
        public string? EmployeeName { get; set; }

        public string? EmployeeEmail { get; set; }

        public string? ManagerName { get; set; }

        public string? Department { get; set; }

        public string? PerformanceRating { get; set; }

        public string? PlannerName { get; set; }

        public string? StatusOfPlanning { get; set; }

              

    }

  /*   public enum PerformanceRating
    {
        Poor,
        Satisfactory,
        Good,
        Excellent
    }*/

}