<?php include 'database.php';

//$date = $_POST['post_date']; //string
//$title = $_POST['post_title']; //string
//$content = $_POST['post_content']; //string

//$date = mysqli_real_escape_string($conn, $_POST['post_date']);
var_dump($_POST);

$staffMember = mysqli_real_escape_string($conn, $_POST['theDriversName']);
$dutyNumber = mysqli_real_escape_string($conn, $_POST['driversDuty']);
$vanNumber = mysqli_real_escape_string($conn, $_POST['signOutVanNumber']);
$firstPdaTaken = mysqli_real_escape_string($conn, $_POST['firstPdaTaken']);
$secondPdaTaken = mysqli_real_escape_string($conn, $_POST['secondPdaTaken']);
$collectionKeysTaken = mysqli_real_escape_string($conn, $_POST['collectionKeys']);
//$logBookTaken = mysqli_real_escape_string($conn, $_POST['logBook']);
$hiVis = mysqli_real_escape_string($conn, $_POST['hivis']);
$footwear = intval(mysqli_real_escape_string($conn, $_POST['footwear']));
$postingPegs = intval(mysqli_real_escape_string($conn, $_POST['pegs']));

$sql = "INSERT INTO dutyDetails (staffMember, duty, pdaOne, pdaTwo, vanNumber, hiVis, footwear, postingPeg)
VALUES ('$staffMember', '$dutyNumber', '$firstPdaTaken', '$secondPdaTaken', '$vanNumber',  '$hiVis', '$footwear', '$postingPegs')";

if ($conn->query($sql) === TRUE) {
    echo 'Success' . '<br>';
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();

?>
