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

    function onBackKeyDown() {
      if (confirm("Are you sure you want to cancel?")) {
        window.history.go(-1);
        localStorage.clear();
      } else {
        //do nothing
      }
    }

    function project() {
      this.addNewVan = function() {
        alert("addNewVan in index.js called");
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
      }

    }; //end of project function
    this.project = new project();
  } //end of bindEvents
}; //end of app
app.initialize();
