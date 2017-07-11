//This is used  for adding a van to the system, which can be done by an admins
//It takes the values entered on the form and posts them to the database
//id="serialNumber", id="vehicleNumber", id="regNumber", id="reason", id="addedBy"

function signAVanIn() {
  alert("signAVanIn.js called in signVanIn.js");
  var val1 = $('#driverNames').val();
  var val2 = $('#vanNumber').val();

  var val3 = $('#collDutiesComp').val();
  var val4 = $('#collPouchReturned').val();
  var val5 = $('#pdasReturned').val();
  var val6 = $('#logBookReturned').val();
  var val7 = $('#keysReturned').val();




  $.ajax({
    type: "POST",
    url: "http://86.0.13.186:8080/tm470/queries/signAVanIn.php",
    data: {
      staffMember: val1,
      vanNumber: val2,
      collDutiesComp: val3,
      collPouch: val4,
      pdasReturned: val5,
      logBook: val6,
      keys: val7
    },
    //dataType: "jsonp",
     success: function(data) {
      var obj = $.parseJSON(data);
      alert(obj["status"]);
      console.log(obj["status"]);
      console.log(obj["data"]);
      plugins.toast.showShortCenter("Success: signed in");
    }
  });
};

function clearForm() {
  console.log("clear form called");
  var elements = addVanForm.elements;
  addVanForm.reset();
}
