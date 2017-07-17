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

    function onBackKeyDown(val) {
      this.returnHome();
    }

    function project() {

      //FUNCTIONS FOR THE ADMIN PAGES
      //Function for adding a new van to the system
      //This function is called when "submit" is pressed in addAVan.html
      this.addNewVan = function() {
        //alert("addNewVan in index.js called");
        var val1 = $("#serialNumber").val();
        var val2 = $("#vehicleNumber").val();
        var val3 = $("#regNumber").val();
        var val4 = $("#keysAvail").val();
        var val5 = $("#reasonAdded").val();
        var val6 = localStorage.getItem("adminPayeNum");

        var url = "http://86.0.13.186:8080/tm470/queries/addNewVan.php";
        $.post(url,{
          serialNumber: val1,
          vehicleNumber: val2,
          regNumber: val3,
          keysAvail: val4,
          reasonAdded: val5,
          addedBy: val6
        }, function (data) {
          var obj = $.parseJSON(data);
          if (obj.status === "success") {
            console.log("obj.status is success");
            plugins.toast.showShortCenter("Success: Van added");
            document.getElementById("addVanForm").reset();
          } else {
            plugins.toast.showShortCenter(obj.status);
          }
        });
      } // end of function addNewVan

      //Function for removing a van
      //This function is called by removeAVan.html
      this.removeVan = function (val) {
        //var form = document.getElementById("removeVanForm");
        var regNumber =localStorage.getItem("regNumber");
        var reason = localStorage.getItem("reason");
        var url = "http://86.0.13.186:8080/tm470/queries/removeAVan.php";
        $.post(url, {
          regNumber: regNumber,
          reason: reason
        }, function (data) {
          var obj = $.parseJSON(data);
          if (obj.status === "success") {
            console.log(obj.status);
            plugins.toast.showShortCenter("Success: van removed");
            document.getElementById("removeVanForm").reset();
          }
           else {
             plugins.toast.showShortCenter("Error: van not removed");
             console.log(obj.status);
           }
        });
      }//end of removeVan function


      //FUNCTIONS FOR RETRIEVING ALL VAN INFORMATION
      //Functions are used in the admin pages

      //Get the serial numbers of all vans
      this.getAllVanSerialNumbers = function() {
        console.log("getAllVansSerialNumbers called in index.js");
        var vans;
        $.getJSON("http://86.0.13.186:8080/tm470/queries/getAllVans.php", function(data) {
          $.each(data, function(index, item) {
            vans += "<option value='" + item.serialNumber + "'>" + item.serialNumber + "</option>";
          });
          $("#serialNumber").html(vans);
        });
      } //end of getAllVansSerialNumbers

      this.getVanDetails = function (val) {
        console.log(localStorage.getItem("regNumber"));
        var regNumber = localStorage.getItem("regNumber");
        var vehicleNumber;
        var serialNumber;
        var url = "http://86.0.13.186:8080/tm470/queries/getVanDetails.php";
        $.post(url, {
          regNumber: val
        }, function(data) {
            var obj = $.parseJSON(data);
            console.log("Vehicle number is " + obj[0].vehicleNumber);
            console.log("Serial number number is " + obj[0].serialNumber);
            vehicleNumber = obj[0].vehicleNumber;
            serialNumber = obj[0].serialNumber;
            //alert(obj[0].vanNumber);
            $("#vehicleNumber").val(vehicleNumber);
            $("#serialNumber").val(serialNumber);
        });
      }// end of getVanDetails function

      //Function for getting all van vehicle numbers
      this.getAllVehicleNumbers = function() {
        console.log("getAllVehicleNumbers called in index.js");
        var vans;
        $.getJSON("http://86.0.13.186:8080/tm470/queries/getAllVans.php", function(data) {
          $.each(data, function(index, item) {
            vans += "<option value='" + item.vehicleNumber + "'>" + item.vehicleNumber + "</option>";
          });
          $("#vehicleNumber").html(vans);
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
          $("#regNumber").html(vans);
        });
      } //End of getAllVanRegNumbers
      //END OF VAN INFO FUNCTIONS


      //Function for checking if a duty is collection duty
      //This will hide the element for selecting collection keys on driver sign out 1 of 3
      this.checkIfCollectionDuty = function (val) {
        console.log("checkIfCollectionDuty in index.js called");
        var url = "http://86.0.13.186:8080/tm470/queries/checkIfCollectionDuty.php";
        var collectionWalk;
        $.post(url, {
          dutyNumber: val
        }, function (data){
          var obj = $.parseJSON(data);
          collectionWalk = obj[0].collectionsWalk;
          console.log("Collection walk is " + collectionWalk);
          ready();
        });

        function ready() {
          console.log("Ready called");
          if (collectionWalk == 0) {
            console.log("Ready collection walk = " + collectionWalk);
            document.getElementById("collectionKeysToHide").style.display = "none";
            localStorage.setItem("collectionKeys", 0);
          }
        }
      }//end of checkIfCollectionDuty function

      //DRIVER SIGN IN FUNCTIONS
      //Function for returning the vans that have been signed out.
      //Used in the sign a van in process.
      this.getSignedOutDriverDetails = function(val) {
        console.log("getSignedOutDriverDetails in index.js called");
        var vanNumber;
        var duty;
        var pdaOne;
        var pdaTwo;

        var url = "http://86.0.13.186:8080/tm470/queries/getDriverSignInDetails.php";
        $.post(url, {
          staffMember: val
        },function(data) {
            var obj = $.parseJSON(data);
            console.log("Van number is " + obj[0].vanNumber);
            console.log("Duty number is " + obj[0].duty);
            console.log("PDA one number is " + obj[0].pdaOne);
            console.log("PDa two number is " + obj[0].pdaTwo);
            vanNumber = obj[0].vanNumber;
            duty = obj[0].duty;
            pdaOne = obj[0].pdaOne;
            pdaTwo = obj[0].pdaTwo;
            //alert(obj[0].vanNumber);
            $("#vanNumber").val(vanNumber);
            $("#dutyNumber").val(duty);
            $("#pdaOne").val(pdaOne);
            $("#pdaTwo").val(pdaTwo);
        });
      }//end of getSignedOutVans function


      this.signAVanIn = function () {
        console.log("signAVanIn in index.js called");
        var val1 = localStorage.getItem("driver");
        //var val2 = localStorage.getItem("driver");
        var val3 = localStorage.getItem("completed");
        var val4 = localStorage.getItem("pouch");
        var val5 = localStorage.getItem("pdas");
        var val6 = localStorage.getItem("logbook");
        var val7 = localStorage.getItem("keys");

        var url = "http://86.0.13.186:8080/tm470/queries/signAVanIn.php";

        $.post(url, {
            staffMember: val1,
            collDutiesComp: val3,
            collPouch: val4,
            pdasReturned: val5,
            logbook: val6,
            keysReturned: val7
          },function(data) {
              plugins.toast.showShortCenter("Success: Signed in");
        });
      }//end of signAVanIn function

      //FUNCTIONS FOR DRIVER SIGN OUT
      //Function for submitting data for the driver to sign out
      this.signAVanOut = function () {
        var name = localStorage.getItem("driverName");
        var duty = localStorage.getItem("dutyNumber");
        var keys = localStorage.getItem("keysTaken");
        var vehicleNumber = localStorage.getItem("vanNumber");
        var logbook = localStorage.getItem("logbook");
        var pdaOne = localStorage.getItem("pdaOneNum");
        var pdaTwo = localStorage.getItem("pdaTwoNum");
        var pegs = localStorage.getItem("pegs");
        var jacket = localStorage.getItem("jacket");
        var footwear = localStorage.getItem("footwear");
        console.log("Sign a van out in index.js called");
        console.log("driver name in sign a van out = " + name);
        var url = "http://86.0.13.186:8080/tm470/queries/signAVanOut.php";

        $.post(url, {
            name: name,
            duty: duty,
            vehicleNumber: vehicleNumber,
            logbook: logbook,
            pdaOne: pdaOne,
            pdaTwo: pdaTwo,
            pegs: pegs,
            footwear: footwear,
            jacket: jacket
          }, function(data) {
            //var obj = $.parseJSON(data);
            //console.log(obj[0].status);
            plugins.toast.showShortCenter("Success: Signed out");
        });
      }//end of signVanOut function

      //FUNCTIONS FOR NON-DRIVERS
      //Function for signing a PDA out
      this.signPdaOut = function (val) {
        var name = localStorage.getItem("driverName");
        var duty = localStorage.getItem("dutyNumber");
        var pdaOne = localStorage.getItem("pdaOneNum");
        var pegs = localStorage.getItem("pegs");
        var jacket = localStorage.getItem("jacket");
        var footwear = localStorage.getItem("footwear");

        console.log("SignPdaOut in index.js called");

        var url = "http://86.0.13.186:8080/tm470/queries/signPdaOut.php";

        $.post(url, {
          name: name,
          duty: duty,
          pdaOne: pdaOne,
          pegs: pegs,
          footwear: footwear,
          jacket: jacket
        }, function (data) {
          var obj = $.parseJSON(data);
          if (obj.status === "success") {
            console.log(obj.status);
            plugins.toast.showShortCenter("Success: signed pda out");
            if(confirm("Return home?")) {
              document.location.href = "/index.html";
            } else {
              //do nothing
            }
          } else {
            plugins.toast.showShortCenter("Error: PDA not signed out");
            console.log(obj.status);
          }
        });
      }//end of signPdaOut function

      //Function for returning the name of the person based on the duty number
      //Used in the sign a PDA in process
      this.getNameFromDutyPdaSignIn = function (val) {
        //alert("getName called" + " " + val);
        var url = "http://86.0.13.186:8080/tm470/queries/getNameFromDutyPdaSignIn.php";
        console.log("The value is " + val);
        var firstName;
        var lastName;
        var payeNumber;
        var pdaNumber;
        $.post(url, {
          dutyNumber: val
        }, function(data) {
            var obj = $.parseJSON(data);
            console.log(obj.status);
            //alert(obj[0].firstName);
            firstName = obj["data"].firstName;
            lastName = obj["data"].lastName;
            payeNumber = obj["data"].payeNumber;
            pdaNumber = obj["data"].pdaOne;
            localStorage.setItem("payeNumber", payeNumber);

            full = firstName + " " + lastName + " (" + payeNumber + ")";

            $("#driverNames").val(full);
            $("#pdaNumber").val(pdaNumber);
        });
      }//end of getNameFromDutyPdaSignIn function

      this.signPdaIn = function (val) {
        console.log("signPdaIn in index.js called");
        console.log(localStorage.getItem("payeNumber"));
        var name = localStorage.getItem("payeNumber");
        var duty = localStorage.getItem("dutyNumber");
        var pdaReturned = localStorage.getItem("pdas");

        var url = "http://86.0.13.186:8080/tm470/queries/signPdaIn.php";

        $.post(url, {
            staffMember: name,
            pdaReturned: pdaReturned,
            duty: duty
          },function(data) {
              plugins.toast.showShortCenter("Success: Signed in");
        });
      }//end of signAVanIn function

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

      //FUNCTIONS FOR CLEARING LOCAL STORAGE AND FORMS
      //Clears all the local storage during the driver signout process
      this.clearDriverStorage = function() {
        //driverSignOut1.html
        console.log("clearDriverStorage called");
        localStorage.removeItem("driverName");
        localStorage.removeItem("dutyNumber");
        localStorage.removeItem("vanNumber");
        localStorage.removeItem("pdaOneNum");
        localStorage.removeItem("pdaTwoNum");
        localStorage.removeItem("keysTaken");
        localStorage.removeItem("collectionKeys");
        localStorage.removeItem("logBook");

        //driverSignOut2.html
        localStorage.removeItem("pegs");
        localStorage.removeItem("jacket");
        localStorage.removeItem("footwear");
      } //end clearStaffStorage

      //Clears all the local storage set during the pda signing out/in process
      this.clearPdaStorage = function() {
        console.log("clearPdaStorage called");
        localStorage.removeItem("driverName");
        localStorage.removeItem("dutyNumber");
        localStorage.removeItem("pdaOneNum");
        localStorage.removeItem("pegs");
        localStorage.removeItem("jacket");
        localStorage.removeItem("footwear");
      }

      this.clearAdminStorage = function() {

      }//end of clearAdminStorage

      this.clearForm = function(val) {
        console.log("Clear form called");
        document.getElementById(val).reset();
        return false;
      }//end of clearForm
      //END OF FUNCTIONS FOR CLEARING LOCAL STORAGE AND FORMS

    }; //end of project function
    this.project = new project();
  } //end of bindEvents
}; //end of app
app.initialize();
