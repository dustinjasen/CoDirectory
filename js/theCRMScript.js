$(document).ready(function(e) {
  
  populateDeptOptions();
  populateLocationOptionsMisc();
  populateLocationforDeptOptions();
  
      // These are the constraints used to validate the form
      var constraints = {
        newFirstName: {
          presence: true,
          length: {
            minimum: 3,
            message: "^Enter name greater than 2 letters",
          },
          format: {
            pattern: "[a-z]+",
            message: "can only contain a-z"
          },
        },
        
        newLastName: {
          presence: true,
          length: {
            minimum: 3,
            message: "^Enter name greater than 2 letters",
          },
          format: {
            pattern: "[a-z]+",
            message: "can only contain a-z"
          },
        },
        
        /*
        newMobile: {
          presence: true,
          numericality: {
            onlyInteger: true,
          },
          length: {
            minimum: 7,
            maximum: 12,
            message: "^Please check phone number",
          },
        },
        */
        
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
  
allResults();
  
});


function allResults() {
  $.ajax({
	url: './php/getAll.php',
	dataType: "json",
  type: 'POST',
	success: 
		function(result) {
      
      $('#allDataTable').html('');
      
      var allData = result['data'];
      var pID, firstName, lastName, dept, location, eMail, dID, lID;
      
      var previewID, previewFirstName, previewLastName, previewDept, previewLocation, previewEmail, previewDeptID;
      

      
      
    if ($(Document).width() > 990) {
      
      let tableStart = '<table id="allDataTable" class="table table-striped table-hover col-8">';
        
      let tHeadStart = "<thead><tr>";
      let tHead1 = '<th scope="col" class="col-2"><i style="color: #ff4500" class="fas fa-sort float-start" onClick="sortTable(2)"></i><input onkeyup="searchFirst()" id="searchFirst" class="form-control colSearch" type="text" placeholder="First"></th>';
      let tHead2 = '<th scope="col" class="col-2"><i style="color: #ff4500" class="fas fa-sort float-start" onClick="sortTable(3)"></i><input onkeyup="searchLast()" id="searchLast" class="form-control colSearch" type="text" placeholder="Surname"></th>';
      let tHead3 = '<th scope="col" class="col"><i style="color: #ff4500" class="fas fa-sort float-start" onClick="sortTable(4)"></i><input onkeyup="searchDept()" id="searchDept" class="form-control colSearch" type="text" placeholder="Department"></th>';
      let tHead4 = '<th scope="col" class="col"><i style="color: #ff4500" class="fas fa-sort float-start" onClick="sortTable(5)"></i><input onkeyup="searchLoc()" id="searchLoc" class="form-control colSearch" type="text" placeholder="Location"></th>';
      let tHead5 = '<th scope="col" class="col-2"><i style="color: #ff4500" class="fas fa-sort float-start" onClick="sortTable(6)"></i><input onkeyup="searchEmail()" id="searchEmail" class="form-control colSearch" type="text" placeholder="Email"></th>';
      let tHead6 = '<th scope="col" class="col-1"></th>'
      let tHeadEnd = "</tr></thead>";
      
      let tBody = "<tbody id='mainTable'></tbody>";
      
      let tableEnd = "</table>";
      
      $('#directoryData').html(tableStart+tHeadStart+tHead1+tHead2+tHead3+tHead4+tHead5+tHead6+tHeadEnd+tBody+tableEnd);
 
      for (var i=0; i<allData.length; i++) {
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
        let col1 = "<td class='d-none pID'>"+pID+"</td>";
        let col2 = "<td class='d-none dID'>"+dID+"</td>";
        let col3 = "<td scope='row' class='fName'>"+firstName+"</td>";
        let col4 = "<td scope='row' class='lName'>"+lastName+"</td>";
        let col5 = "<td scope='row' class='deptName'>"+dept+"</td>";
        let col6 = "<td scope='row' class='locationName'>"+location+"</td>";
        let col7 = "<td scope='row' class='eAddress'><a style='color: #D03800;' href='#'>"+eMail+"</a></td>";
        //let editBtn = "<td><a a class='text-primary' data-target='#editUserModal' data-bs-toggle='modal' data-bs-target='#editUserModal'><i class='far fa-edit'></i></a> ";
        let delBtn = "<td><a class='text-danger' onClick='deleteProfile()'><i class='far fa-trash-alt'></i></a></td>"
        let col8 = "<td class='d-none lID'>"+lID+"</td>";
        let trEnd = "</tr>";
        
        $('#mainTable').append(trStart+col1+col2+col3+col4+col5+col6+col7+delBtn+col8+trEnd);
      }
        
         }
      
    else {
        
      let tableStart = '<table id="allDataTable" class="table table-striped table-hover">';
        
      let tBody = "<tbody id='mainTable'></tbody>";
        
      let tableEnd = "</table>";
      
      $('#directoryData').html(tableStart+tBody+tableEnd);
        
      for (var j=0; j<allData.length; j++) {
        let pID = allData[j]['id'];
        let firstName = allData[j]['firstName'];
        let lastName = allData[j]['lastName'];
        let dept = allData[j]['department'];
        let location = allData[j]['location'];
        let eMail = allData[j]['email'];
        let dID = allData[j]['departmentID'];
        let lID = allData[j]['locationID'];
        //Table structure in variables
        
        let trStart = "<tr class='clickRowMobile mobileRows'>";
        //col1 - col5 are hidden and included for data use only
        let col1 = "<td class='d-none pID'>"+pID+"</td>";
        let col2 = "<td class='d-none dID'>"+dID+"</td>";
        let col3 = "<td class='d-none lID'>"+lID+"</td>";
        let col4 = "<td class='locationName d-none'>"+location+"</td>";
        let col5 = "<td class='deptName d-none'>"+dept+"</td>";
        let col6 = "<td scope='row' class='fName'>"+firstName+"</td>";
        let col7 = "<td scope='row' class='lName'>"+lastName+"</td>";
        let col8 = "<td scope='row' class='eAddress'><a style='color: #D03800;' href="+eMail+"><i class='far fa-envelope'></i></a></td>";
                
        let trEnd = "</tr>";
        
        $('#mainTable').append(trStart+col1+col2+col3+col4+col5+col6+col7+col8+trEnd);
      }
}

      
      // Make rows clickable to show preview and populate edit modal 
        $(".clickRow").click(function() {
          $('.previewTable').html("");
          
          
          $('#createProfileDesktop').removeClass('showMe');
          $('#createProfileDesktop').addClass('hideMe');

          $('#editProfileDesktop').removeClass('hideMe');
          $('#editProfileDesktop').addClass('showMe');
          
          var row = $(this).closest("tr");
          
        //Use data already called opposed to invoking another PHP routine & DB call 
          let previewID = row.find(".pID").text();
          let previewFirstName = row.find(".fName").text();
          let previewLastName = row.find(".lName").text();
          let previewDept = row.find(".deptName").text();
          let previewLocation = row.find(".locationName").text();
          let previewEmail = row.find(".eAddress").text();
          let previewDeptID = row.find(".dID").text();
          let previewLocationID = row.find(".lID").text();
          
        //Ready code for edit modal for MOBILE         
          $('#userEditID').html(previewID);
          $('#editFirstName').val(previewFirstName);
          $('#editLastName').val(previewLastName);
          $('#editEmailAddress').val(previewEmail);
          $('#editDept').val(previewDeptID);
          
        //Ready code for edit panel for Desktop         
          $('#userEditIDDesktop').html(previewID);
          $('#editFirstNameDesktop').val(previewFirstName);
          $('#editLastNameDesktop').val(previewLastName);
          $('#editEmailAddressDesktop').val(previewEmail);
          $('#editDeptDesktop').val(previewDeptID);
          
          $('#editLocDesktop').val(previewLocationID);
        
              
        /*Table form for Desktop Edit Profile in variables
          let formStart = "<form id='editProfileDesktop' name='editProfileDesktop' method='post'>";
          let row1 = "<tr><td class='d-none' id='userID'>"+previewID+"</td></tr>";
          let row2 = "<tr><td scope='row'>Edit User</tr></td>";
          let row3 = "<tr><td scope='row'>First Name</td><td><input type='text' class='form-control' id='editFirstNameDesktop' name='editFirstNameDesktop' placeholder='Edit First Name' value='' required><div class='col-sm-5 messages'></div></td></tr>";
          let row4 = "<tr><td scope='row'>Last Name</td><td><input type='text' class='form-control' id='editLastNameDesktop' name='editLastNameDesktop' placeholder='Edit Second Name' value'' required><div class='col-sm-5 messages'></div></td></tr>";
          let row5 = "<tr><td scope='row'>Email</td><td><input type='email' class='form-control' id='editEmailAddressDesktop' name='editEmailAddressDesktop' placeholder='Edit eMail Address' value'' required><div class='col-sm-5 messages'></div></td></tr>";
          let row6 = "<tr><td scope='row'>Department</td><td><select class='form-select' aria-label='editDeptDesktop' name='editDeptDesktop' id='editDeptDesktop' required></select><div class='col-sm-5 messages'></div></td></tr>";
          let row7 = "<tr><td scope='row'>Location</td><td>previewholder</td></tr>";
          
          let editBtn = "<tr><td></td><td><button data-target='#editUserModal' data-bs-toggle='modal' data-bs-target='#editUserModal' class='btn btn-success'><i class='far fa-edit'></i></button> ";
          let delBtn = "<button type='button' class='btn btn-danger' onClick='deleteProfile()'><i class='far fa-trash-alt'></i></button></td></tr>"
          let formEnd = "</form>";
          
        //Preview Table
          //$('.previewDiv').append(formStart+row1+row2+row3+row4+row5+row6+row7+editBtn+delBtn+formEnd);
          
          */
                    
        });      
    },
    error: function(jqXHR, textStatus, errorThrown) {
      alert(':' + textStatus +' : '+ errorThrown +' || Please press F12 to access Network Log for further info');
    },
  });
}

function allLocationsTable() {
	$.ajax({
	url: './php/getAllLocations.php',
	dataType: "json",
	success: 
		function(result) {
      var allData = result;

      $('.locationAdminTable').html('');
      $('.previewTable').html("");
      
      for (var i=0; i<allData.length; i++) {
        //Table variables
        //let lID = allData[i]['id'];
        let name = allData[i]['name'];
        let col1 = "<tr><td>"+name+"</td>";
        let editBtn = '<td><button type="submit" class="btn btn-primary" class="btnEditLocation"><i class="far fa-edit"></i></button></td>';
        let delBtn = '<td><button type="submit" class="btn btn-primary" class="btnDelLocation"><i class="far fa-trash-alt"></i></button></td></tr>';
        
        //Location Table
        $('.locationAdminTable').append(col1+editBtn+delBtn);
        $('.previewTable').append(col1+editBtn+delBtn);
      }
      
    },
    error: function(jqXHR, textStatus, errorThrown) {
      alert(':' + textStatus +' : '+ errorThrown +' || Please press F12 to access Network Log for further info');
    },
  });
}

$('.allLocations').on('click', function(e) {
  allLocationsTable()
})


function allDeptTable() {
	$.ajax({
	url: './php/getAllDepartments.php',
	dataType: "json",
	success: 
		function(result) {
      var allData = result;
                  
      $('.previewTable').html('')
      
      for (var i=0; i<allData.length; i++) {
        let name = allData[i]['name'];
        
        $('.previewTable').append(
          "<tr><td>"+name+"</td></tr>"
        );
      }

    },
    error: function(jqXHR, textStatus, errorThrown) {
      alert(':' + textStatus +' : '+ errorThrown +' || Please press F12 to access Network Log for further info');
    },
  });
}

$('.previewPanelAdminDept').on('click', function(e) {
  allDeptTable()
})




function populateDeptOptions(id, name) {
	$.ajax({
	url: './php/getAllDepartments.php',
	dataType: "json",
	success: 
		function(result) {
      
      var data = result;
      
      var deptDropdownNewUser = $('#selectDept');
      deptDropdownNewUser.empty();
      
      var deptDropdownEditUser = $('#editDept');
      deptDropdownEditUser.empty();
      
      var deptDropdownEditUserDesktop = $('#editDeptDesktop');
      deptDropdownEditUserDesktop.empty();
          
      $.each(data, function (key, value) {
        deptDropdownNewUser.append($('<option value=' + value.id + '>' + value.name +'</option>'));
        deptDropdownEditUser.append($('<option value=' + value.id + '>' + value.name +'</option>'));
        deptDropdownEditUserDesktop.append($('<option value=' + value.id + '>' + value.name +'</option>'));
      });
    },
    error: function(jqXHR, textStatus, errorThrown) {
      alert(':' + textStatus +' : '+ errorThrown +' || Please press F12 to access Network Log for further info');
    },
  });
}

function populateLocationOptionsMisc() {
	$.ajax({
	url: './php/getAllLocations.php',
	dataType: "json",
	success: 
		function(result) {
      
      var data = result;
      
      var locationDropDownUserDesktopEdit = $('#editLocDesktop');
      locationDropDownUserDesktopEdit.empty();
                  
      $.each(data, function (key, value) {
        locationDropDownUserDesktopEdit.append($('<option value=' + value.id + '>' + value.name +'</option>'))
      });
      
    },
    error: function(jqXHR, textStatus, errorThrown) {
      alert(':' + textStatus +' : '+ errorThrown +' || Please press F12 to access Network Log for further info');
    },
  });
}


function populateLocationforDeptOptions() {
	$.ajax({
	url: './php/getAllLocations.php',
	dataType: "json",
	success: 
		function(result) {
      
      var data = result;
      
      var locationNewDept = $('#editLocationNewDept');
      locationNewDept.empty();
                  
      $.each(data, function (key, value) {
        locationNewDept.append($('<option value=' + value.id + '>' + value.name +'</option>'))
      });
      
    },
    error: function(jqXHR, textStatus, errorThrown) {
      alert(':' + textStatus +' : '+ errorThrown +' || Please press F12 to access Network Log for further info');
    },
  });
}


function insertProfile (firstName, lastName, email, departmentId) {
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
    
	success:
    function() {
      allResults();
      $('#createUserModal').modal('hide');

    },
    error: function(jqXHR, textStatus, errorThrown) {
      alert(':' + textStatus +' : '+ errorThrown +' || Please press F12 to access Network Log for further info');
    },
  });
}

function insertNewUser() {
    var firstName = $('#newFirstName').val();
    var lastName = $('#newLastName').val();
    var email = $('#newEmailAddress').val();
    var departmentId = $('#selectDept').val();
    insertProfile (firstName, lastName, email, departmentId);
}

function deleteProfile() {
  var profileID = $('#userID').text();
  deleteProfileAJAX (profileID);
}

function deleteProfileAJAX (profileID) {
	$.ajax({
	url: './php/deleteProfile.php',
  type: 'POST',
	dataType: "json",
  data: {
    profileID: profileID,
        },
    
	success:
    function() {
      allResults();

    },
    error: function(jqXHR, textStatus, errorThrown) {
      alert(':' + textStatus +' : '+ errorThrown +' || Please press F12 to access Network Log for further info');
    },
  });
}

// Edit Profile Mobile/Modal Listener

$('#editProfile').on('submit', function(e) {
  e.preventDefault();  
  var previewID = $('#userEditID').text();
  var previewFirstName = $('#editFirstName').val();
  var previewLastName = $('#editLastName').val();
  var previewEmail = $('#editEmailAddress').val();
  var previewDeptID = $('#editDept').val();
  editProfileAJAX(previewID, previewFirstName, previewLastName, previewDeptID, previewEmail);
});

// Edit Profile Desktop Listener

$('#editProfileDesktop').on('submit', function(e) {
  e.preventDefault();  
  var previewID = $('#userEditIDDesktop').text();
  var previewFirstName = $('#editFirstNameDesktop').val();
  var previewLastName = $('#editLastNameDesktop').val();
  var previewEmail = $('#editEmailAddressDesktop').val();
  var previewDeptID = $('#editDeptDesktop').val();
  editProfileAJAX(previewID, previewFirstName, previewLastName, previewDeptID, previewEmail);
});

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
    departmentId1: previewDept
        },
    
	success:
    function() {
      allResults();
      $('#editUserModal').modal('hide');

    },
    error: function(jqXHR, textStatus, errorThrown) {
      alert(':' + textStatus +' : '+ errorThrown +' || Please press F12 to access Network Log for further info');
    },
  });
}

$('#createLocation').on('submit', function(e) {
  e.preventDefault();  
  var locationID = $('#newLocationForm').val();
  newLocationAJAX(locationID);
})

$('#addUserDesktop').on('click', function() {
  $('.previewTable').html("");
  $('#editProfileDesktop').removeClass('showMe');
  $('#editProfileDesktop').addClass('hideMe');
  $('#createProfileDesktop').removeClass('hideMe');
  $('#createProfileDesktop').addClass('showMe');
})


function newLocationAJAX (locationID) {
	$.ajax({
	url: './php/insertLocation.php',
  type: 'POST',
	dataType: "json",
  data: {
    createNewLocation: locationID,
        },
    
	success:
    function() {
      allResults();
      $('#addLocation').modal('hide');
    },
    
    error: function(jqXHR, textStatus, errorThrown) {
      alert(':' + textStatus +' : '+ errorThrown +' || Please press F12 to access Network Log for further info');
    },
  });
}

$('#createDept').on('submit', function(e) {
  e.preventDefault();  
  var createNewDept = $('#newDept').val();
  var selectLocationforNewDept = $('#editLocationNewDept').val();

  newDeptAJAX(createNewDept, selectLocationforNewDept);
})

function newDeptAJAX (createNewDept, selectLocationforNewDept) {
	$.ajax({
	url: './php/insertDepartment.php',
  type: 'POST',
	dataType: "json",
  data: {
    deptNewName: createNewDept,
    locationOfNewDept: selectLocationforNewDept,
        },
    
	success:
    function() {
      allResults();
      $('#addDepartment').modal('hide');
    },
    
    error: function(jqXHR, textStatus, errorThrown) {
      alert(':' + textStatus +' : '+ errorThrown +' || Please press F12 to access Network Log for further info');
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
          shouldSwitch= true;
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
      switchcount ++;      
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

/*
var xxx = function(xxx) {
	$.ajax({
	url: './php/.php',
	dataType: "json",
  data: {xxx: xxx},
	success: 
		function(result) {
      
          

    },
    error: function(jqXHR, textStatus, errorThrown) {
      alert(':' + textStatus +' : '+ errorThrown +' || Please press F12 to access Network Log for further info');
    },
  });
}

*/