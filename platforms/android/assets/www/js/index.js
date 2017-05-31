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
    };

    function project() {

      //Returns a list of all those drivers who do not have a record in the dutyDetails table
      //for the current date, that is, they have not signed out already today
      function getDriversNotOnDuty() {
        //alert("Get drivers called");
        var drivers;
        $.getJSON("http://192.168.0.11/project/test1/getDriverNamesCordova.php", function (data) {
          $.each(data,function(index,item) {
                drivers+="<option value='"+item.payeNumber+"'>" + item.firstName + " " + item.lastName + " " + "(" + item.payeNumber + ")" +"</option>";
                console.log("Worked");
        });
          $('#driverNames').html(drivers);
      });
    }; //end of getDriversNotOnDuty

    //Returns a list of all those duties which do not have a record in the dutyDetails table
    //for the current date, that is, they have not been signed out already today
    function getDutiesNotOut() {
      //alert("Get duties called");
      var duties;
      $.getJSON("http://192.168.0.11/project/test1/dutyNumbers.php", function (data) {
        $.each(data,function(index,item) {
              duties+="<option value='"+item.dutyNumber+"'>" + item.dutyNumber+"</option>";
              console.log("Worked");
      });
        $('#dutyNumber').html(duties);
    });
  }; //end of getDutiesNotOut

    //Returns a list of all those vans which do not have a record in the dutyDetails table
    //for the current date, that is, they have not been
    function getVansNotOut() {
      //alert("Get vans called");
      var vans;
      $.getJSON("http://192.168.0.11/project/test1/getVanNumbersSignOut.php", function (data) {
        $.each(data,function(index,item) {
              vans+="<option value='"+item.vehicleNumber+"'>" + item.vehicleNumber+"</option>";
              console.log("Worked");
      });
        $('#vanNumber').html(vans);
    });
  }; //end of getVansNotOut


      getDriversNotOnDuty();
      getDutiesNotOut();
      getVansNotOut();
    }; //end of project function
    this.project = new project();
} //end of bindEvents
}; //end of app
app.initialize();
