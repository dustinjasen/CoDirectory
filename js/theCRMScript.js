$(document).ready(function (e) {
  allResults();

  /*
  
          // These are the constraints used to validate the form
          var constraints = {
            newFirstName: {
              presence: true,
              length: {
                minimum: 3,
                message: "^Enter name greater than 2 letters",
              },
              format: {
                pattern: "[a-zA-Z]+",
                message: "can only contain letters"
              },
            },
            
            newLastName: {
              presence: true,
              length: {
                minimum: 3,
                message: "^Enter name greater than 2 letters",
              },
              format: {
                pattern: "[a-zA-Z]+",
                message: "can only contain letters"
              },
            },        
            
            newEmailAddress: {
              presence: true,
              email: true
            }, 
            
            linkDepartment: {
              presence: true,
            }
          };

          // Hook up the form so we can prevent it from being posted
          var form = document.querySelector("form#createProfile");
          form.addEventListener("submit", function(ev) {
            ev.preventDefault();
            handleFormSubmit(form);
          });

          // Hook up the inputs to validate on the fly
          var inputs = document.querySelectorAll("input, textarea, select")
          for (var i = 0; i < inputs.length; ++i) {
            inputs.item(i).addEventListener("change", function(ev) {
              var errors = validate(form, constraints) || {};
              showErrorsForInput(this, errors[this.name])
            });
          }

          function handleFormSubmit(form, input) {
            // validate the form against the constraints
            var errors = validate(form, constraints);
            // then we update the form to reflect the results
            showErrors(form, errors || {});
            if (!errors) {
              showSuccess();
            }
          }

          // Updates the inputs with the validation errors
          function showErrors(form, errors) {
            // We loop through all the inputs and show the errors for that input
            _.each(form.querySelectorAll("input[name], select[name]"), function(input) {
              // Since the errors can be null if no errors were found we need to handle
              // that
              showErrorsForInput(input, errors && errors[input.name]);
            });
          }

          // Shows the errors for a specific input
          function showErrorsForInput(input, errors) {
            // This is the root of the input
            var formGroup = closestParent(input.parentNode, "form-group")
              // Find where the error messages will be insert into
              , messages = formGroup.querySelector(".messages");
            // First we remove any old messages and resets the classes
            resetFormGroup(formGroup);
            // If we have errors
            if (errors) {
              // we first mark the group has having errors
              formGroup.classList.add("has-error");
              // then we append all the errors
              _.each(errors, function(error) {
                addError(messages, error);
              });
            } else {
              // otherwise we simply mark it as success
              formGroup.classList.add("has-success");
            }
          }

          // Recusively finds the closest parent that has the specified class
          function closestParent(child, className) {
            if (!child || child == document) {
              return null;
            }
            if (child.classList.contains(className)) {
              return child;
            } else {
              return closestParent(child.parentNode, className);
            }
          }

          function resetFormGroup(formGroup) {
            // Remove the success and error classes
            formGroup.classList.remove("has-error");
            formGroup.classList.remove("has-success");
            // and remove any old messages
            _.each(formGroup.querySelectorAll(".help-block.error"), function(el) {
              el.parentNode.removeChild(el);
            });
          }

          // Adds the specified error with the following markup
          // <p class="help-block error">[message]</p>
          function addError(messages, error) {
            var block = document.createElement("p");
            block.classList.add("help-block");
            block.classList.add("error");
            block.innerText = error;
            messages.appendChild(block);
          }

          function showSuccess() {
            // We made it \:D/
            alert("Success!");
          }
      */


  

  //Don't delete });   !!
});
// END OF DOCUMENT READY FUNCTION 

function populateDeptOptions(id, name) {
  $.ajax({
    url: './php/getAllDepartments.php',
    dataType: "json",
    success: function (result) {

      var data = result;

      var deptDropdownNewUser = $('#selectDept');
      deptDropdownNewUser.empty();

      var deptDropdownNewUserDesktop = $('#selectDeptD');
      deptDropdownNewUserDesktop.empty();

      var deptDropdownEditUser = $('#editDept');
      deptDropdownEditUser.empty();

      var deptDropdownEditUserDesktop = $('#editDeptDesktop');
      deptDropdownEditUserDesktop.empty();

      $.each(data, function (key, value) {
        deptDropdownNewUser.append($('<option value=' + value.id + '>' + value.name + '</option>'));
        deptDropdownEditUser.append($('<option value=' + value.id + '>' + value.name + '</option>'));
        deptDropdownEditUserDesktop.append($('<option value=' + value.id + '>' + value.name + '</option>'));
        deptDropdownNewUserDesktop.append($('<option value=' + value.id + '>' + value.name + '</option>'));
      });
    },
    error: function (jqXHR, textStatus, errorThrown) {
      alert(':' + textStatus + ' : ' + errorThrown + ' || Please press F12 to access Network Log for further info');
    },
  });
}

function populateLocationOptionsMisc() {
  $.ajax({
    url: './php/getAllLocations.php',
    dataType: "json",
    success: function (result) {

      var data = result;

      var locationDropDownUserDesktopEdit = $('#editLocDesktop');
      locationDropDownUserDesktopEdit.empty();

      $.each(data, function (key, value) {
        locationDropDownUserDesktopEdit.append($('<option value=' + value.id + '>' + value.name + '</option>'))
      });

    },
    error: function (jqXHR, textStatus, errorThrown) {
      alert(':' + textStatus + ' : ' + errorThrown + ' || Please press F12 to access Network Log for further info');
    },
  });
}

function populateLocationforDeptOptions() {
  $.ajax({
    url: './php/getAllLocations.php',
    dataType: "json",
    success: function (result) {

      var data = result;

      var locationNewDept = $('#editLocationNewDept');
      locationNewDept.empty();

      var editDepartmentLocation = $('#editDepartmentLocation');
      editDepartmentLocation.empty();

      $.each(data, function (key, value) {
        locationNewDept.append($('<option value=' + value.id + '>' + value.name + '</option>'))
        editDepartmentLocation.append($('<option value=' + value.id + '>' + value.name + '</option>'))
      });

    },
    error: function (jqXHR, textStatus, errorThrown) {
      alert(':' + textStatus + ' : ' + errorThrown + ' || Please press F12 to access Network Log for further info');
    },
  });
}

// START OF CRUD FUNCTIONS FOR USERS ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
function allResults() {
  $.ajax({
    url: './php/getAll.php',
    dataType: "json",
    type: 'POST',
    success: function (result) {
      
      $('#allDataTable').html('');

      var allData = result['data'];
      var pID, firstName, lastName, dept, location, eMail, dID, lID;

      var previewID, previewFirstName, previewLastName, previewDept, previewLocation, previewEmail, previewDeptID;

      if ($(document).width() > 990) {

        //Table Data Panel
        
        let navBarStart = '<nav class="navbar navbar-expand-lg navbar navbar-dark bg-dark fixed-top">';
        let divOne = '<div class="container-fluid">';
        let logo = '<a class="navbar-brand font-monospace navLogo" href="./">dir</a>';
        let divTwo = '<div class="navbar-nav" id="navbarSupportedContent">';
        let iconsDiv = '<div class="ms-auto">';
        let iconOne = '<a class="iconsBottom" id=""><i class="fas fa-sort-amount-down"></i></a>';
        let iconTwo = '<a class="iconsBottom" id=""><i class="fas fa-sort-amount-down-alt"></i></a>';
        let iconThree = '<a class="iconsBottom" id="addUserDesktopPanel"><i class="fas fa-user-plus"></i></a>';
        let iconFour = '<a class="iconsBottom" id="deptAdminPanel"><i class="fas fa-users-cog"></i></a>';
        let iconFive = '<a class="iconsBottom" id="locationAdminPanel"><i class="fas fa-map-marker-alt"></i></a>';
        let iconsDivExit = '</div>';
        let divTwoExit = '</div>';
        let divOneExit = '</div>';
        let navBarExit = '</nav>';
        
        $('#navBarRender').html(navBarStart+divOne+logo+divTwo+iconsDiv+iconOne+iconTwo+iconThree+iconFour+iconFive+iconsDivExit+divTwoExit+divOneExit+navBarExit);

        let tableStart = '<table id="allDataTable" class="table table-striped table-hover">';

        let tHeadStart = "<thead><tr>";

        let tHead1 = '<th scope="col" class="col-2"><i style="color: #ff4500" class="fas fa-sort float-start" onClick="sortTable(2)"></i><input onkeyup="searchFirst()" id="searchFirst" class="form-control colSearch" type="text" placeholder="First"></th>';
        let tHead2 = '<th scope="col" class="col-2"><i style="color: #ff4500" class="fas fa-sort float-start" onClick="sortTable(3)"></i><input onkeyup="searchLast()" id="searchLast" class="form-control colSearch" type="text" placeholder="Surname"></th>';
        let tHead3 = '<th scope="col" class="col"><i style="color: #ff4500" class="fas fa-sort float-start" onClick="sortTable(4)"></i><input onkeyup="searchDept()" id="searchDept" class="form-control colSearch" type="text" placeholder="Department"></th>';
        let tHead4 = '<th scope="col" class="col"><i style="color: #ff4500" class="fas fa-sort float-start" onClick="sortTable(5)"></i><input onkeyup="searchLoc()" id="searchLoc" class="form-control colSearch" type="text" placeholder="Location"></th>';
        let tHead5 = '<th scope="col" class="col-2"><i style="color: #ff4500" class="fas fa-sort float-start" onClick="sortTable(6)"></i><input onkeyup="searchEmail()" id="searchEmail" class="form-control colSearch" type="text" placeholder="Email"></th>';

        let tHeadEnd = "</tr></thead>";

        let tBody = "<tbody id='mainTable'></tbody>";

        let tableEnd = "</table>";

        $('#directoryData').html(tableStart + tHeadStart + tHead1 + tHead2 + tHead3 + tHead4 + tHead5 + tHeadEnd + tBody + tableEnd);

        //Loops Start to populate tables in either Desktop or Mobile

        for (var i = 0; i < allData.length; i++) {
          let pID = allData[i]['id'];
          let firstName = allData[i]['firstName'];
          let lastName = allData[i]['lastName'];
          let dept = allData[i]['department'];
          let location = allData[i]['location'];
          let eMail = allData[i]['email'];
          let dID = allData[i]['departmentID'];
          let lID = allData[i]['locationID'];

          //Table structure in variables    

          let trStart = "<tr class='clickRow'>";
          let col1 = "<td class='d-none pID' id='userID'>" + pID + "</td>";
          let col2 = "<td class='d-none dID'>" + dID + "</td>";
          let col3 = "<td scope='row' class='fName'>" + firstName + "</td>";
          let col4 = "<td scope='row' class='lName'>" + lastName + "</td>";
          let col5 = "<td scope='row' class='deptName'>" + dept + "</td>";
          let col6 = "<td scope='row' class='locationName'>" + location + "</td>";
          let col7 = "<td scope='row' class='eAddress'><a style='color: #D03800;' href='#'>" + eMail + "</a></td>";
          //let delBtn = "<td><button class='text-danger' onClick='deleteProfileDesktop()'><i class='far fa-trash-alt'></i></button></td>"
          let col8 = "<td class='d-none lID'>" + lID + "</td>";
          let trEnd = "</tr>";

          $('#mainTable').append(trStart + col1 + col2 + col3 + col4 + col5 + col6 + col7 + col8 + trEnd);
        }

      } 
      
      else {

        $('#previewData').html("");
        $('#directoryData').removeClass('col-8');
        $('#previewData').removeClass('col-4');
        
        //Top Nav        
        let navBarStartTop = '<nav class="navbar navbar-expand-lg navbar navbar-dark bg-dark fixed-top">';
        let divOneTop = '<div class="container-fluid">';
        let logoTop = '<a class="navbar-brand font-monospace navLogo" href="./">dir</a>';
        let divOneExitTop = '</div>';
        let navBarExitTop = '</nav>';
        
        //Bottom Nav
        let navBarStart = '<nav class="navbar navbar-expand-lg navbar navbar-dark bg-dark fixed-bottom">';
        let divOne = '<div class="container-fluid">';
        let divTwo = '<div class="navbar-nav" id="navbarSupportedContent">';
        let iconsDiv = '<div class="ms-auto">';
        let iconOne = '<a class="iconsBottom" id=""><i class="fas fa-sort-amount-down"></i></a>';
        let iconTwo = '<a class="iconsBottom" id=""><i class="fas fa-sort-amount-down-alt"></i></a>';
        let iconThree = '<a class="iconsBottom" id="addUserDesktopPanel"><i class="fas fa-user-plus"></i></a>';
        let iconFour = '<a class="iconsBottom" id="deptAdminPanel"><i class="fas fa-users-cog"></i></a>';
        let iconFive = '<a class="iconsBottom" id="locationAdminPanel"><i class="fas fa-map-marker-alt"></i></a>';
        let iconsDivExit = '</div>';
        let divTwoExit = '</div>';
        let divOneExit = '</div>';
        let navBarExit = '</nav>';
        
        $('#navBarRender').html(navBarStartTop+divOneTop+logoTop+divOneExitTop+navBarExitTop+navBarStart+divOne+divTwo+iconsDiv+iconOne+iconTwo+iconThree+iconFour+iconFive+iconsDivExit+divTwoExit+divOneExit+navBarExit);


        let tableStart = '<table id="allDataTable" class="table table-striped table-hover">';

        let tBody = "<tbody id='mainTable'></tbody>";

        let tableEnd = "</table>";

        $('#directoryData').html(tableStart + tBody + tableEnd);

        for (var j = 0; j < allData.length; j++) {
          let pID = allData[j]['id'];
          let firstName = allData[j]['firstName'];
          let lastName = allData[j]['lastName'];
          let dept = allData[j]['department'];
          let location = allData[j]['location'];
          let eMail = allData[j]['email'];
          let dID = allData[j]['departmentID'];
          let lID = allData[j]['locationID'];
          //Table structure in variables

          let trStart = "<tr class='clickRow mobileRows'>";
          //col1 - col5 are hidden and included for data use only
          let col1 = "<td class='d-none pID'>" + pID + "</td>";
          let col2 = "<td class='d-none dID'>" + dID + "</td>";
          let col3 = "<td class='d-none lID'>" + lID + "</td>";
          let col4 = "<td class='locationName d-none'>" + location + "</td>";
          let col5 = "<td class='deptName d-none'>" + dept + "</td>";
          let col6 = "<td scope='row' class='fName'>" + firstName + "</td>";
          let col7 = "<td scope='row' class='lName'>" + lastName + "</td>";
          let col8 = "<td scope='row'><a style='color: #D03800;' href='" + eMail + "'><i class='far fa-envelope'></i></a></td>";

          let col9 = "<td class='d-none eAddress'>" + eMail + "</td>";

          let trEnd = "</tr>";

          $('#mainTable').append(trStart + col1 + col2 + col3 + col4 + col5 + col6 + col7 + col8 + col9 + trEnd);
        }
      }

      // Make rows clickable to show preview and populate edit modal 
  $(".clickRow").click(function () {
          var row = $(this).closest("tr");
          var previewID = row.find(".pID").text();
          var previewFirstName = row.find(".fName").text();
          var previewLastName = row.find(".lName").text();
          var previewDept = row.find(".deptName").text();
          var previewLocation = row.find(".locationName").text();
          var previewEmail = row.find(".eAddress").text();
          var previewDeptID = row.find(".dID").text();
          var previewLocationID = row.find(".lID").text();
        
    if ($(document).width() > 990) {

          $('#previewData').html("");

          populateDeptOptions();
          populateLocationOptionsMisc();

          //Desktop Edit User Form Creation on clicking row in table
          let heading = '<div class="createContactHeader">Edit Contact<button class="btn deleteButton float-end" onClick="deleteProfileDesktop()"><i class="far fa-trash-alt"></i></button></div>';
          let editFormStart = '<form id="editUserForm" method="post">';

          let editIDDesktop = '<div class="mb-3 d-none" id="userEditIDDesktop">' + previewID + '</div>';
          let editFirstNameDiv = '<div class="mb-3 form-group"><label for="editFirstNameDesktop" class="labels">Edit First Name</label><input type="text" class="form-control" id="editFirstNameDesktop" name="editFirstNameDesktop" placeholder="First name" value="' + previewFirstName + '" required><div class="col-sm-5 messages"></div></div>';
          let editLastNameDiv = '<div class="mb-3 form-group"><label for="editLastNameDesktop" class="labels">Edit Last name</label><input type="text" class="form-control" id="editLastNameDesktop" name="editLastNameDesktop" placeholder="Second name" value="' + previewLastName + '" required><div class="col-sm-5 messages"></div></div>';
          let editEmailDiv = '<div class="mb-3 form-group"><label for="editEmailAddressDesktop" class="labels">Edit Email address</label><input type="email" class="form-control" id="editEmailAddressDesktop" placeholder="name@email.com" name="editEmailAddressDesktop" value=' + previewEmail + ' required><div class="col-sm-5 messages"></div></div>';
          let editDeptDiv = '<div class="mb-3 form-group"><label for="editDeptDesktop" class="labels">Change Department</label><select class="form-select" aria-label="editDeptDesktop" name="editDeptDesktop" id="editDeptDesktop" value="' + previewDeptID + '" required></select><div class="col-sm-5 messages"></div></div>';

          let saveBtn = '<div><button type="button" onClick="editProfileDesktop()" class="btn saveButton">Save</button>';
          let cancelBtn = '<button type="button" class="btn cancelButton" onClick="location.reload()" data-bs-dismiss="modal">Cancel</button></div>';

          let editFormEnd = '</form>';
          
          $('#previewData').html(heading + editFormStart + editIDDesktop + editFirstNameDiv + editLastNameDiv + editEmailDiv + editDeptDiv + saveBtn + cancelBtn + editFormEnd);

        } else {

          $('#previewData').html("");
          $('#directoryData').removeClass('col-8');
          $('#previewData').removeClass('col-4');
          $('#directoryData').addClass('col-3');
          $('#previewData').addClass('col-9');

          populateDeptOptions();
          populateLocationOptionsMisc();

          let heading = '<div class="createContactHeader">Edit Contact<button class="btn deleteButton float-end" onClick="deleteProfileDesktop()"><i class="far fa-trash-alt"></i></button></div>';
          let editFormStart = '<form id="editUserForm" method="post">';

          let editIDDesktop = '<div class="mb-3 d-none" id="userEditIDDesktop">' + previewID + '</div>';
          let editFirstNameDiv = '<div class="mb-3 form-group"><label for="editFirstNameDesktop" class="labels">Edit First Name</label><input type="text" class="form-control" id="editFirstNameDesktop" name="editFirstNameDesktop" placeholder="First name" value="' + previewFirstName + '" required><div class="col-sm-5 messages"></div></div>';
          let editLastNameDiv = '<div class="mb-3 form-group"><label for="editLastNameDesktop" class="labels">Edit Last name</label><input type="text" class="form-control" id="editLastNameDesktop" name="editLastNameDesktop" placeholder="Second name" value="' + previewLastName + '" required><div class="col-sm-5 messages"></div></div>';
          let editEmailDiv = '<div class="mb-3 form-group"><label for="editEmailAddressDesktop" class="labels">Edit Email address</label><input type="email" class="form-control" id="editEmailAddressDesktop" placeholder="name@email.com" name="editEmailAddressDesktop" value=' + previewEmail + ' required><div class="col-sm-5 messages"></div></div>';
          let editDeptDiv = '<div class="mb-3 form-group"><label for="editDeptDesktop" class="labels">Change Department</label><select class="form-select" aria-label="editDeptDesktop" name="editDeptDesktop" id="editDeptDesktop" value="' + previewDeptID + '" required></select><div class="col-sm-5 messages"></div></div>';

          let saveBtn = '<div><button type="button" onClick="editProfileDesktop()" class="btn saveButton">Save</button>';
          let cancelBtn = '<button type="button" class="btn cancelButton" onClick="location.reload()" data-bs-dismiss="modal">Cancel</button></div>';

          let editFormEnd = '</form>';
          
          $('#previewData').html(heading + editFormStart + editIDDesktop + editFirstNameDiv + editLastNameDiv + editEmailDiv + editDeptDiv + saveBtn + cancelBtn + editFormEnd);

        }
      });

// Add User Admin Panel

  $('#addUserDesktopPanel').click(function () {
    
    // New User Form in Desktop
    
  let heading = '<div class="createContactHeader">Create Contact</div>';

  let newUserFormStart = '<form autocomplete="off" id="createProfileDesktop" name="createProfileDesktop" method="post">'

  let newFirstNameDiv = '<div class="mb-3 form-group"><label for="newFirstName" class="labels">First name</label><input type="text" class="form-control" id="newFirstNameD" name="newFirstName" placeholder="First name" required><div class="col-sm-5 messages"></div></div>';
  let newLastNameDiv = '<div class="mb-3 form-group"><label for="newLastName" class="labels">Last name</label><input type="text" class="form-control" id="newLastNameD" name="newLastName" placeholder="Second name" required><div class="col-sm-5 messages"></div></div>';
  let newEmailDiv = '<div class="mb-3 form-group"><label for="newEmailAddress" class="labels">Email address</label><input type="email" class="form-control" id="newEmailAddressD" placeholder="name@email.com" name="newEmailAddress" required><div class="col-sm-5 messages"></div></div>';
  let newDeptDiv = '<div class="mb-3 form-group"><label for="selectDeptD" class="labels">Department</label><select class="form-select" aria-label="linkDepartmentSelect" name="selectDeptD" id="selectDeptD" required></select><div class="col-sm-5 messages"></div></div>';

  let cancelNewUser = '<button type="button" class="btn cancelButton" onClick="location.reload()" data-bs-dismiss="modal">Cancel</button>';
  let saveNewUser = '<button type="button" onClick="insertNewUserDesktop()" class="btn saveButton">Create</button>';

  let newUserFormEnd = '</form>';

    if ($(document).width() > 990) {

      $('#previewData').html("");
      $('#previewData').html(heading+newUserFormStart + newFirstNameDiv + newLastNameDiv + newEmailDiv + newDeptDiv + saveNewUser + cancelNewUser + newUserFormEnd);
      $('#previewData').css("background-color", "#ffece6");

      populateDeptOptions();

    } else {

      $('#previewData').html("");
      $('#directoryData').removeClass('col-8');
      $('#previewData').removeClass('col-4');
      $('#directoryData').addClass('col-3');
      $('#previewData').addClass('col-9');
      $('#previewData').css("background-color", "#ffece6");
      
      $('#previewData').html(heading+newUserFormStart + newFirstNameDiv + newLastNameDiv + newEmailDiv + newDeptDiv + saveNewUser + cancelNewUser + newUserFormEnd);
      populateDeptOptions();
    }
  })
      
  
//Location Admin Panel

  $('#locationAdminPanel').click(function () {
    
      $('#previewData').html("");

    if ($(document).width() > 990) {
      
      allLocationsTable();
     
    } else {
      
      $('#directoryData').removeClass('col-8');
      $('#previewData').removeClass('col-4');
      $('#directoryData').addClass('col-3');
      $('#previewData').addClass('col-9');
      
      allLocationsTable();
    }
  });

  //Department Admin Panel

  $('#deptAdminPanel').click(function () {

    $('#previewData').html("");

    if ($(document).width() > 990) {

      allDeptTable();

    } else {

      $('#previewData').html("");
      $('#directoryData').removeClass('col-8');
      $('#previewData').removeClass('col-4');
      $('#directoryData').addClass('col-3');
      $('#previewData').addClass('col-9');
      //Add location button
      allDeptTable();
    }
  })
      
    },
    error: function (jqXHR, textStatus, errorThrown) {
      alert(':' + textStatus + ' : ' + errorThrown + ' || Please press F12 to access Network Log for further info');
    },
  });
}

function insertNewUserMobile() {
  var firstName = $('#newFirstName').val();
  var lastName = $('#newLastName').val();
  var email = $('#newEmailAddress').val();
  var departmentId = $('#selectDept').val();
  insertProfile(firstName, lastName, email, departmentId);
}

function insertNewUserDesktop() {
  var firstName = $('#newFirstNameD').val();
  var lastName = $('#newLastNameD').val();
  var email = $('#newEmailAddressD').val();
  var departmentId = $('#selectDeptD').val();
  insertProfile(firstName, lastName, email, departmentId);
}

function insertProfile(firstName, lastName, email, departmentId) {
  $.ajax({
    url: './php/insertProfile.php',
    type: 'POST',
    dataType: "json",
    data: {
      firstName: firstName,
      lastName: lastName,
      email: email,
      departmentId: departmentId
    },

    success: function () {
      allResults();
      $('#createUserModal').modal('hide');

    },
    error: function (jqXHR, textStatus, errorThrown) {
      alert(':' + textStatus + ' : ' + errorThrown + ' || Please press F12 to access Network Log for further info');
    },
  });
}

function deleteProfileDesktop() {
  var profileID = $('#userEditIDDesktop').text();
  //console.log(profileID);
  deleteProfileAJAX(profileID);
}

function deleteProfileAJAX(profileID) {
  $.ajax({
    url: './php/deleteProfile.php',
    type: 'POST',
    dataType: "json",
    data: {
      profileID: profileID,
    },

    success: function () {
      allResults();
    },
    error: function (jqXHR, textStatus, errorThrown) {
      alert(':' + textStatus + ' : ' + errorThrown + ' || Please press F12 to access Network Log for further info');
    },
  });
}

function editProfileAJAX(previewID, previewFirstName, previewLastName, previewDept, previewEmail) {
  $.ajax({
    url: './php/editProfile.php',
    type: 'POST',
    dataType: "json",
    data: {
      employeeId1: previewID,
      firstName1: previewFirstName,
      lastName1: previewLastName,
      email1: previewEmail,
      departmentId1: previewDept,

    },

    success: function () {
      location.reload();
    },
    error: function (jqXHR, textStatus, errorThrown) {
      alert(':' + textStatus + ' : ' + errorThrown + ' || Please press F12 to access Network Log for further info');
    },
  });
}

function editProfileDesktop() {

  var previewID = $('#userEditIDDesktop').text();
  var previewFirstName = $('#editFirstNameDesktop').val();
  var previewLastName = $('#editLastNameDesktop').val();
  var previewEmail = $('#editEmailAddressDesktop').val();
  var previewDeptID = $('#editDeptDesktop').val();
  editProfileAJAX(previewID, previewFirstName, previewLastName, previewDeptID, previewEmail);
}

// END OF CRUD USER FUNCTIONS ****************************************************************


// START OF CRUD DEPTARTMENT FUNCTIONS ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

function allDeptTable() {
  $.ajax({
    url: './php/getAllDepartments.php',
    dataType: "json",
    success: function (result) {

        let heading = '<div class="DeptAdminHeader">Department Admin<button class="btn addButton float-end" id="newDepartmentButton"><i class="fas fa-plus-circle"></i></button></div>';
        let tableStart = '<table id="deptAdminTable" class="table table-striped table-hover">';

        let tBody = "<tbody id='previewTable'></tbody>";

        let tableEnd = "</table>";

        $('#previewData').html(heading + tableStart + tBody + tableEnd);
        $('#previewData').css("background-color", "#e1ffc6");

      for (var i = 0; i < result.length; i++) {
        let deptID = result[i]['id'];
        let locID = result[i]['locationID'];
        let name = result[i]['name'];
        
        
        let col1 = "<tr class='clickRowDept'><td class='deptNameEdit'>" + name + "</td>";
        let col2 = "<td class='d-none deptAdminID'>" + deptID + "</td>";
        let col3 = "<td class='d-none deptLocationAdminID'>" + locID + "</td>";
        let delBtn = '<td class="deleteDepartment"><a class="text-danger" ><i class="far fa-trash-alt"></i></a></td></tr>';
        
        

        //Location Table

        $('#previewTable').append(col1 + col2 + col3 + delBtn);

      }

      $('#newDepartmentButton').click(function () {

        let newDepartmentFormStart = '<form id="createDept" name="createDept" method="post">';

        let newDepartmentInput = '<div class="mb-3 form-group"><label for="newDept" class="labels">Enter Department</label><input type="text" class="form-control" id="newDept" name="newDept" placeholder="New Dept" required><div class="col-sm-5 messages"></div></div>';

        let newDepartmentLocationInput = '<div class="mb-3 form-group"><label for="editLocationNewDept" class="labels">Location of Department</label><select class="form-select" aria-label="editLocationNewDept" name="editLocationNewDept" id="editLocationNewDept" required></select><div class="col-sm-5 messages"></div></div>';

        let newDepartmentSave = '<button type="submit" class="btn saveButton">Create</button>';
        let newDepartmentCancel = '<button type="button" class="btn cancelButton" onClick="location.reload()">Cancel</button>';

        let newDepartmentFormEnd = '</form>';

        populateLocationforDeptOptions();
        
        $('#previewData').html(newDepartmentFormStart + newDepartmentInput + newDepartmentLocationInput + newDepartmentSave + newDepartmentCancel + newDepartmentFormEnd);

        $('#createDept').on('submit', function (e) {
          e.preventDefault();
          var createNewDept = $('#newDept').val();
          var selectLocationforNewDept = $('#editLocationNewDept').val();
          newDeptAJAX(createNewDept, selectLocationforNewDept);
        })
      });      
      
      $('.clickRowDept').click(function () {

        let row = $(this).closest("tr");
        let deptName = row.find("td:eq(0)").text();
        let departmentId = row.find("td:eq(1)").text();
        let locationId = row.find("td:eq(2)").text();


        let editFormStart = '<form method="post">';
        let editDeptID = '<p class="d-none" id="editDeptID">' + departmentId + '</p>';
        let editDeptName = '<input class="form-input" name="editDeptName" id="editDeptName" value="' + deptName + '" required></input><div class="col-sm-5 messages"></div>';
        let EditDepartmentLocation = '<select class="form-select" name="editDepartmentLocation" id="editDepartmentLocation" value="' + locationId + '" required></select><div class="col-sm-5 messages"></div>';
        let saveBtn = '<div><button type="button" onClick="editDeptartment()" class="btn saveButton">Save</button>';
        let cancelBtn = '<button type="button" class="btn cancelButton" onClick="location.reload()" data-bs-dismiss="modal">Cancel</button></div>';
        let editFormEnd = '</form>';

        $('#previewData').html("");

        $('#previewData').append(editFormStart + editDeptID + editDeptName + EditDepartmentLocation + saveBtn + cancelBtn + editFormEnd);
        populateLocationforDeptOptions();

      })


      //Delete Department Function

      $('.deleteDepartment').click(function () {
        let row = $(this).closest("tr");
        let deleteDeptID = row.find(".deptAdminID").text();
        //console.log(deleteDeptID);
        deleteDeptAJAX(deleteDeptID);
      })


    },
    error: function (jqXHR, textStatus, errorThrown) {
      alert(':' + textStatus + ' : ' + errorThrown + ' || Please press F12 to access Network Log for further info');
    },
  });
}

function newDeptAJAX(createNewDept, selectLocationforNewDept) {
  $.ajax({
    url: './php/insertDepartment.php',
    type: 'POST',
    dataType: "json",
    data: {
      deptNewName: createNewDept,
      locationOfNewDept: selectLocationforNewDept,
    },

    success: function () {
      location.reload();
      //allResults();
    },

    error: function (jqXHR, textStatus, errorThrown) {
      alert(':' + textStatus + ' : ' + errorThrown + ' || Please press F12 to access Network Log for further info');
    },
  });
}

function editDeptartment() {

  var departmentId = $('#editDeptID').text();
  var deptName = $('#editDeptName').val();
  var locationId = $('#editDepartmentLocation').val();
  editDepartmentAJAX(departmentId, deptName, locationId);
}

function editDepartmentAJAX(departmentId, deptName, locationId) {
  $.ajax({
    url: './php/editDept.php',
    type: 'POST',
    dataType: "json",
    data: {
      departmentId: departmentId,
      deptName: deptName,
      locationId: locationId,
    },

    success: function () {
      console.log('worked')
        //location.reload();
    },
    error: function (jqXHR, textStatus, errorThrown) {
      alert(':' + textStatus + ' : ' + errorThrown + ' || Please press F12 to access Network Log for further info');
    },
  });
}

function deleteDeptAJAX(deleteDeptID) {
  $.ajax({
    url: './php/deleteDepartmentByID.php',
    type: 'POST',
    dataType: "json",
    data: {
      deleteDeptID: deleteDeptID,
    },

    success: function () {
      location.reload();
    },
    error: function (jqXHR, textStatus, errorThrown) {
      alert(':' + textStatus + ' : ' + errorThrown + ' || Please press F12 to access Network Log for further info');
    },
  });
}

// END OF DEPARTMENT CRUD FUNCTIONS ===========================================================================<><><><>


// START OF LOCATION CRUD FUNCTIONS -----------------------------------------================---------------------->>>><<<<<

function allLocationsTable() {
  $.ajax({
    url: './php/getAllLocations.php',
    dataType: "json",
    success: function (result) {
      var allData = result;
      
      let heading = '<div class="LocationAdminHeader">Location Admin<button class="btn addButton float-end" id="addNewLocation"><i class="fas fa-plus-circle"></i></button></div>';

        let tableStart = '<table id="locationAdminTable" class="table table-striped table-hover">';

        let tBody = "<tbody id='previewTable'></tbody>";

        let tableEnd = "</table>";

        $('#previewData').html(heading + tableStart + tBody + tableEnd);
      
      
      $('#previewData').css("background-color", "#f0f8fe");

      for (var i = 0; i < allData.length; i++) {
        //Table variables

        let name = allData[i]['name'];
        let lID = allData[i]['id'];
        let col1 = "<tr class='clickRowLoc'><td>" + name + "</td>";
        let col2 = "<td class='locationAdminID d-none'>" + lID + "</td>";
        let delBtn = '<td class="deleteLocation"><i class="far fa-trash-alt"></i></td></tr>';

        //Location Table

        $('#previewTable').append(col1 + col2 + delBtn);
      }

      $('.clickRowLoc').click(function () {

        let row = $(this).closest("tr");
        let locationName = row.find("td:eq(0)").text();
        let locationId = row.find("td:eq(1)").text();

        let editLocataionID = '<p class="d-none" id="editLocationID">' + locationId + '</p>';
        let editLocationName = '<input class="form-input" name="editLocationName" id="editLocationName" value="' + locationName + '" required></input><div class="col-sm-5 messages"></div>';
        let saveBtn = '<div><button type="button" onClick="editLocation()" class="btn saveButton">Save</button>';
        let cancelBtn = '<button type="button" class="btn cancelButton" onClick="location.reload()" data-bs-dismiss="modal">Cancel</button></div>';

        $('#previewData').html(editLocataionID + editLocationName + saveBtn + cancelBtn);
      })
      
      $('#addNewLocation').click(function () {

        let newLocationFormStart = '<form autocomplete="off" id="createLocation" name="createLocation" method="post">'
        let newLocationInput = '<div class="mb-3 form-group"><label for="newLocation" class="labels">Enter Location</label><input type="text" class="form-control" id="newLocationForm" name="newLocation" placeholder="New Location" required><div class="col-sm-5 messages"></div></div>';
        let newLocationSave = '<button type="submit" class="btn saveButton">Save</button>';
        let newLocationCancel = '<button type="button" class="btn cancelButton" onClick="location.reload()">Cancel</button>';
        let newLocationFormEnd = '</form>';

        $('#previewData').html(newLocationFormStart + newLocationInput + newLocationSave + newLocationCancel + newLocationFormEnd);

        $('#createLocation').on('submit', function (e) {
          e.preventDefault();
          var locationID = $('#newLocationForm').val();
          newLocationAJAX(locationID);
        })
      });


      $('.deleteLocation').click(function () {
        let row = $(this).closest("tr");
        let deleteLocationID = row.find(".locationAdminID").text();
        //console.log(deleteDeptID);
        deleteLocationAJAX(deleteLocationID);
      })



    },
    error: function (jqXHR, textStatus, errorThrown) {
      alert(':' + textStatus + ' : ' + errorThrown + ' || Please press F12 to access Network Log for further info');
    },
  });
}

function newLocationAJAX(locationID) {
  $.ajax({
    url: './php/insertLocation.php',
    type: 'POST',
    dataType: "json",
    data: {
      createNewLocation: locationID,
    },

    success: function () {
      console.log('recorded')
    },

    error: function (jqXHR, textStatus, errorThrown) {
      alert(':' + textStatus + ' : ' + errorThrown + ' || Please press F12 to access Network Log for further info');
    },
  });
}

function editLocation() {
  let locationId = $('#editLocationID').text();
  let locationName = $('#editLocationName').val();
  editLocationAJAX(locationId, locationName);
}

function editLocationAJAX(locationId, locationName) {
  $.ajax({
    url: './php/editLocation.php',
    type: 'POST',
    dataType: "json",
    data: {
      locationName: locationName,
      locationId: locationId,
    },

    success: function () {
      console.log('worked')
        //location.reload();
    },
    error: function (jqXHR, textStatus, errorThrown) {
      alert(':' + textStatus + ' : ' + errorThrown + ' || Please press F12 to access Network Log for further info');
    },
  });
}

function deleteLocationAJAX(deleteLocationID) {
  $.ajax({
    url: './php/deleteLocationByID.php',
    type: 'POST',
    dataType: "json",
    data: {
      deleteLocationID: deleteLocationID,
    },

    success: function () {
      console.log('work')
    },
    error: function (jqXHR, textStatus, errorThrown) {
      alert(':' + textStatus + ' : ' + errorThrown + ' || Please press F12 to access Network Log for further info');
    },
  });
}



//  -----------------   5 Search Table Headers Desktop ----------------- //

function searchEmail() {
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("searchEmail");
  filter = input.value.toUpperCase();
  table = document.getElementById("allDataTable");
  tr = table.getElementsByTagName("tr");

  //loop for first name

  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[6];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}

function searchLoc() {
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("searchLoc");
  filter = input.value.toUpperCase();
  table = document.getElementById("allDataTable");
  tr = table.getElementsByTagName("tr");

  //loop for first name

  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[5];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}

function searchDept() {
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("searchDept");
  filter = input.value.toUpperCase();
  table = document.getElementById("allDataTable");
  tr = table.getElementsByTagName("tr");

  //loop for first name

  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[4];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}

function searchLast() {
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("searchLast");
  filter = input.value.toUpperCase();
  table = document.getElementById("allDataTable");
  tr = table.getElementsByTagName("tr");

  //loop for first name

  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[3];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}

function searchFirst() {
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("searchFirst");
  filter = input.value.toUpperCase();
  table = document.getElementById("allDataTable");
  tr = table.getElementsByTagName("tr");

  //loop for first name

  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[2];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}

// Sort Functions

function sortTable(n) {
  var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
  table = document.getElementById("allDataTable");
  switching = true;
  //Set the sorting direction to ascending:
  dir = "asc";
  /*Make a loop that will continue until
  no switching has been done:*/
  while (switching) {
    //start by saying: no switching is done:
    switching = false;
    rows = table.rows;
    /*Loop through all table rows (except the
    first, which contains table headers):*/
    for (i = 1; i < (rows.length - 1); i++) {
      //start by saying there should be no switching:
      shouldSwitch = false;
      /*Get the two elements you want to compare,
      one from current row and one from the next:*/
      x = rows[i].getElementsByTagName("TD")[n];
      y = rows[i + 1].getElementsByTagName("TD")[n];
      /*check if the two rows should switch place,
      based on the direction, asc or desc:*/
      if (dir == "asc") {
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          //if so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      } else if (dir == "desc") {
        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
          //if so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      /*If a switch has been marked, make the switch
      and mark that a switch has been done:*/
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      //Each time a switch is done, increase this count by 1:
      switchcount++;
    } else {
      /*If no switching has been done AND the direction is "asc",
      set the direction to "desc" and run the while loop again.*/
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
}