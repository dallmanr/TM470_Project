function getDriversOnDuty() {
  console.log("getDriversOnDuty in getDriversOnDuty.js called (init)");
  //alert("Get drivers called");
  var drivers;
  $.getJSON("http://86.0.13.186:8080/tm470/queries/getDriversSignedOut.php", function(data) {
    $.each(data, function(index, item) {
      //drivers += "<option value='" + item.firstName + " " + item.lastName + " " + "(" + item.payeNumber + ")"  + "'>" + "</option>";
      drivers += "<option value='" + item.payeNumber + "'>" + item.firstName + item.lastName + " " + "(" + item.payeNumber + ")" + "</option>";
      console.log("getDriversOnDuty in getDriversOnDuty.js called (foreach)");
    });
    $('#driverNames').html(drivers);
  });
}; //end of getDriversNotOnDuty