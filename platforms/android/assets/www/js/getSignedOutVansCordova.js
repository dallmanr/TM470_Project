function getSignedOutVans() {
  console.log("Get signed out vans (1)");
  //alert("Get drivers called");
  var vans;
  $.getJSON("http://localhost:8080/project/test1/getSignedOutVans.php", function (data) {
    $.each(data,function(index,item) {
          vans+="<option value='"+item.vanNumber+"'>" + item.vanNumber +"</option>";
          console.log("Get signed out vans (2)");
  });
    $('#vanList').html(drivers);
});
}; //end of getDriversNotOnDuty
