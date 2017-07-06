//This with authenticate the users, allowing managers/transport office staff to sign in
//and access the admin page of the app.

function authUser() {
  //Test the call to function works
  console.log("authUser in auth.js called");
  var pw = prompt("Please enter your passcode");
  console.log("Entered value " + pw);
  var firstName;
  var lastName;
  var payeNum;
  var pw;

  $.ajax({
    type: "POST",
    url: "http://86.0.13.186:8080/tm470/queries/authUsers.php",
    data: "pw=" + pw,
    //dataType: "jsonp",
    success: function(data) {
      var obj = $.parseJSON(data);
      //alert(obj["data"].firstName);
      firstName = obj["data"].firstName;
      lastName = obj["data"].lastName;
      payeNumber = obj["data"].payeNumber;

      fullName = firstName + " " + lastName + " (" + payeNumber + ")";
      localStorage.setItem("adminName", fullName);
      localStorage.setItem("adminPayeNum", payeNumber);
      document.location.href = "admin/index.html";
      console.log(localStorage.getItem("fullName"));
    }
  });
};

//function getUser() {
  //var adminPayeNum = localStorage.getItem("adminName");
  //console.log("Get user called " + localStorage.getItem("adminName"));
//}
