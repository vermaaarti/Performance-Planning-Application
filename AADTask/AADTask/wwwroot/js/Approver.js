let ApproverArray = [];
let approverdataTable;
let PlannerArray;


$(document).ready(function () {

     approverdataTable = intilizeApproverDataTable(ApproverArray);
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


function FilterApprover() {
    var inputPlanner = $("#FilterForApproval").val();
    var filteredPlanner = ApproverArray.filter(item => item.plannerName === inputPlanner);

    if (filteredPlanner.length == 0) {
        approverdataTable.clear();
        approverdataTable.draw();
        alert("No data found");
    } else {
        approverdataTable.clear();
        filteredPlanner.forEach(function (data) {
            approverdataTable.row.add(data);
        });
        approverdataTable.draw();
    }
}

function BindPlannerNameInDropdown() {
    $.ajax({
        type: 'POST',
        url: '/Home/GetDistinctPlannerNames',
        contentType: 'application/json',
        dataType: 'json',
        success: function (data) {
            PlannerArray = data.map(planner => planner.plannerName);
            BindPlannerName(PlannerArray);

            // Set default planner when the page loads
            if (PlannerArray.length > 0) {
                var defaultPlanner = PlannerArray[0];
                $("#FilterForApproval").val(defaultPlanner);
                FilterApprover(); 
            }

            console.log(PlannerArray);
        },
        error: function (errorThrown, textStatus, xhr) {
            console.log('Error in Operation');
        }
    });
}

function BindPlannerName(PlannerArray) {
    let select = document.getElementById("FilterForApproval");

    // Clear existing options
    select.innerHTML = "<option>Dropdown Items</option>";

    for (let i = 0; i < PlannerArray.length; i++) {
        let plannerName = PlannerArray[i];
        let el = document.createElement("option");

        // Set both text content and value
        el.textContent = plannerName;
        el.value = plannerName;

        select.appendChild(el);
    }
}





