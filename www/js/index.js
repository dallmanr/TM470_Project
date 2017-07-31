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

    function onBackKeyDown() {
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
      }; // end of function addNewVan

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
            console.log("success");
            $("#regNumber").val("");
            $("#vehicleNumber").val("");
            $("#reason").val("");
            $("#serialNumber").val("");
            plugins.toast.showShortCenter("Success: van removed");
          }
           else {
             plugins.toast.showShortCenter("Error: van not removed");
             //console.log(obj.status);
           }
        });
      };//end of removeVan function


      //FUNCTIONS FOR RETRIEVING ALL VAN INFORMATION
      //Functions are used in the admin pages
      //Moved these functions to getVanDetails.js


      //Function for checking if a duty is collection duty
      //This will hide the element for selecting collection keys on driver sign out 1 of 3
      this.checkIfCollectionDuty = function (val) {
        //console.log("checkIfCollectionDuty in index.js called");
        var url = "http://86.0.13.186:8080/tm470/queries/checkIfCollectionDuty.php";
        var collectionWalk;
        $.post(url, {
          dutyNumber: val
        }, function (data) {
          var obj = $.parseJSON(data);
            collectionWalk = obj[0].collectionsWalk;
            //console.log("Collection walk is " + collectionWalk);
            if (collectionWalk == 0) {
            //console.log("Ready collection walk = " + collectionWalk);
            document.getElementById("collectionDutiesToHide").style.display = "none";
            localStorage.setItem("collectionKeys", 0);
          }
        });
      };//end of checkIfCollectionDuty function

      //DRIVER SIGN IN FUNCTIONS
      //Function for returning the vans that have been signed out.
      //Used in the sign a van in process.
      this.getSignedOutDriverDetails = function(val) {
        //console.log("getSignedOutDriverDetails in index.js called");
        var vanNumber;
        var duty;
        var pdaOne;
        var pdaTwo;

        var url = "http://86.0.13.186:8080/tm470/queries/getDriverSignInDetails.php";
        $.post(url, {
          staffMember: val
        },function(data) {
            var obj = $.parseJSON(data);

            localStorage.setItem("vanNumber", obj[0].vanNumber);
            localStorage.setItem("duty", obj[0].duty);
            localStorage.setItem("pdaOne", obj[0].pdaOne);
            localStorage.setItem("pdaTwo", obj[0].pdaTwo);

            vanNumber = obj[0].vanNumber;
            duty = obj[0].duty;
            pdaOne = obj[0].pdaOne;
            pdaTwo = obj[0].pdaTwo;
            alert(localStorage.getItem("duty"));
            $("#vanNumber").val(vanNumber);
            $("#dutyNumber").val(duty);
            $("#pdaOne").val(pdaOne);
            $("#pdaTwo").val(pdaTwo);

            app.project.checkIfCollectionDuty(localStorage.getItem("dutyNumberDriverSignOut"));
        });
      };//end of getSignedOutVans function


      this.signAVanIn = function () {
        //console.log("signAVanIn in index.js called");
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
          },function(data) {
            var obj =$.parseJSON(data);
            if (obj.status === "success") {
              plugins.toast.showShortCenter("Success: Signed in");
              document.location.href = "index.html";
            }
        });
      };//end of signAVanIn function

      //FUNCTIONS FOR DRIVER SIGN OUT
      //Function for submitting data for the driver to sign out
      this.signAVanOut = function () {
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
        //console.log("Sign a van out in index.js called");
        //console.log("driver name in sign a van out = " + name);
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
            var obj = $.parseJSON(data);
            if (obj.status === "success") {
              plugins.toast.showShortCenter("Success: Signed out");
              document.location.href = "index.html";
            }
            ////console.log(obj[0].status);
        });
      };//end of signAVanOut function

      //Function for returning a van serial based on vehicle number
      //Called by driver sign out 2 -> driver sign out 3
      this.getVanSerial = function() {
        //console.log("getVanSerial called");
        var vehNumber = localStorage.getItem("vanNumberDriverSignOut");
        var serialNumber;
        var url = "http://86.0.13.186:8080/tm470/queries/getAllVans.php";
        $.getJSON(url, function(data) {
          $.each(data, function(index,item) {
            //console.log(item.serialNumber);
            if (item.vehicleNumber === vehNumber) {
              //console.log("van serial found");
              serialNumber = item.serialNumber;
              localStorage.setItem("serialNumber", serialNumber);
              document.getElementById("serialNumTaken").value = serialNumber;
            }
          });
        });
      };//end of getVanSerial

      //Function for returning a van reg based on vehicle number
      //Called by driver sign out 2 -> driver sign out 3
      this.getVanReg = function() {
        //console.log("getVanReg called");
        var vehNumber = localStorage.getItem("vanNumberDriverSignOut");
        var regNumber;
        var url = "http://86.0.13.186:8080/tm470/queries/getAllVans.php";
        $.getJSON(url, function(data) {
          $.each(data, function(index,item) {
            ////console.log(item.vehicleNumber);
            if (item.vehicleNumber === vehNumber) {
              //console.log(item.serialNumber);
              //console.log("van  reg found");
              regNumber = item.regNumber;
              localStorage.setItem("regNumber", regNumber);
              document.getElementById("regNumTaken").value = regNumber;
            }
          });
        });
      };//end of getVanReg

      //FUNCTIONS FOR NON-DRIVERS
      //Function for signing a PDA out
      this.signPdaOut = function (val) {
        var name = localStorage.getItem("driverNamePdaSignOut");
        var duty = localStorage.getItem("dutyNumberPdaSignOut");
        var pdaOne = localStorage.getItem("pdaOneNumPdaSignOut");
        var pegs = localStorage.getItem("pegsPdaSignOut");
        var jacket = localStorage.getItem("jacketPdaSignOut");
        var footwear = localStorage.getItem("footwearPdaSignOut");

        //console.log("SignPdaOut in index.js called");

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
            ////console.log(obj.status);
            plugins.toast.showShortCenter("Success: signed pda out");
              document.location.href = "index.html";
          } else {
            plugins.toast.showShortCenter("Error: PDA not signed out");
            ////console.log(obj.status);
          }
        });
      };//end of signPdaOut function

      //Function for returning the name of the person based on the duty number
      //Used in the sign a PDA in process
      this.getNameFromDutyPdaSignIn = function (val) {
        //alert("getName called" + " " + val);
        var url = "http://86.0.13.186:8080/tm470/queries/getNameFromDutyPdaSignIn.php";
        //console.log("The value is " + val);
        var firstName;
        var lastName;
        var payeNumber;
        var pdaNumber;
        $.post(url, {
          dutyNumber: val
        }, function(data) {
            var obj = $.parseJSON(data);
            //console.log(obj.status);
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
      };//end of getNameFromDutyPdaSignIn function

      this.signPdaIn = function (val) {
        //console.log("signPdaIn in index.js called");
        //console.log(localStorage.getItem("payeNumber"));

        var name = localStorage.getItem("payeNumber");
        var duty = localStorage.getItem("dutyNumber");
        var pdaReturned = localStorage.getItem("pdas");

        var url = "http://86.0.13.186:8080/tm470/queries/signPdaIn.php";

        $.post(url, {
            staffMember: name,
            pdaReturned: pdaReturned,
            duty: duty
          },function (data) {
            var obj = $.parseJSON(data);
            if (obj.status === "success") {
              plugins.toast.showShortCenter("Success: signed pda in");
              document.location.href = "index.html";
            } else {
              plugins.toast.showShortCenter("Error: PDA not signed in");
            }
          });
      };//end of signPdaIn function

      //TO DO
      //Function for searching through the log
      this.searchLog = function() {
              //console.log("Search log called");
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
              }, function (data) {
                var obj = $.parseJSON(data);
                //console.log(obj[0]);
                $.each(obj, function(index, item) {
                    console.log("Staff member found");
                    trHTML += '<tr><td>' + item.theDate + '</td><td>' + item.name + '</td><td>' +
                    item.vanNumber + '</td><td>' + item.timeOut + '</td><td>' +
                    item.timeIn + '</td><td>' + item.hiVis + '</td><td>' + item.footwear +
                    '</td><td>' + item.postingPeg + '</td><td>' + item.collectionDutiesCompleted +
                    '</td></tr>';
                });
                $("#results").append(trHTML);
              });
            }//end of searchLog function

      //FUNCTIONS FOR RETURNING TO HOME SCREENS
      //THESE FUNCTIONS ARE USED BY THE CANCEL AND HOME BUTTONS

      //Function for returning to home screen from the admin screen
      //where you need to go back a directory.
      //Called by the back button on admin/index.html
      this.adminReturnHome = function() {
        document.location.href = "../index.html";
        localStorage.removeItem("adminName");
        ////console.log(localStorage.getItem("adminName"));
      };//end of adminReturnHome function

      //Function for returning to the admin/index.html page. Called by the Home and Cancel buttons
      this.adminReturn = function() {
        //console.log("Return home called");
        if (confirm("Are you sure you want to cancel?")) {
          document.location.href = "adminIndex.html";
        } //end if
      };//end of adminReturn

      //Function for returning to home screen from the default index page
      this.returnHome = function() {
        //console.log("Return home called");
        if (confirm("Are you sure you want to cancel?")) {
          document.location.href = "index.html";
          this.clearDriverStorage();
          this.clearPdaStorage();
        }//end if
      };//end of returnHome function

      //END OF HOME/CANCEL BUTTON FUNCTIONS

      //FUNCTIONS FOR CLEARING LOCAL STORAGE AND FORMS
      //Clears all the local storage during the driver signout process
      this.clearDriverStorage = function() {
        //driverSignOut1.html
        //console.log("clearDriverStorage called");
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

        //driverSignOut2.html
        localStorage.removeItem("pegsDriverSignOut");
        localStorage.removeItem("jacketDriverSignOut");
        localStorage.removeItem("footwearDriverSignOut");
      };//end clearStaffStorage

      //Clears all the local storage set during the pda signing out/in process
      this.clearPdaStorage = function() {
        //console.log("clearPdaStorage called");
        localStorage.removeItem("driverNamePdaSignOut");
        localStorage.removeItem("dutyNumberPdaSignOut");
        localStorage.removeItem("pdaOneNumPdaSignOut");
        localStorage.removeItem("pegsPdaSignOut");
        localStorage.removeItem("jacketPdaSignOut");
        localStorage.removeItem("footwearPdaSignOut");
      };

      this.clearAdminStorage = function() {

      };//end of clearAdminStorage

      this.clearForm = function(val) {
        //console.log("Clear form called");
        document.getElementById(val).reset();
        return false;
      };//end of clearForm
      //END OF FUNCTIONS FOR CLEARING LOCAL STORAGE AND FORMS

    }; //end of project function
    this.project = new project();
  } //end of bindEvents
}; //end of app
app.initialize();
