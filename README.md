# Performance-Planning-Application

A .net MVC application to plan/track/approve the performance of employees.


How It Works :


In performance Planning Application, there are multiple roles. First role is "Admin", Admin can see all employees data, Second Role in "Planner", Planner can see only the employees for whom he is planner and the Third role is "Approver", Approver can see the employees for whom he is approver. 
The first step is login, based on login employee data gets printed in the screen and based on admin/planner/approver, you can see different button to perform various operations.


Authentication : Azure AD Authentication

Roles : Admin, Planner, Approver

Pages :

Employee Master(Admin Page)

  1. It is accessible only by the admin.
  2.  When logged in user is an admin, they would be able to see all the employees.
  3. It has a list of employees with columns : EmployeeName(hyperlink), Email, ManagerName, Department, PlannerName, Performance Challenge(Input type dropdown : "Training Required", "Was/Is in PIP" , "No certification", "No challenges"), Performance Rating(Input type dropdown : Poor, Satisfactory,Good, Excellent), 
  "Status", StatusOfPlanning etc.
  4. There is a button at the top "Add new employee" with which a new page will open to add a new employee. Mandatory fields are : EmployeeName, Manager(Dropdown), Department(Dropdown),    Planner(Dropdown), Approver(Dropdown)
  5. EmployeeName hyperlink will open the same page with values binded. Fields will be editable only upto when that particular employee performance status is "Draft".
  6. Both admins and planners can see "Save As Draft" button, which will enable them to save changes(Performance Rating) of employees.



Performance Planner(Planner Page)

1. It displays a table of employees with columns : EmployeeName(hyperlink), Email, ManagerName, Department, PlannerName, Performance Challenge(Input type dropdown : "Training Required", "Was/Is in PIP" , "No certification", "No challenges"), Performance Rating(Input type dropdown : Poor, Satisfactory,Good, Excellent), 
  "Status", StatusOfPlanning etc.
2. When logged in user is a planner, they would be able to see only list of employees for whom they are planners.
3. By default, "Status" of planning is draft.
4. Planners will be able to see "Submit" button with which it will save the changes and "Status" of planning should get "InProgress".
5. Validation :  Clicking of submit button will first check if all the employee's performance rating and performance challenges are selected.
6. Both admins and planners can see "Save As Draft" button, which will enable them to save changes(Performance Rating) of employees.


Performance Approver(Approver Page)

  1. It displays a table of employees with columns : EmployeeName, PlannerName, ApproverName, ApprovalStatus, CreatedOn
  2. When logged in user is an approver, they would be able to see only list of employees for whom they are approver.
  3. By default, approver will be able to see 'Go to Approve Page' button, which will redirect them to the page where approver will see the employees for whom he/she is approver(if there exist any employee).
  4. Approver will be able to see the 'Approve' button which will change the approveStatus from 'Assigned'(default) to 'Approved'.
  5. When the status gets 'Approved' the approver should not be able to see the record of employee's. 
