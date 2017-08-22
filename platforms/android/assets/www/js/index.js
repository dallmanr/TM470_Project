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
    document.addEventListener("deviceready", onDeviceReady, false);

    function onDeviceReady() {
      document.addEventListener("backbutton", onBackKeyDown, false);
    }

    //Function for dealing with the Android back button.
    //id is set to the current page displayed in the app. If this page is one of the few in the IF statement
    //it checks if the user wants to cancel their action before returning to index.html
    //Otherwise the back button just returns to previous screen.
    function onBackKeyDown() {
      var id = window.location.pathname;
      if (id === '/android_asset/www/driverSignOut1.html' || id === '/android_asset/www/pdaSignIn.html' || id === '/android_asset/www/pdaSignOut.html' ||
        id === '/android_asset/www/signVanIn.html') {
        if (confirm('Do you want to cancel?')) {
          document.location.href = "index.html";
        }
      } else {
        navigator.app.backHistory();
      }
    }

    function project() {

      //FUNCTIONS FOR THE ADMIN PAGES
      //Function for adding a new van to the system
      //This function is called when "submit" is pressed in addAVan.html
      this.addNewVan = function() {
        //alert("addNewVan in index.js called");
        var serialNumber = $("#serialNumber").val();
        var vehicleNumber = $("#vehicleNumber").val();
        var regNumber = $("#regNumber").val();
        var keysAvail = $("#keysAvail").val();
        var reasonAdded = $("#reasonAdded").val();
        var addedBy = localStorage.getItem("adminPayeNum");

        var url = "http://86.0.13.186:8080/tm470/queries/addNewVan.php";
        $.post(url, {
          serialNumber: serialNumber,
          vehicleNumber: vehicleNumber,
          regNumber: regNumber,
          keysAvail: keysAvail,
          reasonAdded: reasonAdded,
          addedBy: addedBy
        }, function(data) {
          var obj = $.parseJSON(data);
          if (obj.status == "success") {
            console.log(obj.status);
            $("#serialNumber").val("");
            $("#vehicleNumber").val("");
            $("#regNumber").val("");
            $("#keysAvail").val("");
            $("#reasonAdded").val("");

            plugins.toast.showShortCenter("Success: Van added");
          } else {
            plugins.toast.showShortCenter(obj.status);
          }
        });
      } // end of function addNewVan

      //Function for removing a van
      //This function is called by removeAVan.html
      this.removeVan = function(val) {
        //var regNumber = localStorage.getItem("regNumber");
        var reason = localStorage.getItem("reason");
        var vanID = localStorage.getItem("vanID");
        var removedBy = localStorage.getItem("adminPayeNum");
        var url = "http://86.0.13.186:8080/tm470/queries/removeAVan.php";
        $.post(url, {
          vanID: vanID,
          reason: reason,
          removedBy: removedBy
        }, function(data) {
          var obj = $.parseJSON(data);
          if (obj.status == "success") {
            console.log("success");
            $("#regNumber").val("");
            $("#vehicleNumber").val("");
            $("#reason").val("");
            $("#serialNumber").val("");
            plugins.toast.showShortCenter("Success: van removed");
          } else {
            plugins.toast.showShortCenter("Error: van not removed");
          }
        });
      } //end of removeVan function

      //Function for checking if a duty is collection duty
      //This will hide the element for selecting collection keys on driver sign out 1 of 3
      //and driver sign out 3 of 3.
      this.checkIfCollectionDuty = function(val) {
        var url = "http://86.0.13.186:8080/tm470/queries/checkIfCollectionDuty.php";
        var div = document.getElementById("collectionDutiesToHide");
        var collectionWalk;
        $.post(url, {
          dutyNumber: val
        }, function(data) {
          var obj = $.parseJSON(data);
          collectionWalk = obj[0].collectionsWalk;
          if (collectionWalk == 0) {
            div.style.display = "none";
            localStorage.setItem("collCompletedDriverSignIn", "NA");
            localStorage.setItem("pouchDriverSignIn", "NA");
          } else if (collectionWalk == 1 && div.style.display === 'none') {
            div.style.display = 'block';
          }
        });
      } //end of checkIfCollectionDuty function

      //DRIVER SIGN IN FUNCTIONS
      //Function for returning the vans that have been signed out.
      //Used in the sign a van in process.
      //Query looks for all vans that have been signed out that day and timeIn is null
      this.getSignedOutDriverDetails = function(val) {
        var vanNumber;
        var duty;
        var pdaOne;
        var pdaTwo;

        var url = "http://86.0.13.186:8080/tm470/queries/getDriverSignInDetails.php";
        $.post(url, {
          staffMember: val
        }, function(data) {
          var obj = $.parseJSON(data);

          localStorage.setItem("vanNumber", obj[0].vehicleNumber);
          localStorage.setItem("duty", obj[0].duty);
          localStorage.setItem("pdaOne", obj[0].pdaOne);
          localStorage.setItem("pdaTwo", obj[0].pdaTwo);

          vanNumber = obj[0].vehicleNumber;
          duty = obj[0].duty;
          pdaOne = obj[0].pdaOne;
          pdaTwo = obj[0].pdaTwo;
          $("#vanNumber").val(vanNumber);
          $("#dutyNumber").val(duty);
          $("#pdaOne").val(pdaOne);
          $("#pdaTwo").val(pdaTwo);

          app.project.checkIfCollectionDuty(localStorage.getItem("duty"));
        });
      } //end of getSignedOutVans function


      //Function for signing van back in.
      //Called by signVanIn.html when user presses submit
      this.signAVanIn = function() {
        var val1 = localStorage.getItem("nameDriverSignIn");
        //var val2 = localStorage.getItem("driver");
        var val3 = localStorage.getItem("collCompletedDriverSignIn");
        var val4 = localStorage.getItem("pouchDriverSignIn");
        var val5 = localStorage.getItem("pdasDriverSignIn");
        var val6 = localStorage.getItem("logbookDriverSignIn");
        var val7 = localStorage.getItem("keysDriverSignIn");

        var url = "http://86.0.13.186:8080/tm470/queries/signAVanIn.php";

        $.post(url, {
          staffMember: val1,
          collDutiesComp: val3,
          collPouch: val4,
          pdasReturned: val5,
          logbook: val6,
          keysReturned: val7
        }, function(data) {
          var obj = $.parseJSON(data);
          if (obj.status == "success") {
            plugins.toast.showShortCenter("Success: Signed in");
            document.location.href = "index.html";
          }
        });
      } //end of signAVanIn function

      //FUNCTIONS FOR DRIVER SIGN OUT
      //Function for submitting data for the driver to sign out
      this.signAVanOut = function() {
        var name = localStorage.getItem("driverNameDriverSignOut");
        var duty = localStorage.getItem("dutyNumberDriverSignOut");
        var keys = localStorage.getItem("keysTakenDriverSignOut");
        var vehicleNumber = localStorage.getItem("vanNumberDriverSignOut");
        var logbook = localStorage.getItem("logbookDriverSignOut");
        var pdaOne = localStorage.getItem("pdaOneNumDriverSignOut");
        var pdaTwo = localStorage.getItem("pdaTwoNumDriverSignOut");
        var pegs = localStorage.getItem("pegsDriverSignOut");
        var jacket = localStorage.getItem("jacketDriverSignOut");
        var footwear = localStorage.getItem("footwearDriverSignOut");
        var vanID = localStorage.getItem("vanIDDriverSignout");

        var url = "http://86.0.13.186:8080/tm470/queries/signAVanOut.php";

        $.post(url, {
          name: name,
          duty: duty,
          vanID: vanID,
          logbook: logbook,
          pdaOne: pdaOne,
          pdaTwo: pdaTwo,
          pegs: pegs,
          footwear: footwear,
          jacket: jacket
        }, function(data) {
          var obj = $.parseJSON(data);
          if (obj.status === "success") {
            plugins.toast.showShortCenter("Success: Signed out");
            document.location.href = "index.html";
            this.clearDriverStorage();
          }
        });
      } //end of signAVanOut function

      //Function for returning a van serial based on vehicle number
      //Called by driver sign out page 1 onChange event for vehicle number
      //Sets the serial number element on this page and variable used in driver sign out 3 of 3
      this.getVanSerial = function() {
        var vehNumber = localStorage.getItem("vanNumberDriverSignOut");
        var serialNumber;
        var url = "http://86.0.13.186:8080/tm470/queries/getAllVans.php";
        $.getJSON(url, function(data) {
          $.each(data, function(index, item) {
            if (item.vehicleNumber === vehNumber) {
              serialNumber = item.serialNumber;
              localStorage.setItem("vanSerialDriverSignOut", serialNumber);
              document.getElementById("serialNumTaken").value = serialNumber;
            }
          });
        });
      } //end of getVanSerial

      //Function for returning a van reg based on vehicle number
      //Called by driver sign out page 1 onChange event for vehicle number
      //Sets the van reg number element on this page and variable used in driver sign out 3 of 3
      this.getVanReg = function() {

        var vehNumber = localStorage.getItem("vanNumberDriverSignOut");
        var regNumber;
        var url = "http://86.0.13.186:8080/tm470/queries/getAllVans.php";
        $.getJSON(url, function(data) {
          $.each(data, function(index, item) {
            if (item.vehicleNumber === vehNumber) {
              regNumber = item.regNumber;
              localStorage.setItem("vanRegDriverSignOut", regNumber);
              document.getElementById("regNumTaken").value = regNumber;
            }
          });
        });
      } //end of getVanReg

      //When selecting a van number in driverSignout1.html, need to obtain the vanID
      //which is sent to the server so a driver can sign the vehicle out.
      //Called by driver sign out page 1 onChange event for vehicle number
      this.getVanID = function() {
        var vehNumber = localStorage.getItem("vanNumberDriverSignOut");
        var vanID;
        var url = "http://86.0.13.186:8080/tm470/queries/getAllVans.php";
        $.getJSON(url, function(data) {
          $.each(data, function(index, item) {
            if (item.vehicleNumber === vehNumber) {
              vanID = item.vanID;
              localStorage.setItem("vanIDDriverSignout", vanID);
            }
          });
        });
      } //end of getVanID

      //FUNCTIONS FOR NON-DRIVERS
      //Function for signing a PDA out
      this.signPdaOut = function(val) {
        var name = localStorage.getItem("driverNamePdaSignOut");
        var duty = localStorage.getItem("dutyNumberPdaSignOut");
        var pdaOne = localStorage.getItem("pdaOneNumPdaSignOut");
        var pegs = localStorage.getItem("pegsPdaSignOut");
        var jacket = localStorage.getItem("jacketPdaSignOut");
        var footwear = localStorage.getItem("footwearPdaSignOut");

        var url = "http://86.0.13.186:8080/tm470/queries/signPdaOut.php";

        $.post(url, {
          name: name,
          duty: duty,
          pdaOne: pdaOne,
          pegs: pegs,
          footwear: footwear,
          jacket: jacket
        }, function(data) {
          var obj = $.parseJSON(data);
          if (obj.status === "success") {
            plugins.toast.showShortCenter("Success: signed pda out");
            document.location.href = "index.html";
          } else {
            plugins.toast.showShortCenter("Error: PDA not signed out");
          }
        });
      } //end of signPdaOut function

      //Function for returning the name of the person based on the duty number
      //Used in the sign a PDA in process
      this.getNameFromDutyPdaSignIn = function(val) {
        var url = "http://86.0.13.186:8080/tm470/queries/getNameFromDutyPdaSignIn.php";
        var firstName;
        var lastName;
        var payeNumber;
        var pdaNumber;
        $.post(url, {
          dutyNumber: val
        }, function(data) {
          var obj = $.parseJSON(data);

          firstName = obj["data"].firstName;
          lastName = obj["data"].lastName;
          payeNumber = obj["data"].payeNumber;
          pdaNumber = obj["data"].pdaOne;
          localStorage.setItem("payeNumber", payeNumber);

          full = firstName + " " + lastName + " (" + payeNumber + ")";

          $("#driverNames").val(full);
          $("#pdaNumber").val(pdaNumber);
        });
      } //end of getNameFromDutyPdaSignIn function

      //Function for signing a PDA back in
      //Used in pdaSignIn.html when user presses submit
      this.signPdaIn = function(val) {

        var name = localStorage.getItem("payeNumber");
        var duty = localStorage.getItem("dutyNumber");
        var pdaReturned = localStorage.getItem("pdas");

        var url = "http://86.0.13.186:8080/tm470/queries/signPdaIn.php";

        $.post(url, {
          staffMember: name,
          pdaReturned: pdaReturned,
          duty: duty
        }, function(data) {
          var obj = $.parseJSON(data);
          if (obj.status === "success") {
            plugins.toast.showShortCenter("Success: signed pda in");
            document.location.href = "index.html";
          } else {
            plugins.toast.showShortCenter("Error: PDA not signed in");
          }
        });
      } //end of signPdaIn function

      //Function for searching through the log
      //Searches can be made by driver, vehicle number, reg number or serial number
      //By default the search will return results from a year ago to current day, unless specified.
      this.searchLog = function() {
        var url = "http://86.0.13.186:8080/tm470/queries/searchLog.php";
        var payeNum = localStorage.getItem("payeNumLog");
        var vanNumber = localStorage.getItem("vanNumLog");
        var vanReg = localStorage.getItem("vanRegLog");
        var vanSerial = localStorage.getItem("vanSerialLog");
        var dateFrom = localStorage.getItem("dateFrom");
        var dateTo = localStorage.getItem("dateTo");
        var trHTML;
        $.post(url, {
          staffMember: payeNum,
          vanNumber: vanNumber,
          vanReg: vanReg,
          vanSerial: vanSerial,
          dateFrom: dateFrom,
          dateTo: dateTo
        }, function(data) {
          var obj = $.parseJSON(data);
          $.each(obj, function(index, item) {
            trHTML += '<tr><td>' + item.theDate + '</td><td>' + item.name + '</td><td>' +
              item.vehicleNumber + '</td><td>' + item.timeOut + '</td><td>' +
              item.timeIn + '</td><td>' + item.hiVis + '</td><td>' + item.footwear +
              '</td><td>' + item.postingPeg + '</td><td>' + item.collectionDutiesCompleted +
              '</td></tr>';
          });
          $("#results").append(trHTML);
        });
      } //end of searchLog function

      //FUNCTIONS FOR RETURNING TO HOME SCREENS
      //THESE FUNCTIONS ARE USED BY THE CANCEL AND HOME BUTTONS

      //Function for returning to home screen from the admin screen
      //where you need to go back a directory.
      //Called by the Log out button on adminIndex.html
      this.adminLogout = function() {
        if (confirm("Are you sure you want to log out?")) {
          document.location.href = "../index.html";
          localStorage.removeItem("adminName");
        }
      } //end of adminReturnHome function

      //Function for returning to the adminIndex.html page. Called by the Cancel button and backKeyDown
      this.adminReturn = function() {
        if (confirm("Are you sure you want to cancel?")) {
          document.location.href = "adminIndex.html";
        } else {} //end if
      } //end of adminReturn

      //Function for returning to home screen from any of the driver/non-driver processes
      this.returnHome = function() {
        if (confirm("Are you sure you want to cancel?")) {
          document.location.href = "index.html";
          this.clearDriverStorage();
          this.clearPdaStorage();
        } else {} //end if
      } //end of returnHome function

      //END OF HOME/CANCEL BUTTON FUNCTIONS

      //FUNCTIONS FOR CLEARING LOCAL STORAGE AND FORMS
      //Clears all the local storage during the driver signout process
      //Called when a user quits the process or when it is completed.
      this.clearDriverStorage = function() {
        //Variables set during driverSignOut1.html
        localStorage.removeItem("driverNameDriverSignOut");
        localStorage.removeItem("dutyNumberDriverSignOut");
        localStorage.removeItem("vanNumberDriverSignOut");
        localStorage.removeItem("pdaOneNumDriverSignOut");
        localStorage.removeItem("pdaTwoNumDriverSignOut");
        localStorage.removeItem("keysTakenDriverSignOut");
        localStorage.removeItem("collectionKeysDriverSignOut");
        localStorage.removeItem("logbookDriverSignOut");
        localStorage.removeItem("vanSerialDriverSignOut");
        localStorage.removeItem("vanRegDriverSignOut");
        localStorage.removeItem("vanIDDriverSignout");

        //Variables set during driverSignOut2.html
        localStorage.removeItem("pegsDriverSignOut");
        localStorage.removeItem("jacketDriverSignOut");
        localStorage.removeItem("footwearDriverSignOut");

        console.log("Cleared");
      } //end clearStaffStorage

      //Clears all the local storage set during the pda signing out/in process
      this.clearPdaStorage = function() {
        //console.log("clearPdaStorage called");
        localStorage.removeItem("driverNamePdaSignOut");
        localStorage.removeItem("dutyNumberPdaSignOut");
        localStorage.removeItem("pdaOneNumPdaSignOut");
        localStorage.removeItem("pegsPdaSignOut");
        localStorage.removeItem("jacketPdaSignOut");
        localStorage.removeItem("footwearPdaSignOut");
      }
      //END OF FUNCTIONS FOR CLEARING LOCAL STORAGE AND FORMS

    }; //end of project function
    this.project = new project();
  } //end of bindEvents
}; //end of app
app.initialize();
