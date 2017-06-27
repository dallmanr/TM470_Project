//This with authenticate the users, allowing managers/transport office staff to sign in
//and access the admin page of the app.

function authUser() {
  //Test the call to function works
  console.log("authUser in auth.js called");
  var x = prompt("Please enter your password");
  console.log(x);
  var firstName;
  var lastName;
  var payeNum;
  var pw;

  $.getJSON("http://86.0.13.186:8080/tm470/queries/authUsers.php", function(data) {
    var obj = $.parseJSON(data);
    firstName = obj[0].firstName;
    lastName = obj[0].lastName;
    payeNumber = obj[0].payeNumber;

    full = firstName + " " + lastName + " (" + payeNumber + ")";
    localStorage.setItem('adminName', full);
    console.log("Full name is " + full);
  });
};
