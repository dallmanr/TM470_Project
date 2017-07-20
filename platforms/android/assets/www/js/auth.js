//This with authenticate the users, allowing managers/transport office staff to sign in
//and access the admin page of the app.

function authUser() {
  //Test the call to function works
  ////console.log("authUser in auth.js called");
  var pw = prompt("Please enter your passcode");
  ////console.log("Entered value " + pw);
  var firstName;
  var lastName;
  var fullName;
  var payeNum;
  var pw;

  var url = "http://86.0.13.186:8080/tm470/queries/authUsers.php";

  $.post(url, {
    pw: pw
  }, function (data) {
    var obj = $.parseJSON(data);
    ////console.log(obj.status);
    if (obj.status == "success") {
      ////console.log("status is succes");
      firstName = obj["data"].firstName;
      lastName = obj["data"].lastName;
      payeNumber = obj["data"].payeNumber;
      fullName = firstName + " " + lastName + " (" + payeNumber + ")";

      localStorage.setItem("adminName", fullName);
      localStorage.setItem("adminPayeNum", payeNumber);

      ////console.log(localStorage.getItem("adminName"));

      document.location.href = "admin/adminIndex.html";
      plugins.toast.showShortCenter("Welcome: " + firstName);
    } else if (obj.status === "fail") {
      ////console.log(obj.status + " wrong passcode?");
      plugins.toast.showShortCenter("Error: Check passcode");
    }
  });
};

//function getUser() {
  //var adminPayeNum = localStorage.getItem("adminName");
  ////console.log("Get user called " + localStorage.getItem("adminName"));
//}
