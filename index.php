<!doctype html>
<html>
<head>
  
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">
  
<!-- Bootstrap 5.1 ****************-->
<link href="css/bootstrap.min.css" rel="stylesheet" type="text/css">
<!-- Font-Awesome *************-->
<script src="https://kit.fontawesome.com/979209c926.js" crossorigin="anonymous"></script>
<!-- Animate ******************-->
<link href="css/animate.min.css" rel="stylesheet" type="text/css">
<!-- Our Style ****************-->
<link href="css/theCRMStyle.css" rel="stylesheet" type="text/css">
<!-- Jquery JS ****************-->
<script src="js/jquery-3.6.0.min.js" type="text/javascript"></script>
<!-- UnderScore JS **********  -->
<script src="js/underscore-umd-min.js" type="text/javascript"></script>


<title>User Directory</title>
  <link rel="shortcut icon" type="image/png" href="favicon.ico">

</head>

<body>

<!-- Bootstrap Header/Nav Bar with Search *****************************************************-->
  
<nav class="navbar navbar-expand-lg navbar navbar-dark bg-dark">
      <div class="container-fluid">
        <a class="navbar-brand font-monospace navLogo" href="#">dir</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="#">Company Directory</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#createUserModal" data-bs-toggle="modal" data-bs-target="#createUserModal"><i class="fas fa-user-plus"></i></a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#addLocation" data-bs-toggle="modal" data-bs-target="#addLocation"><i class="fas fa-search-plus"></i></a>
            </li>                
            <li class="nav-item">
              <a class="nav-link" href="#addDepartment" data-bs-toggle="modal" data-bs-target="#addDepartment"><i class="fas fa-folder-plus"></i></a>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false"><i class="fas fa-sliders-h"></i></a>
              <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                <li><a class="dropdown-item" href="#">Action</a></li>
                <li><a class="dropdown-item" href="#">Another action</a></li>
                <li><hr class="dropdown-divider"></li>
                <li><a class="dropdown-item" href="#">Something else here</a></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  
<!-- END of Nav Code -- -- -- -->
  
<!-- Start of Table/Database Display ---->
<div class="container-fluid">
  
  <div class="row">
    <div id="" class="col-8">
      <table id="allDataTable" class="table table-striped table-hover">
        <thead>
          <tr>
            <th scope="col"><i class="fas fa-sort float-start" onClick="sortTable(2)"></i><input onkeyup="searchFirst()" id="searchFirst" class="form-control d-flex colSearch" type="text" placeholder="First"></th>
            <th scope="col"><i class="fas fa-sort float-start" onClick="sortTable(3)"></i><input onkeyup="searchLast()" id="searchLast" class="form-control me-2 d-flex colSearch" type="text" placeholder="Surname"></th>
            <th scope="col"><i class="fas fa-sort float-start" onClick="sortTable(4)"></i><input onkeyup="searchDept()" id="searchDept" class="form-control me-2 d-flex colSearch" type="text" placeholder="Department"></th>
            <th scope="col"><i class="fas fa-sort float-start" onClick="sortTable(5)"></i><input onkeyup="searchLoc()" id="searchLoc" class="form-control me-2 d-flex colSearch" type="text" placeholder="Location"></th>
            <th scope="col"><i class="fas fa-sort float-start" onClick="sortTable(6)"></i><input onkeyup="searchEmail()" id="searchEmail" class="form-control me-2 d-flex colSearch" type="text" placeholder="Email"></th>

        </tr>
      </thead>
      <tbody id="mainTable"></tbody>
    </table>
  </div>
  
  <div id="previewDiv" class="col-4">
    <table class="table">
      <thead>
        <tr>
          <th scope="col">Preview</th>
        </tr>
      </thead>
      <tbody id="previewTable"></tbody>
    </table>
  </div>

</div>
</div>

  
<!----============------ START OF MODALS / CRUD UI FUNCTIONS ---------------------------------------->
      
<!-- Start of Create User Modal *********** -->
      
<div class="modal fade" id="createUserModal" tabindex="-1" aria-labelledby="createUserModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="createUserModalLabel">Create Profile</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        
        <!-- Start of Form // Create Profile Input Group -->
        <form autocomplete="off" id="createProfile" name="createProfile" method="post">
          
        <div class="mb-3 form-group">
          <label for="newFirstName" class="form-label">First name</label>
          <input type="text" class="form-control" id="newFirstName" name="newFirstName" placeholder="First name" required>
          <div class="col-sm-5 messages"></div>
        </div>
        
        <div class="mb-3 form-group">
          <label for="newLastName" class="form-label">Last name</label>
          <input type="text" class="form-control" id="newLastName" name="newLastName" placeholder="Second name" required>
          <div class="col-sm-5 messages"></div>
        </div>
          
        <div class="mb-3 form-group">
          <label for="newEmailAddress" class="form-label">Email address</label>
          <input type="email" class="form-control" id="newEmailAddress" placeholder="name@email.com" name="newEmailAddress" required>
          <div class="col-sm-5 messages"></div>
        </div>

        <div class="mb-3 form-group">  
          <label for="selectDept" class="form-label">Department</label>
          <select class="form-select" aria-label="linkDepartmentSelect" name="selectDept" id="selectDept" required>

          </select>
          <div class="col-sm-5 messages"></div>
        </div>
        
          <!--
        <div class="mb-3 form-group"> 
          <label for="exampleFormControlTextarea1" class="form-label">Comments</label>
          <textarea class="form-control" id="newComment" rows="3" placeholder="Add notes"></textarea>
        </div>
 -->
          
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Exit without saving</button>
        
        <button type="submit" class="btn btn-primary" onClick="insertNewUser()" id="btnSaveNewUser">Save and exit</button>
        
      </div>
          
        </form>
        <!-- End of Form // Create Profile Input Group -->
        
      </div>
      

    </div>
  </div>
</div>
      
<!-- End of Create User Modal ----------------->
      
<!-- Start of Edit User Modal *********** -->
      
<div class="modal fade" id="editUserModal" tabindex="-1" aria-labelledby="editUserModallLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="editUserModalLabel">Edit Profile</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        
        <!-- Start of Form // Edit Profile Input Group -->
        <form id="editProfile" name="editProfile" method="post">
          
        <div class="mb-3 d-none" id="userEditID"></div>
          
        <div class="mb-3 form-group">
          <label for="editFirstName" class="form-label">First name</label>
          <input type="text" class="form-control" id="editFirstName" name="editFirstName" placeholder="First name" value="" required>
          <div class="col-sm-5 messages"></div>
        </div>
        
        <div class="mb-3 form-group">
          <label for="editLastName" class="form-label">Last name</label>
          <input type="text" class="form-control" id="editLastName" name="editLastName" placeholder="Second name" required>
          <div class="col-sm-5 messages"></div>
        </div>

        <div class="mb-3 form-group">
          <label for="editEmailAddress" class="form-label">Email address</label>
          <input type="email" class="form-control" id="editEmailAddress" placeholder="name@email.com" name="editEmailAddress" required>
          <div class="col-sm-5 messages"></div>
        </div>

        <div class="mb-3 form-group">  
          <label for="selectDept" class="form-label">Department</label>
          <select class="form-select" aria-label="editDept" name="editDept" id="editDept" required></select>
          <div class="col-sm-5 messages"></div>
        </div>
          
      <div class="modal-footer">
        
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
        
        <button type="submit" class="btn btn-primary" id="btnEditProfile">Save and exit</button>
        
      </div>
          
        </form>
        <!-- End of Form // Edit Profile Input Group -->
      </div>
    </div>
  </div>
</div>
      
<!-- End of Edit User Modal ----------------->

<!-- Start of Delete User Modal *********** -->
      
<div class="modal fade" id="deleteUserModal" tabindex="-1" aria-labelledby="deleteUserModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="deleteUserModalLabel">Delete Profile</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        ...
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>
      
<!-- End of Delete User Modal ----------------->  

<!-- Start of Add Location Modal *********** -->
      
<div class="modal fade" id="addLocation" tabindex="-1" aria-labelledby="addLocationLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="addLocationLabel">Add Location</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <!-- Start of Form // Create Profile Input Group -->
        <form autocomplete="off" id="createLocation" name="createLocation" method="post">
          
          <div class="mb-3 form-group">
            <label for="newLocation" class="form-label">Enter Location</label>
            <input type="text" class="form-control" id="newLocation" name="newLocation" placeholder="New Location" required>
            <div class="col-sm-5 messages"></div>
          </div>
          
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
            <button type="submit" class="btn btn-primary" id="btnSaveNewLocation">Save and exit</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>
      
<!-- End of Add Location Modal ----------------->
  
<!-- Start of Add Department Modal *********** -->
      
<div class="modal fade" id="addDepartment" tabindex="-1" aria-labelledby="addDepartmentLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="addDepartmentLabel">Add Department</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <form autocomplete="off" id="createDept" name="createDept" method="post">
          
          <div class="mb-3 form-group">
            <label for="newDept" class="form-label">Enter New Department</label>
            <input type="text" class="form-control" id="newDept" name="newDept" placeholder="New Dept" required>
            <div class="col-sm-5 messages"></div>
          </div>
          
        <div class="mb-3 form-group">  
          <label for="editLocationNewDept" class="form-label">Location of Department</label>
          <select class="form-select" aria-label="editLocationNewDept" name="editLocationNewDept" id="editLocationNewDept" required></select>
          <div class="col-sm-5 messages"></div>
        </div>
          
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
            <button type="submit" class="btn btn-primary" id="btnSaveNewDept">Save and exit</button>
          </div>
          
        </form>
    </div>
  </div>
</div>
      
<!-- End of Add Department Modal ----------------->
  

<!-- BootStrap JS *************-->
<script src="js/bootstrap.bundle.min.js" type="text/javascript"></script>

<!-- Validate JS **************-->
<script src="js/validate.min.js" type="text/javascript"></script>

<!-- Our Script ***************-->
<script src="js/theCRMScript.js" type="text/javascript"></script>
  
</body>

</html>