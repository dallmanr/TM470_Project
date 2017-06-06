function getDriversOnDuty() {
  console.log("Get driver names signed out (1)");
  //alert("Get drivers called");
  var drivers;
  $.getJSON("http://localhost:8080/project/test1/driverSignInNamesCordova.php", function (data) {
    $.each(data,function(index,item) {
          drivers+="<option value='"+item.payeNumber+"'>" + item.firstName + " " + item.lastName + " " + "(" + item.payeNumber + ")" +"</option>";
          console.log("Get driver names signed out (2)");
  });
    $('#driverNames').html(drivers);
});
}; //end of getDriversNotOnDuty
