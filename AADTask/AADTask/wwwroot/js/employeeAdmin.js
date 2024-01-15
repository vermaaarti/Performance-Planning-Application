let globalArray = [];

$(document).ready(function () {

    let dataTable = intilizeDataTable(globalArray);
    loadDataIntoDataTable({ dataTable });
    
});
function loadDataIntoDataTable({ dataTable }) {

    $.ajax({
        type: 'GET',
        url: '/Home/JSONEmployeeData',
        dataType: 'json',
        success: function (data) {

            globalArray = data;

            dataTable.rows.add(data).draw();

            console.log(globalArray);
            CheckStatusOfPlanningIsDraft(globalArray);

          

        },
        error: function (errorThrown, textStatus, xhr) {
            console.log('Error in Operation', errorThrown);

        }
    });
}


function intilizeDataTable(globalArray) {
    return new DataTable('#dataTable', {
        data: globalArray,
        columns: [

            {
                data: "employeeName",
                'render': function (data, type, row) {
                    return '<a href="/Home/EmployeeDetailView/?id=' + row.employeeId + '" class = "idfield">' + data + '</a>';
                },
            },
            {
                data: "employeeEmail",

            },
            {
                data: "managerName",
            },
            {
                data: "plannerName",
            },
            {
                data: "department",
            },
            {
                "render": function (data, type, row) { 

                    if (row.statusOfPlanning === "InProgress" || row.statusOfPlanning === "Completed") {
                        
                        return `<span>${row.performanceChallenges}</span>`;

                    }
                    else {
                  
                        return `<select class="optionValue" id="performanceChallengesDropdown${row.employeeId}" onchange = "SaveAsDraft(${row.employeeId})">
                       <option value="" >select an option</option>
                       <option value="Training Required" ${row.performanceChallenges === "Training Required" ? "selected" : ''}>Training Required</option>
                       <option value="Was/Is in PIP" ${row.performanceChallenges === "Was/Is in PIP" ? "selected" : ''}>Was/Is in PIP</option>
                       <option value="No certification" ${row.performanceChallenges === "No certification" ? "selected" : ''}>No certification</option>
                       <option value="No challenges" ${row.performanceChallenges === "No challenges" ? "selected" : ''}>No challenges</option>
                       </select >`;

                    }

                }
            },
            {
                "render": function (data, type, row) {  // window.location.href()

                    if (row.statusOfPlanning === "InProgress" || row.statusOfPlanning === "Completed") {
                        //  flag = 1;
                        return `<span>${row.performanceRating}</span>`;

                    }
                    else {
                        //   flag = 0;
                        return `<select class="optionValue" id="performanceRatingDropdown${row.employeeId}" onchange ="SaveAsDraft(${row.employeeId})">
                       <option value="" >select an option</option>
                       <option value="Poor" ${row.performanceRating == "Poor" ? "selected" : ''}>Poor</option>
                       <option value="Satisfactory" ${row.performanceRating === "Satisfactory" ? "selected" : ''}>Satisfactory</option>
                       <option value="Good" ${row.performanceRating == "Good" ? "selected" : ''}>Good</option>
                       <option value="Excellent" ${row.performanceRating == "Excellent" ? "selected" : ''}>Excellent</option>
                       </select >`;

                    }

                }
            },
            {
                data: "statusOfPlanning",
            },
                     
        ],
        lengthChange: false,
        searching: false,
        info: false,
        paging: false
    });

}



// fn to save employee data after changing the performance rating
function SaveEmployee(event) {
    event.preventDefault();

    $.ajax({
        type: 'POST',
        url: '/Home/UpdatedData',
        data: { employeeList: globalArray },
        success: function (data) {

            console.log(globalArray);
           
        },
        error: function (errorThrown, textStatus, xhr) {
            console.log('Error in Operation');
        }
    });


}


function SaveAsDraft(employeeId) {

      // Use map to update the performance rating & performance challenge for the specific employee
    globalArray = globalArray.map(employee => {
        if (employee.employeeId === employeeId) {
            return {
                ...employee,
                performanceRating: $('#performanceRatingDropdown' + employeeId).val(),
                performanceChallenges: $('#performanceChallengesDropdown' + employeeId).val()
            };
        }
        return employee;
    });
}



// fn to redirect into method to add new employee
function AddNewEmployee(event) {

    event.preventDefault();

    window.location.href = "/Home/EmployeeDetailView/";


}


function CheckStatusOfPlanningIsDraft(globalArray) {
     var showButton = globalArray.some(function (item) {
        return item.statusOfPlanning === 'draft';
    });

    if (showButton) {
        $("#btnToSubmitStatusOfPlanning").show();
    } else {
        $("#btnToSubmitStatusOfPlanning").hide();
    }
    
}













