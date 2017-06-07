<?php
include 'database.php';

  $sql = "SELECT
    firstName, lastName, payeNumber
FROM
    projectdb1.dutyDetails
        INNER JOIN
    vans ON dutydetails.vanNumber = vans.vehicleNumber
        INNER JOIN
    staff ON dutydetails.staffMember = staff.payeNumber
WHERE
    DATE(timeIn) IS NULL
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
