<?php
$sql = "SELECT
    duty
FROM
    dutyDetails
WHERE
    DATE(timeIn) IS NULL";
$result = $conn->query($sql);
//echo 'Duty number: ';
//echo '<select name="dutyNumber">';
if($result -> num_rows > 0) {
  //echo '<option value="">Please select</option>';
  while ($row = $result->fetch_assoc()) {
    //echo "<option value='" .$row['dutyNumber']."'>" .$row['dutyNumber']. "</option>";
    $data[] = $row;
  }
  $myJSON = json_encode($data);
  echo $myJSON;
//echo '</select><br>';
 }
 ?>
