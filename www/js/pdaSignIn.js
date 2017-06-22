function getSignedOutDuties() {
  console.log("Get pdaSign.js getSignedOutDuties called");
  //alert("Get drivers called");
  var duties;
  $.getJSON("http://localhost:8080/project/test1/getPdaInDutyNumbers.php", function (data) {
    $.each(data,function(index,item) {
      duties+="<option value='"+item.dutyNumber+"'>" + item.dutyNumber+"</option>";
      console.log("getSignedOutDuties for each called");
  });
    $('#dutyNumber').html(duties);
});
}; //end of getSignedOutPdas
