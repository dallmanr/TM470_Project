<?php
$sql = "SELECT
    pdaNumber
FROM
    pda AS a
WHERE
    NOT EXISTS( SELECT
            pdaOne
        FROM
            dutyDetails AS b
        WHERE
            b.pdaOne = a.pdaNumber
                AND DATE(timeIn) IS NULL)
        AND NOT EXISTS( SELECT
            pdaTwo
        FROM
            dutyDetails AS c
        WHERE
            c.pdaTwo = a.pdaNumber
                AND DATE(timeIn) IS NULL)
        AND activePda = 1
ORDER BY pdaNumber ASC;";
$result = $conn->query($sql);

if($result -> num_rows > 0) {
  while ($row = $result-> fetch_assoc()) {
    echo "<option value='" .$row['pdaNumber']."'>" .$row['pdaNumber']. "</option>";
    }
    echo'</select><br>';
  }
?>
