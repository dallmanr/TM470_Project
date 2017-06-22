<?php

$dutyNumber = intval($_POST['dutyNumber']);
echo "<script language='javascript'>alert('getPdaSignInNames.php has been called');</script>";

$sql = "SELECT
    firstName, lastName, payeNumber
FROM
    staff
    INNER JOIN dutyDetails on staff.payeNumber = dutyDetails.staffMember
WHERE
    duty = $dutyNumber";

    $result = $conn->query($sql);

        if($result -> num_rows > 0) {

          while ($row = $result->fetch_assoc()) {
            $data[] = $row;
      }
      $myJSON = json_encode($data);
      echo $myJSON;
    }
?>
