# Performance-Planning-Application

An application to plan/track the performance of employees.


<h2>Performance Planning Application</h2>

Authentication : Azure AD Authentication

Roles : Planner, Admin

Pages :

    Performance Planner

    1. It displays a table of employees with columns : EmployeeName, ManagerName, Department, Performance Rating(Input type dropdown : Poor, Satisfactory,Good, Excellent), "Status"
    2. When logged in user is a planner, they would be able to see only list of employees for whom they are planners.
    3. When logged in user is an admin, they would be able to see all the employees.
    4. By default, "Status" of planning is draft.
    5. Both admins and planners can see "Save As Draft" button, which will enable them to save changes(Performance Rating) of employees.
    6. Planners will be able to see "Submit" button with which it will save the changes and "Status" of planning should get"Completed".
    7. Validation :  Clicking of submit button will first check if all the employees' performance rating is selected.



   Employee Master

  1. It is accessible only by the admin.
  2. It has a list of employees with columns : EmployeeName(hyperlink), Email, ManagerName, Department, PlannerName.
  3. There is a button at the top "Add new employee" with which a new page will open to add a new employee. Mandatory fields are : EmployeeName, Manager(Dropdown), Department(Dropdown),    Planner(Dropdown)
  4. EmployeeName hyperlink will open the same page with values binded. Fields will be editable only upto when that particular employee performance status is "Draft".
