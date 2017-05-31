<?php include 'database.php';

//$date = $_POST['post_date']; //string
//$title = $_POST['post_title']; //string
//$content = $_POST['post_content']; //string

//$date = mysqli_real_escape_string($conn, $_POST['post_date']);
$regNumber = mysqli_real_escape_string($conn, $_POST['newVanRegNumber']);
$vehicleNumber = mysqli_real_escape_string($conn, $_POST['newVanVehicleNumber']);
$serialNumber = mysqli_real_escape_string($conn, $_POST['newVanSerialNumber']);
$numKeys = mysqli_real_escape_string($conn, $_POST['newVanKeys']);
$staffMember = mysqli_real_escape_string($conn, $_POST['newVanAddedBy']);




$sql = "INSERT INTO vans (regNumber, serialNumber, serialNumber, numKeysAvailable, available, active, addedBy)
VALUES ('$regNumber', '$vehicleNumber', '$serialNumber', '$numKeys', 1, 1, '$staffMember')";

if ($conn->query($sql) === TRUE) {
    echo 'Success' . '<br>';
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}


$conn->close();

?>
