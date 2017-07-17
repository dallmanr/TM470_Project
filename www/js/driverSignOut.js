//Returns a list of all those drivers which do not have a record in the dutyDetails table
//for the current date, that is, they have not been signed out already today
function getStaffNotOnDuty() {
  //alert("Get drivers called");
  var drivers;
  $.getJSON("http://86.0.13.186:8080/tm470/queries/getDriverNamesDriverSignOut.php", function(data) {
    $.each(data, function(index, item) {
      //drivers += "<option value='" + item.firstName + " " + item.lastName + " " + "(" + item.payeNumber + ")"  + "'>" + "</option>";
      drivers += "<option value='" + item.payeNumber + "'>" + item.firstName + " " + item.lastName + " " + "(" + item.payeNumber + ")" +"</option>";
      console.log("Get driver names called driverSignOut.js");
    });
    $('#driverNames').html(drivers);
  });
}; //end of getStaffNotOnDuty

//Returns a list of all those duties which do not have a record in the dutyDetails table
//for the current date, that is, they have not been signed out already today
function getDutiesNotOut() {
  //alert("Get duties called");
  var duties;
  $.getJSON("http://86.0.13.186:8080/tm470/queries/getUnsignedOutDuties.php", function(data) {
    $.each(data, function(index, item) {
      duties += "<option value='" + item.dutyNumber + "'>" + item.dutyNumber + "</option>";
      console.log("Get duty numbers called in driverSignOut.js");
    });
    $('#dutyNumber').html(duties);
  });
}; //end of getDutiesNotOut

//Returns a list of all those vans which do not have a record in the dutyDetails table
//for the current date, that is, they have not been signed out
function getVansNotOut() {
  //alert("Get vans called");
  var vans;
  $.getJSON("http://86.0.13.186:8080/tm470/queries/getUnsignedOutVehicles.php", function(data) {
    $.each(data, function(index, item) {
      vans += "<option value='" + item.vehicleNumber + "'>" + item.vehicleNumber + "</option>";
      console.log("Get van numbers called driverSignOut.js");
    });
    $('#vanNumber').html(vans);
  });
}; //end of getVansNotOut

//Returns a list of all those PDAs which do not have a record in the dutyDetails table
//for the current date, that is, they have not been signed out
function getPdasNotOut() {
  //alert("Get PDAs called");
  var pdas;
  $.getJSON("http://86.0.13.186:8080/tm470/queries/getUnsignedOutPDAs.php", function(data) {
    $.each(data, function(index, item) {
      pdas += "<option value='" + item.pdaNumber + "'>" + item.pdaNumber + "</option>";
      console.log("Get pda numbers called driverSignOut.js");
    });
    $('#firstPdaTaken').html(pdas);
    $('#secondPadTaken').html(pdas);
  });
}; //end of getVansNotOut
