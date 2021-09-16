$(document).ready(function(e) {
  
  populateDeptOptions()
  populateLocationOptions()
  
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
      
      var allData = result['data'];
      var pID, firstName, lastName, dept, location, eMail, dID;
      
      var previewID, previewFirstName, previewLastName, previewDept, previewLocation, previewEmail, previewDeptID;
      
      $('#mainTable').html('')
      
      for (var i=0; i<allData.length; i++) {
        let pID = allData[i]['id'];
        let firstName = allData[i]['firstName'];
        let lastName = allData[i]['lastName'];
        let dept = allData[i]['department'];
        let location = allData[i]['location'];
        let eMail = allData[i]['email'];
        let dID = allData[i]['departmentID'];
        
        $('#mainTable').append(
          "<tr class='clickRow'><td class='d-none pID'>"+pID+"</td><td class='d-none dID'>"+dID+"</td><td scope='row' class='fName'>"+firstName+"</td><td scope='row' class='lName'>"+lastName+"</td><td scope='row' class='deptName'>"+dept+"</td><td scope='row' class='locationName'>"+location+"</td><td scope='row' class='eAddress'><a href='#'>"+eMail+"</a></td></tr>"
        );
      }
      
      /* TEST FUNCTION 
      
      var clickForID = 
        $(".clickRow").click(function() {
          var row = $(this).closest("tr");
          var pID = row.find(".pID").text();
          console.log(pID);
        });
        
      */
      
      var clickForPreview =
        $(".clickRow").click(function() {
          $('#previewTable').html("");
          var row = $(this).closest("tr");
          
          let previewID = row.find(".pID").text();
          let previewFirstName = row.find(".fName").text();
          let previewLastName = row.find(".lName").text();
          let previewDept = row.find(".deptName").text();
          let previewLocation = row.find(".locationName").text();
          let previewEmail = row.find(".eAddress").text();
          let previewDeptID = row.find(".dID").text();
          
        $('#previewTable').append(
          "<tr><td scope='row'><img src='img/avatar100.png' min-height='25vh' alt='...'></td></tr><td class='d-none' id='userID'>"+previewID+"</td><tr><td scope='row'>First Name</td><td>"+previewFirstName+"</td><tr><td scope='row'>Last Name</td><td>"+previewLastName+"</td><tr><td scope='row'>Department</td><td>"+previewDept+"</td></tr><tr><td scope='row'>Location</td><td>"+previewLocation+"</td><tr><td scope='row'>Email</td><td>"+previewEmail+"</td></tr><tr><td><button data-target='#editUserModal' data-bs-toggle='modal' data-bs-target='#editUserModal' class='btn btn-success'>Edit</button> <button type='button' class='btn btn-danger' onClick='deleteProfile()'>Delete</button></td></tr>");
          
          $('#userEditID').html(previewID);
          $('#editFirstName').val(previewFirstName);
          $('#editLastName').val(previewLastName);
          $('#editEmailAddress').val(previewEmail);
          $('#editDept').val(previewDeptID);
          
        });
      
      
      
    },
    error: function(jqXHR, textStatus, errorThrown) {
      alert(':' + textStatus +' : '+ errorThrown +' || Please press F12 to access Network Log for further info');
    },
  });
}

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

              
      $.each(data, function (key, value) {
        deptDropdownNewUser.append($('<option value=' + value.id + '>' + value.name +'</option>'))
        deptDropdownEditUser.append($('<option value=' + value.id + '>' + value.name +'</option>'));
      });
      
      

    },
    error: function(jqXHR, textStatus, errorThrown) {
      alert(':' + textStatus +' : '+ errorThrown +' || Please press F12 to access Network Log for further info');
    },
  });
}

function populateLocationOptions(id, name) {
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

$('#editProfile').on('submit', function(e) {
  e.preventDefault();  
  var previewID = $('#userEditID').text();
  var previewFirstName = $('#editFirstName').val();
  var previewLastName = $('#editLastName').val();
  var previewEmail = $('#editEmailAddress').val();
  var previewDeptID = $('#editDept').val();
  
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
  var locationID = $('#newLocation').val();

  newLocationAJAX(locationID);
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

function searchLoc() {
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("searchLoc");
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

function searchDept() {
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("searchDept");
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

function searchLast() {
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("searchLast");
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

function searchFirst() {
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("searchFirst");
  filter = input.value.toUpperCase();
  table = document.getElementById("allDataTable");
  tr = table.getElementsByTagName("tr");
  
  //loop for first name
  
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[1];
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