let obj = {};
let employeeId;
let employeeName;
let employeeEmail;
let managerName;
let department;
let plannerName;
let newJsonData;


$(document).ready(function () {

    checkStatusOfPlanning();

});


function SaveEmployeeDetails(event, employeeId) {
    event.preventDefault();

    $.ajax({
        type: 'GET',
        url: '/Home/JSONEmployeeData',
        dataType: 'json',
        success: function () {

             if (ValidateForm()) {
            
                AddEmployeeIntoDataTable();

                // adding new employee
                //   if (employeeId == 0) {
                //     AddEmployeeIntoDataTable();
                // } 
                // updating existing employee
                /*else {
                    for (var i = 0; i < globalArray.length; i++) {
                        if (globalArray[i].employeeId == employeeId) {
                            if (globalArray[i].statusOfPlanning == 'draft') {
                                AddEmployeeIntoDataTable();
                            }
                            else {
                             
                                alert("can't update data as planning is completed");
                                window.location.href = "/Home/GetEmployeeData";
                            }
                           
                        }
                    }
                }*/


            }
            else {
                alert("some fields are blank");
            }
        },
        error: function (errorThrown, textStatus, xhr) {
            console.log('Error in Operation', errorThrown);

        }
    });

}


function ValidateForm() {

    employeeId = $("#employeeId").value;
    employeeName = $("#employeeName").value;
    employeeEmail = $("#employeeEmail").value;
    managerName = $("#managerName").value;
    department = $("#department").value;
    plannerName = $("#plannerName").value;
    StatusOfPlanning = $("#StatusOfPlanning").value;


    obj = {
        employeeId: employeeId,
        employeeName: employeeName,
        employeeEmail: employeeEmail,
        managerName: managerName,
        department: department,
        plannerName: plannerName,
        StatusOfPlanning: StatusOfPlanning
    }


    if (employeeId && employeeName && employeeEmail && managerName && department && plannerName) {
        return true;
    }
    else {
        return false;
    }

}


function AddEmployeeIntoDataTable() {

    $.ajax({
        type: 'POST',
        url: '/Home/AddToTable',
        data: { empList: obj },
        success: function (data) {

              window.location.href = "/Home/GetEmployeeData";
            
            console.log(data);
        },
        error: function (errorThrown, textStatus, xhr) {
            console.log('Error in Operation');
        }
    });
}


function checkStatusOfPlanning() {
    // Get the value of the hidden field
    var employeeStatusOfPlanningValue = $("#StatusOfPlanning").val();

    // Check if the value is 'Completed' and hide the button accordingly
    if (employeeStatusOfPlanningValue === 'Completed') {
        $("#bnttosubmitdata").hide();
    }
}


function hideSaveDetailButton() {

    $('#bnttosubmitdata').hide();

}


