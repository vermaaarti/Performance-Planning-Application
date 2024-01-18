# Performance-Planning-Application

A .net MVC application to plan/track/approve/Re-approve the performance of employees.


How It Works :


In the performance Planning Application, there are multiple roles. The first role is "Admin", Admin can see all employee's data, Second Role is "Planner", Planner can see only the employees for whom he is a planner and the Third role is "Approver", Approver can see the employees for whom he is an approver. There are two approvers in the application. And based on their level of approval, they can approve or send back (reject) the employees. If the employees are sent back, we will have to again plan the employees, else if the approver approves, the employee planning and approval process gets completed.

In this application, the first step is login, based on login employee data gets printed on the screen, and based on admin/planner/approver, you can see different buttons to perform various operations.


Authentication: Azure AD Authentication

Roles: Admin, Planner, Approver

Pages :

Employee Master(Admin Page)

  1. It is accessible only by the admin.
  2.  When logged in user is an admin, they would be able to see all the employees.
  3. It has a list of employees with columns: EmployeeName(hyperlink), Email, ManagerName, Department, PlannerName, Performance Challenge(Input type dropdown: "Training Required", "Was/Is in PIP", "No certification", "No challenges"), Performance Rating(Input type dropdown: Poor, Satisfactory, Good, Excellent), 
  "Status", StatusOfPlanning etc.
  4. There is a button at the top "Add new employee" with which a new page will open to add a new employee. Mandatory fields are : EmployeeName, Manager(Dropdown), Department(Dropdown),    Planner(Dropdown), Approver(Dropdown)
  5. EmployeeName hyperlink will open the same page with values bound. Fields will be editable only up to when that particular employee performance status is "draft".
  6. Both admins and planners can see the "Save As Draft" button, which will enable them to save employee changes(Performance Rating).



Performance Planner(Planner Page)

1. It displays a table of employees with columns: EmployeeName(hyperlink), Email, ManagerName, Department, PlannerName, Performance Challenge(Input type dropdown: "Training Required", "Was/Is in PIP", "No certification", "No challenges"), Performance Rating(Input type dropdown: Poor, Satisfactory, Good, Excellent), 
  "Status", StatusOfPlanning etc.
2. When logged-in users a planners, they would be able to see only a list of employees for whom they are planners.
3. By default, the "Status" of planning is draft.
4. Planners will be able to see the "Submit" button with which it will save the changes and the "Status" of planning should get "InProgress".
5. Validation:  Clicking the submit button will first check if all the employee's performance ratings and performance challenges are selected.
6. Both admins and planners can see the "Save As Draft" button, which will enable them to save employee changes(Performance Rating).


Performance Approver(Approver Page)

  1. It displays a table of employees with columns: EmployeeName, PlannerName, ApproverName, ApprovalStatus, CreatedOn
  2. When the logged user is an approver, they would be able to see only a list of employees for whom they are approver.
  3. By default, the approver will be able to see the 'Go to Approve Page' button, which will redirect them to the page where the approver will see the employees for whom he/she is an approver(if there exist any 
     employee).
  4. The Approver will be able to see the 'Approve' button which will change the approveStatus from 'Assigned'(default) to 'Approved'.
  5. When the status gets 'Approved' the approver should not be able to see the record of employees.
  6. The Approver will be able to see the 'Send Back' button which will change the approveStatus from 'Assigned'(default) to 'Unassigned' and the status of planning to 'draft' from 'InProgress' from the EmployeeMaster Table.



 In this application, there are two different approvers:-
 
 Based on these approvers four possibilities are there
 Suppose we have two approvers, approver A, and approver B
 
 1. There can be only A approver for the employees.
 2. There can be only B approver for the employees.
 3. There can be both A and B approvers for the employees.
 4. There can be only A approver or only B approver as both approvers for the employees.




 Challenges I have faced while creating this application:-

 1. To show employee records when both the approvers are the same.
 2. To show employee records when the first approver has approved and it is assigned to the second approver.



 Unique features present in this application:-
 1. Dynamic planner-name binding on the approver page.
 2. Dynamic employee record binding based on planner name.
 3. Default planner-based data binding for employee's records.
 4. employee records will be assigned to a second approver only when the first approver has approved it.
 5. When both approvers are the same the record will be assigned to the same approver and the approval process will take two steps.
 6. If the first/second approver has rejected the employee planning then the planner will have to plan the employees again.


 Here is the video explanation:-

 Complete Feature explanation-  https://drive.google.com/file/d/1GvW9GdNhqqfDYTAqbp_rovkek9m6luGO/view?usp=sharing

 Properties Explanation-  https://drive.google.com/file/d/1JayXPWz8RZV9wAPf19CIo5uxYhONRhrY/view?usp=drivesdk

 Unique Feature Explanation- 
                part1-     https://drive.google.com/file/d/1Jhi_UDclHL0RAfmLHKHfNp8ITSQdtqyu/view?usp=drivesdk
                part2-     https://drive.google.com/file/d/1Jk1mlq-_zuPBOgRvbmYEPT6KBLB5Pw2u/view?usp=drivesdk
