<?php
  include 'database.php';

    $staffMember = intval($_POST['staffMember']);
    //echo "<script language='javascript'>alert('$staffMember');</script>";
    $sql = "SELECT
    duty
FROM
    dutyDetails
        INNER JOIN
    duty ON dutyDetails.duty = duty.dutyNumber
        INNER JOIN
    staff ON dutyDetails.staffMember = staff.payeNumber
WHERE
    staffMember = $staffMember AND
    DATE (timeOut) = CURDATE() AND
    DATE(timeIn) IS NULL";

    $result = $conn->query($sql);
    //echo "<script language='javascript'>alert('PDA list is not empty!');</script>";
    if($result -> num_rows > 0) {
      while ($row = $result->fetch_assoc()) {
        $duty = $row['duty'];
        //echo "<script language='javascript'>alert('PDA one is $pdaOne');</script>";
        //echo "<script language='javascript'>alert('PDA two is $pdaTwo');</script>";
        echo "<option value='" .$row['duty']."'>" .$row['duty']. "</option>";
        }
  } else {
    echo "<script language='javascript'>alert('PDA list is empty!');</script>";
  }
 ?>
