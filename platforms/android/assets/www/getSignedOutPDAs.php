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

        if($result -> num_rows > 0) {
          while ($row = $result->fetch_assoc()) {
            $data[] = $row;
      }
      $myJSON = json_encode($data);
      echo $myJSON;
    }
 ?>
