<?php
$sql = "SELECT dutyNumber FROM duty AS a WHERE NOT EXISTS (SELECT duty FROM dutyDetails AS b WHERE a.dutyNumber = b.duty AND DATE(timeIn) IS NULL)  AND activeDuty = 1 ORDER BY dutyNumber ASC";
$result = $conn->query($sql);
echo 'Duty number: ';
echo '<select name="dutyNumber">';
if($result -> num_rows > 0) {
  echo '<option value="">Please select</option>';
  while ($row = $result->fetch_assoc()) {
    echo "<option value='" .$row['dutyNumber']."'>" .$row['dutyNumber']. "</option>";
  }
echo '</select><br>';
 }
 ?>
