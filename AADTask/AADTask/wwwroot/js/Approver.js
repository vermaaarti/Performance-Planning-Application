let ApproverArray = [];


$(document).ready(function () {

    let approverdataTable = intilizeApproverDataTable(ApproverArray);
    loadApproverDataIntoDataTable(approverdataTable);

});


function loadApproverDataIntoDataTable(approverdataTable) {

    $.ajax({
        type: 'GET',
        url: '/Home/ApproverJSONEmployeeData',
        dataType: 'json',
        success: function (data) {

            ApproverArray = data;

            approverdataTable.rows.add(data).draw();

            console.log(ApproverArray);

        },
        error: function (errorThrown, textStatus, xhr) {
            console.log('Error in Operation', errorThrown);

        }
    });
}

console.log(ApproverArray.length);

function intilizeApproverDataTable(ApproverArray) {
    return new DataTable('#dataTable2', {
        data: ApproverArray,
        columns: [

            {
                data: "employeeName",

            },

            {
                data: "plannerName",
            },
            {
                data: "approverName",
            },
            {
                data: "approvalStatus",
            },
            {
                data: "createdOn",

            },


        ],
        lengthChange: false,
        searching: false,
        info: false,
        paging: false
    });

}


function ChangeAssignedStatus(event) {
    event.preventDefault();

    $.ajax({
        type: 'POST',
        url: '/Home/UpdateAssignedStatusToApproved',
        data: { employeeList: ApproverArray },
        success: function () {
            alert('Status of approval changed from assigned to approved');

            console.log(ApproverArray);
            location.reload(true);
           // window.location.href = "/Home/GetEmployeeData/";

        },
        error: function (errorThrown, textStatus, xhr) {
            console.log('Error in Operation');
        }
    });

}


function GoToApproval(event) {
    event.preventDefault();
    window.location.href = "/Home/ApproverView/";
}



function SendBackToPlanner(event) {
    $.ajax({
        type: 'POST',
        url: '/Home/UpdateAssignedStatusToUnassigned',
        data: { employeeList: ApproverArray },
        success: function () {
            alert('Status of approval changed from assigned to unassigned');

            console.log(ApproverArray);
            location.reload(true);
             window.location.href = "/Home/GetEmployeeData/";

        },
        error: function (errorThrown, textStatus, xhr) {
            console.log('Error in Operation');
        }
    });
}
