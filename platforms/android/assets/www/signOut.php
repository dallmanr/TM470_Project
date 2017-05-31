<?php include 'database.php';

//$date = $_POST['post_date']; //string
//$title = $_POST['post_title']; //string
//$content = $_POST['post_content']; //string

//$date = mysqli_real_escape_string($conn, $_POST['post_date']);
$staffMember = mysqli_real_escape_string($conn, $_POST['vanOutOneDriverName']);
$dutyNumber = mysqli_real_escape_string($conn, $_POST['dutyNumber']);
$vanNumber = mysqli_real_escape_string($conn, $_POST['signOutVanNumber']);
$keysTaken = mysqli_real_escape_string($conn, $_POST['keysTaken']);
$firstPdaTaken = mysqli_real_escape_string($conn, $_POST['firstPdaTaken']);
$secondPdaTaken = mysqli_real_escape_string($conn, $_POST['secondPadTaken']);
$collectionKeysTaken = mysqli_real_escape_string($conn, $_POST['collectionKeys']);
$logBookTaken = mysqli_real_escape_string($conn, $_POST['logBook']);
$postingPegs = mysqli_real_escape_string($conn, $_POST['postingPegs']);
$hiVis = mysqli_real_escape_string($conn, $_POST['hiVis']);
$footwear = mysqli_real_escape_string($conn, $_POST['footwear']);




//$sql = "INSERT INTO newsposts (post_date, post_title, post_content)
//VALUES (STR_TO_DATE('$date','%d-%m-%Y'), '$title','$content')";

$sql = "INSERT INTO dutyDetails (staffMember, duty, pdaOne, pdaTwo, vanNumber, hiVis, footwear, postingPeg)
VALUES ('$staffMember', '$dutyNumber', '$firstPdaTaken', '$secondPdaTaken', '$vanNumber',  '$hiVis', '$footwear', '$postingPegs')";

//$sql2 = "UPDATE vans
//          SET available = 0
//          WHERE vehicleNumber = $vanNumber";

if ($conn->query($sql) === TRUE) {
    echo 'Success' . '<br>';
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

//if ($conn->query($sql2) === TRUE) {
//    echo 'Success';
//} else {
//    echo "Error: " . $sql2 . "<br>" . $conn->error;
//}

$conn->close();

?>
