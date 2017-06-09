<?php

  $sql = "SELECT firstName, lastName, payeNumber
  FROM staff
  AS a WHERE NOT EXISTS (SELECT staffMember FROM dutyDetails AS b WHERE a.payeNumber = b.staffMember
    AND DATE(timeIn) IS NULL)
    AND currentEmp = 1
    ORDER BY payeNumber ASC";

  $result = $conn->query($sql);

      if($result -> num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
          $data[] = $row;
    }
    $myJSON = json_encode($data);
    echo $myJSON;
  }
?>
