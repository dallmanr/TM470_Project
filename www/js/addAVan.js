//This is used  for adding a van to the system, which can be done by an admins
//It takes the values entered on the form and posts them to the database
//id="serialNumber", id="vehicleNumber", id="regNumber", id="reason", id="addedBy"

function addNewVan() {
  alert("addNewVan.js called");
  var val1 = $("#serialNumber").val();
  var val2 = $("#vehicleNumber").val();
  var val3 = $("#regNumber").val();
  var val4 = $("#keysAvail").val();
  var val5 = $("#reasonAdded").val();
  var val6 = localStorage.getItem("adminPayeNum");


  $.ajax({
    type: "POST",
    url: "http://86.0.13.186:8080/tm470/queries/addNewVan.php",
    data: {
      serialNumber: val1,
      vehicleNumber: val2,
      regNumber: val3,
      keysAvail: val4,
      reasonAdded: val5,
      addedBy: val6
    },
    //dataType: "jsonp",
    success: function(data) {
      var obj = $.parseJSON(data);
      //alert(obj["status"]);
      //console.log(obj["status"]);
      //console.log(obj["data"]);
      plugins.toast.showShortCenter("Success: Van added");
    }
  });
};

function clearForm() {
  //console.log("clear form called");
  var elements = addVanForm.elements;
  addVanForm.reset();
}