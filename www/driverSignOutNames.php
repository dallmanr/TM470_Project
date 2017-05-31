<?php
  include 'database.php';

  $sql = "SELECT firstName, lastName, payeNumber FROM staff AS a WHERE NOT EXISTS (SELECT staffMember FROM dutyDetails AS b WHERE a.payeNumber = b.staffMember AND DATE(timeIn) IS NULL)  AND currentEmp = 1 ORDER BY payeNumber ASC";
  $result = $conn->query($sql);
      echo 'Name: ';
      echo '<select name="vanOutOneDriverName">';
      if($result -> num_rows > 0) {
        echo '<option value="">Please select</option>';
        while ($row = $result->fetch_assoc()) {
          echo "<option value='" .$row['payeNumber']."'>" .$row['firstName']. " " . $row['lastName']. " (" .$row['payeNumber'] . ")" ."</option>";
    }
    echo "</select><br>";
  }
?>
