function getVanDetails(val) {
  ////console.log(localStorage.getItem("regNumber"));
  var regNumber = localStorage.getItem("regNumber");
  var vehicleNumber;
  var serialNumber;
  var url = "http://86.0.13.186:8080/tm470/queries/getVanDetails.php";
  $.post(url, {
    regNumber: val
  }, function(data) {
      var obj = $.parseJSON(data);
      ////console.log("Vehicle number is " + obj[0].vehicleNumber);
      ////console.log("Serial number number is " + obj[0].serialNumber);
      vehicleNumber = obj[0].vehicleNumber;
      serialNumber = obj[0].serialNumber;
      //alert(obj[0].vanNumber);
      $("#vehicleNumber").val(vehicleNumber);
      $("#serialNumber").val(serialNumber);
  });
};// end of getVanDetails function

//Function for getting all van vehicle numbers
//Called by index.html -> view log
function getAllVehicleNumbers() {
  ////console.log("getAllVehicleNumbers called in index.js");
  var vans;
  $.getJSON("http://86.0.13.186:8080/tm470/queries/getAllVans.php", function(data) {
    $.each(data, function(index, item) {
      vans += "<option value='" + item.vehicleNumber + "'>" + item.vehicleNumber + "</option>";
    });
    $("#vanNumber").html(vans);
  });
}; // End of getAllVehicleNumbers functions

//Function for getting all van reg numbers
//Called by index.html -> view log
function getAllVanRegNumbers() {
  ////console.log("getAllVanRegNumbers called in index.js");
  var vans;
  $.getJSON("http://86.0.13.186:8080/tm470/queries/getAllVans.php", function(data) {
    $.each(data, function(index, item) {
      vans += "<option value='" + item.regNumber + "'>" + item.regNumber + "</option>";
    });
    $("#regNumber").html(vans);
  });
}; //End of getAllVanRegNumbers

//Function for returning all van serial numbers
//Called by index.html -> view log
function getAllVanSerialNumbers() {
  //console.log("getAllVansSerialNumbers called in index.js");
  var vans;
  $.getJSON("http://86.0.13.186:8080/tm470/queries/getAllVans.php", function(data) {
    $.each(data, function(index, item) {
      vans += "<option value='" + item.serialNumber + "'>" + item.serialNumber + "</option>";
    });
    $("#serialNumber").html(vans);
  });
}; //end of getAllVansSerialNumbers

//Function for returning a van serial based on vehicle number
//Called by driver sign out 2 -> driver sign out 3
function getVanSerial(val) {
  //console.log("getVanSerial called");
  //var vehNumber = localStorage.getItem("vanNumber");
  var serialNumber;
  var url = "http://86.0.13.186:8080/tm470/queries/getAllVans.php";
  $.getJSON(url, function(data) {
    $.each(data, function(index,item) {
      //console.log(item.vehicleNumber);
      if (item.vehicleNumber === val) {
        ////console.log("van found");
        serialNumber = item.serialNumber;
        localStorage.setItem("serialNumber", serialNumber);
        //document.getElementById("serialNumTaken").value = serialNumber;
      }
    });
  });
};//end of getVanSerial

//Function for returning a van reg based on vehicle number
//Called by driver sign out 2 -> driver sign out 3
function getVanReg(val) {
  //var vehNumber = localStorage.getItem("vanNumber");
  var regNumber;
  var url = "http://86.0.13.186:8080/tm470/queries/getAllVans.php";
  $.getJSON(url, function(data) {
    $.each(data, function(index,item) {
      ////console.log(item.vehicleNumber);
      if (item.vehicleNumber === val) {
        ////console.log("van found");
        regNumber = item.regNumber;
        localStorage.setItem("regNumber", regNumber);
        //document.getElementById("regNumTaken").value = regNumber;
      }
    });
  });
};//end of getVanReg
//END OF VAN INFO FUNCTIONS
