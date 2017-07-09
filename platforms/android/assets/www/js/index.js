/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
  // Application Constructor
  initialize: function() {
    this.bindEvents();
  },

  bindEvents: function() {
    document.addEventListener('deviceready', onDeviceReady, false);

    function onDeviceReady() {
      document.addEventListener("backbutton", onBackKeyDown, false);
    }

    function onBackKeyDown(val) {
      if (confirm("Are you sure you want to cancel?")) {
        window.history.go(-val);
        localStorage.clear();
      } else {
        //do nothing
      }
    }

    function project() {
      //This function is called when "submit" is pressed in addAVan.html
      this.addNewVan = function() {
        //alert("addNewVan in index.js called");
        var val1 = $('#serialNumber').val();
        var val2 = $('#vehicleNumber').val();
        var val3 = $('#regNumber').val();
        var val4 = $('#keysAvail').val();
        var val5 = $('#reasonAdded').val();
        var val6 = localStorage.getItem("adminPayeNum");


        $.ajax({
          type: "POST",
          url: "http://86.0.13.186:8080/tm470/queries/addNewVan.php",
          data: {
            serialNumber: val1,
            vehicleNumber: val2,
            regNumber: val3,
            keysAvail: val4,
            reasonAdded: val5,
            addedBy: val6
          },
          //dataType: "jsonp",
          success: function(data) {
            var obj = $.parseJSON(data);
            alert(obj["status"]);
            console.log(obj["status"]);
            console.log(obj["data"]);
            plugins.toast.showShortCenter("Success: Van added");
          }
        });
      } // end of function addNewVan

      //Function for returning the vans that have been signed out.
      //Used in the sign a van in process.
      this.getSignedOutVans = function(val) {
        alert("getSignedOutVans in index.js called");
        $.ajax({
          type: "POST",
          url: "http://86.0.13.186:8080/tm470/queries/getVanNumberFromDriverSignVanIn.php",
          data: "staffMember=" + val,
          //dataType: "jsonp",
          success: function(data) {
            var obj = $.parseJSON(data);
            vanNumber = obj[0].vanNumber;
            alert(obj[0].vanNumber);
            $('#vanNumber').val(vanNumber);
          }
        });
      }//end of getSignedOutVans

      //Function for returning the name of the person based on the duty number
      //Used in the sign a PDA in process
      this.getNameFromDutyPdaSignIn = function (val) {
        //alert("getName called" + " " + val);
        $.ajax({
          type: "POST",
          url: "http://86.0.13.186:8080/tm470/queries/getNameFromDutyPdaSignIn.php",
          data: "dutyNumber=" + val,
          //dataType: "jsonp",
          success: function(data) {
            var obj = $.parseJSON(data);
            //alert(obj[0].firstName);
            firstName = obj[0].firstName;
            lastName = obj[0].lastName;
            payeNumber = obj[0].payeNumber;

            full = firstName + " " + lastName + " (" + payeNumber + ")";

            $("#driverNames").val(full);
          }
        });
      }

      //TO DO
      //Function for removing a van from the system
      this.removeVan = function() {
        console.log("Remove van called");
      } //end of removeVan function

      //TO DO
      //Function for searching through the log
      this.searchLog = function() {
        console.log("Search log called");
      } //End of searchLog function

      //FUNCTIONS FOR RETURNING TO HOME SCREENS
      //THESE FUNCTIONS ARE USED BY THE CANCEL AND HOME BUTTONS

      //Function for returning to home screen from the admin screen
      //where you need to go back a directory.
      //Called by the back button on admin/index.html
      this.adminReturnHome = function() {
        document.location.href = "../index.html";
        localStorage.removeItem("adminName");
        console.log(localStorage.getItem("adminName"));
      } // end of adminReturnHome function

      //Function for returning to the admin/index.html page. Called by the Home and Cancel buttons
      this.adminReturn = function() {
        console.log("Return home called");
        if (confirm("Are you sure you want to cancel?")) {
          document.location.href = "index.html";
        } //end if
      } //end of adminReturn

      //Function for returning to home screen from the default index page
      this.returnHome = function() {
        console.log("Return home called");
        if (confirm("Are you sure you want to cancel?")) {
          document.location.href = "index.html";
          this.clearDriverStorage();
        } //end if
      } // end of returnHome function

      //END OF HOME/CANCEL BUTTON FUNCTIONS

      //FUNCTIONS FOR CLEARING LOCAL STORAGE
      //Clears all the local storage during the driver signout process
      this.clearDriverStorage = function() {
        //driverSignOut1.html
        console.log("clearDriverStorage called");
        localStorage.removeItem('driverName');
        localStorage.removeItem('dutyNumber');
        localStorage.removeItem('vanNumber');
        localStorage.removeItem('pdaOneNum');
        localStorage.removeItem('pdaTwoNum');
        localStorage.removeItem('keysTaken');
        localStorage.removeItem('collectionKeys');
        localStorage.removeItem('logBook');

        //driverSignOut2.html
        localStorage.removeItem('pegs');
        localStorage.removeItem('jacket');
        localStorage.removeItem('footwear');
      } //end clearStaffStorage

      //Clears all the local storage set during the pda signing out/in process
      this.clearPdaStorage = function() {
        console.log("clearPdaStorage called");
        localStorage.removeItem('driverName');
        localStorage.removeItem('dutyNumber');
        localStorage.removeItem('pdaOneNum');
        localStorage.removeItem('pegs');
        localStorage.removeItem('jacket');
        localStorage.removeItem('footwear');
      }

      this.clearAdminStorage = function() {

      }
      //END OF FUNCTIONS FOR CLEARING LOCAL STORAGE

      //FUNCTIONS FOR RETRIEVING ALL VAN INFORMATION
      //Get the serial numbers of all vans
      this.getAllVanSerialNumbers = function() {
        console.log("getAllVansSerialNumbers called in index.js");
        var vans;
        $.getJSON("http://86.0.13.186:8080/tm470/queries/getAllVans.php", function(data) {
          $.each(data, function(index, item) {
            vans += "<option value='" + item.serialNumber + "'>" + item.serialNumber + "</option>";
          });
          $('#serialNumber').html(vans);
        });
      } //end of getAllVansSerialNumbers

      //Function for getting all van vehicle numbers
      this.getAllVehicleNumbers = function() {
        console.log("getAllVehicleNumbers called in index.js");
        var vans;
        $.getJSON("http://86.0.13.186:8080/tm470/queries/getAllVans.php", function(data) {
          $.each(data, function(index, item) {
            vans += "<option value='" + item.vehicleNumber + "'>" + item.vehicleNumber + "</option>";
          });
          $('#vehicleNumber').html(vans);
        });
      } // End of getAllVehicleNumbers functions

      //Function for getting all van reg numbers
      this.getAllVanRegNumbers = function() {
        console.log("getAllVanRegNumbers called in index.js");
        var vans;
        $.getJSON("http://86.0.13.186:8080/tm470/queries/getAllVans.php", function(data) {
          $.each(data, function(index, item) {
            vans += "<option value='" + item.regNumber + "'>" + item.regNumber + "</option>";
          });
          $('#regNumber').html(vans);
        });
      } //End of getAllVanRegNumbers
      //END OF VAN INFO FUNCTIONS

    }; //end of project function
    this.project = new project();
  } //end of bindEvents
}; //end of app
app.initialize();
