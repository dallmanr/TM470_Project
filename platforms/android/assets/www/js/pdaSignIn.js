function getSignedOutDuties() {
  console.log("Get getSignedOutDuties in pdaSign.js  called");
  //alert("Get drivers called");
  var duties;
  $.getJSON("http://localhost:8080/tm470/queries/getDutyNumberFromPdaSignIn.php", function (data) {
    $.each(data,function(index,item) {
      duties+="<option value='"+item.duty+"'>" + item.duty+"</option>";
      console.log("getSignedOutDuties for each called");
  });
    $('#dutyNumber').html(duties);
});
}; //end of getSignedOutPdas
