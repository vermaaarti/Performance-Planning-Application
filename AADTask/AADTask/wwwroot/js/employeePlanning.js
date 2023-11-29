



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
                alert('Status of planning changed to Completed.');
                // changeDataTable();
                console.log(globalArray);
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