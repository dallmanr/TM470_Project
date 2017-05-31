<?php
  include 'database.php';

    $staffMember = intval($_POST['staffMember']);
    //echo "<script language='javascript'>alert('$staffMember');</script>";
    $sql = "SELECT
    pdaOne, pdaTwo
FROM
    dutyDetails
        INNER JOIN
    pda ON dutyDetails.pdaOne = pda.pdaNumber
        INNER JOIN
    staff ON dutyDetails.staffMember = staff.payeNumber
WHERE
    staffMember = $staffMember AND DATE(timeIn) IS NULL";

    $result = $conn->query($sql);
    //echo "<script language='javascript'>alert('PDA list is not empty!');</script>";
    if($result -> num_rows > 0) {
      while ($row = $result->fetch_assoc()) {
        $pdaOne = $row['pdaOne'];
        $pdaTwo = $row['pdaTwo'];
        //echo "<script language='javascript'>alert('PDA one is $pdaOne');</script>";
        //echo "<script language='javascript'>alert('PDA two is $pdaTwo');</script>";
        echo "<option value='" .$row['pdaNumber']."'>" .$row['pdaOne']. "</option>";
        echo "<option value='" .$row['pdaNumber']."'>" .$row['pdaTwo']. "</option>";
        }
  } else {
    echo "<script language='javascript'>alert('PDA list is empty!');</script>";
  }

//  $result2 = $conn->query($sql);
  //echo "<script language='javascript'>alert('PDA list is not empty!');</script>";
//  if($result2 -> num_rows > 0) {
//    while ($row = $result2->fetch_assoc()) {
//      echo "<option value='" .$row['pdaTwo']."'>" .$row['pdaTwo']. "</option>";
//      }
//} else {
//  echo "<script language='javascript'>alert('PDA list is empty!');</script>";
//}

 ?>
