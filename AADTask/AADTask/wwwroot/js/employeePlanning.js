



// fn to save employees data by planner when submit button is clicked
function Submit(event) {
    event.preventDefault();


    // Check if all performance ratings are selected
    var allRatingsSelected = checkAllRatingsSelected();
    var allChallengeSelected = checkAllChallengesSelected();

    if (allRatingsSelected && allChallengeSelected) {
        SaveEmployee(event);
        // If all ratings are selected, proceed with the AJAX request
        $.ajax({
            type: 'POST',
            url: '/Home/UpdateStatusToCompleted',
            data: { employeeList: globalArray },
            success: function () {
             
                alert('Status of planning changed to InProgress.');
               
               // sendDataToTaskTable();
                
                console.log("my array "+ globalArray);
                location.reload(true);

                 },
            error: function (errorThrown, textStatus, xhr) {
                console.log('Error in Operation');
            }
        });

           } else {
        // If not all ratings are selected, show an alert
        alert('Some performance ratings/challenges are not selected. Please select all ratings before submitting.');
    }

    $.ajax({
        type: 'POST',
        url: '/Home/AddDataIntoTaskTableForResult',
        data: {employeeList:globalArray},
        success: function () {
          console.log("Data added to ApprovalTask_aarti table successfully.");
           
        },
        error: function (errorThrown, textStatus, xhr) {
            console.log('Error in operation: ' + errorThrown);
        }
    });

   }

function checkAllRatingsSelected() {
    var allRatingsSelected = true;

    // Iterate over the global array and check if all ratings are selected
    globalArray.forEach(function (item) {
        var performanceRatingDropdown = `#performanceRatingDropdown${item.employeeId}`;
        var selectedRating = $(performanceRatingDropdown).val();

        // Check if the performance rating is not selected
        if (selectedRating === "") {
            allRatingsSelected = false;
            return false; // Break out of the loop
        }
    });

    return allRatingsSelected;
}



function checkAllChallengesSelected() {
    var allChallengeSelected = true;

    // Iterate over the global array and check if all challenges are selected
    globalArray.forEach(function (item) {
        var performanceChallengesDropdown = `#performanceChallengesDropdown${item.employeeId}`;
        var selectedRating = $(performanceChallengesDropdown).val();

        // Check if the performance challenges is not selected
        if (selectedRating === "") {
            allChallengeSelected = false;
            return false; // Break out of the loop
        }
    });

    return allChallengeSelected;
}

// fn ends here

//fn to send data into the task table

/*function sendDataToTaskTable() {
      
        $.ajax({
            type: 'POST',
            url: '/Home/AddDataIntoTaskTableForResult',
            success: function () {
               
            },
            error: function (errorThrown, textStatus, xhr) {
                console.log('Error in operation: ' + errorThrown);
            }
        });
    

}*/














