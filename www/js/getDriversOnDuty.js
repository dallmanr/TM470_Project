function getDriversOnDuty() {
  console.log("getDriversOnDuty in getDriversOnDuty.js called (init)");
  //alert("Get drivers called");
  var drivers;
  $.getJSON("http://localhost:8080/project/test1/driverSignInNamesddl.php", function (data) {
    $.each(data,function(index,item) {
          drivers+="<option value='"+item.payeNumber+"'>" + item.firstName + " " + item.lastName + " " + "(" + item.payeNumber + ")" +"</option>";
          console.log("getDriversOnDuty in getDriversOnDuty.js called (foreach)");
  });
    $('#driverNames').html(drivers);
});
}; //end of getDriversNotOnDuty
