function getSignedOutDuties() {
  //console.log("Get getSignedOutDuties in pdaSign.js  called");
  //alert("Get drivers called");
  var duties;
  $.getJSON("http://86.0.13.186:8080/tm470/queries/getDutyNumberFromPdaSignIn.php", function (data) {
    var obj = $.parseJSON(data);
    if (obj[0] === "success") {
    for (var i = 1; i < obj.length; i++) {
      duties+="<option value='" + obj[i].duty + "'>" + obj[i].duty + "</option>";
      //console.log("getSignedOutDuties for each called");
      }
    }
    $("#dutyNumber").html(duties);
  })
}//end of getSignedOutPdas
