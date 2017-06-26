function getNameFromDuty() {
  console.log("getNameFromDuty in getNameFromDutyPdaSignIn.js called");
  //alert("Get drivers called");
  var duties;
  $.getJSON("http://localhost:8080/tm470/queries/getNameFromDutyPdaSignIn.php", function (data) {
    $.each(data,function(index,item) {
      duties+="<option value='"+item.duty+"'>" + item.duty+"</option>";
      console.log("getNameFromDuty in getNameFromDutyPdaSignIn.js foreach called");
  });
    $('#driverNames').html(duties);
});
}; //end of getSignedOutPdas
