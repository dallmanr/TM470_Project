<?php
  include 'database.php';
  echo "<script language='javascript'>alert('getSignedOutVans.php called');</script>";

    $staffMember = intval($_POST['staffMember']);
    echo "<script language='javascript'>alert('$staffMember');</script>";
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
            $data[] = $row;
      }
      $myJSON = json_encode($data);
      echo $myJSON;
    }
 ?>
