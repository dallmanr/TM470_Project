//This with authenticate the users, allowing managers/transport office staff to sign in
//and access the admin page of the app.

function authUser() {
  //Test the call to function works
  console.log("authUser in auth.js called");
  var pw = prompt("Please enter your password");
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
      firstName = obj[0].firstName;
      lastName = obj[0].lastName;
      payeNumber = obj[0].payeNumber;

      full = firstName + " " + lastName + " (" + payeNumber + ")";
      localStorage.setItem('adminName', full);
      console.log(localStorage.getItem("adminName"));
      document.location.href = "admin/index.html";
    }
  });
};
