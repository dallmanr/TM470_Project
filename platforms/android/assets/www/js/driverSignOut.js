function getDriversNotOnDuty() {
  //alert("Get drivers called");
  var drivers;
  $.getJSON("http://localhost:8080/project/test1/getDriverNamesCordova.php", function (data) {
    $.each(data,function(index,item) {
          drivers+="<option value='"+item.payeNumber+"'>" + item.firstName + " " + item.lastName + " " + "(" + item.payeNumber + ")" +"</option>";
          console.log("Get driver names worked");
  });
    $('#driverNames').html(drivers);
});
}; //end of getDriversNotOnDuty

//Returns a list of all those duties which do not have a record in the dutyDetails table
//for the current date, that is, they have not been signed out already today
function getDutiesNotOut() {
//alert("Get duties called");
var duties;
$.getJSON("http://localhost:8080/project/test1/dutyNumbers.php", function (data) {
  $.each(data,function(index,item) {
        duties+="<option value='"+item.dutyNumber+"'>" + item.dutyNumber+"</option>";
        console.log("Get duty numbers worked");
});
  $('#dutyNumber').html(duties);
});
}; //end of getDutiesNotOut

//Returns a list of all those vans which do not have a record in the dutyDetails table
//for the current date, that is, they have not been
function getVansNotOut() {
//alert("Get vans called");
var vans;
$.getJSON("http://localhost:8080/project/test1/getVanNumbersSignOut.php", function (data) {
  $.each(data,function(index,item) {
        vans+="<option value='"+item.vehicleNumber+"'>" + item.vehicleNumber+"</option>";
        console.log("Get van numbers worked");
});
  $('#vanNumber').html(vans);
});
}; //end of getVansNotOut
