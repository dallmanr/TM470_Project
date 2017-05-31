<?php
  include 'database.php';

    $staffMember = intval($_POST['staffMember']);
    //echo "<script language='javascript'>alert('$staffMember');</script>";
    $sql = "SELECT
    vanNumber
FROM
    dutyDetails
        INNER JOIN
    vans ON dutydetails.vanNumber = vans.vehicleNumber
        INNER JOIN
    staff ON dutydetails.staffMember = staff.payeNumber
WHERE
    staffMember = $staffMember AND DATE(timeIn) IS NULL";

    $result = $conn->query($sql);
    if($result -> num_rows > 0) {
      while ($row = $result->fetch_assoc()) {
        echo "<option value='" .$row['vanNumber']."'>" .$row['vanNumber']. "</option>";
        }
  } else {
    echo "<script language='javascript'>alert('Driver list is empty!');</script>";
  }

 ?>
