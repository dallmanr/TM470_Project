<?php
  include 'database.php';

  $sql = "SELECT firstName, lastName, payeNumber from projectdb1.dutyDetails INNER JOIN vans ON dutydetails.vanNumber = vans.vehicleNumber
  INNER JOIN staff ON dutydetails.staffMember = staff.payeNumber WHERE DATE(timeIn) IS NULL ORDER BY payeNumber ASC";
  $result = $conn->query($sql);
      if($result -> num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
          echo "<option value='" .$row['payeNumber']."'>" .$row['firstName']. " " . $row['lastName']. " (" .$row['payeNumber'] . ")" ."</option>";
    }
  }
?>
