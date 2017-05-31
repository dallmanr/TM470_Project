<?php include 'database.php';

//$date = $_POST['post_date']; //string
//$title = $_POST['post_title']; //string
//$content = $_POST['post_content']; //string

//$date = mysqli_real_escape_string($conn, $_POST['post_date']);
$staffMember = mysqli_real_escape_string($conn, $_POST['driverNames']);
$dutyNumber = mysqli_real_escape_string($conn, $_POST['driverDutySignIn']);
$vanNumber = mysqli_real_escape_string($conn, $_POST['vanList']);
$keysReturned = mysqli_real_escape_string($conn, $_POST['driverKeysIn']);
$firstPdaReturned = mysqli_real_escape_string($conn, $_POST['pdaOneReturned']);
$secondPdaReturned = mysqli_real_escape_string($conn, $_POST['pdaTwoReturned']);
$collectionPouchReturned = mysqli_real_escape_string($conn, $_POST['pouchReturned']);
$logBookReturned = mysqli_real_escape_string($conn, $_POST['logBookReturned']);
$collectionDutiesComplete = mysqli_real_escape_string($conn, $_POST['collectionDutiesComplete']);


$sql = "UPDATE dutyDetails
SET
    collectionDutiesCompleted = $collectionDutiesComplete,
    collectionPouchReturned = $collectionPouchReturned,
    pdaOneReturned = $firstPdaReturned,
    pdaTwoReturned = $secondPdaReturned,
    logbookReturned = $logBookReturned,
    keysReturned = $keysReturned
WHERE
    dutyDetails.staffMember = $staffMember
        AND DATE(timeOut) = CURDATE()
        AND duty = $dutyNumber
        AND DATE(timeIn) IS NULL";

if ($conn->query($sql) === TRUE) {
    echo 'Success' . '<br>';
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}


$conn->close();

?>
