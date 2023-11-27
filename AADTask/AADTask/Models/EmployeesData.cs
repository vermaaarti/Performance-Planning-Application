namespace AADTask.Models
{
   
    public class EmployeesData
    {
        public int EmployeeId { get; set; }

        public string? EmployeeEmail { get; set; }

        public string? EmployeeName { get; set; }

        public int ManagerId { get; set; }

        public int PlannerId { get; set; }

        public int IsAdmin { get; set; }

        public int PerformanceRatingId { get; set; }

        public string? StatusOfPlanning { get; set; }

        public int IsEligibleForPlanning { get; set; }


    }
}
