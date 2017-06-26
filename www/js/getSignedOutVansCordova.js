function getSignedOutVans() {
  console.log("Get signed out vans (1)");
  //alert("Get drivers called");
  var vans;
  $.getJSON("http://86.0.13.186:8080/tm470/queries/getSignedOutVans.php", function(data) {
    $.each(data, function(index, item) {
      vans += "<option value='" + item.vanNumber + "'>" + item.vanNumber + "</option>";
      console.log("Get signed out vans (2)");
    });
    $('#vanList').html(drivers);
  });
}; //end of getDriversNotOnDuty
