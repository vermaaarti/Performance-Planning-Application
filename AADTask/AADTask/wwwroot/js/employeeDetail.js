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

    employeeId = $("#employeeId")[0].value;
    employeeName = $("#employeeName")[0].value;
    employeeEmail = $("#employeeEmail")[0].value;
    managerName = $("#managerName")[0].value;
    department = $("#department")[0].value;
    plannerName = $("#plannerName")[0].value;
    StatusOfPlanning = $("#StatusOfPlanning")[0].value;
    approver = $("#approver")[0].value;


    obj = {
        employeeId: employeeId,
        employeeName: employeeName,
        employeeEmail: employeeEmail,
        managerName: managerName,
        department: department,
        plannerName: plannerName,
        StatusOfPlanning: StatusOfPlanning,
        approver: approver
    }


    if (employeeId && employeeName && employeeEmail && managerName && department && plannerName && approver) {
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

    // Check if the value is 'InProgress' and hide the button accordingly
    if (employeeStatusOfPlanningValue === 'InProgress') {
        $("#bnttosubmitdata").hide();
    }
}


function hideSaveDetailButton() {

    $('#bnttosubmitdata').hide();

}


