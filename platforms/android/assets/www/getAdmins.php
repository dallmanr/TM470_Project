<?php include 'database.php';
 //echo "<script language='javascript'>alert('$staffMember');</script>";
 $sql = "SELECT firstName, lastName, payeNumber FROM staff WHERE transportOfficeMember = 1 OR manager = 1 AND currentEmp = 1";

 $result = $conn->query($sql);
 //echo "<script language='javascript'>alert('Get admins called!');</script>";
 if($result -> num_rows > 0) {
   while ($row = $result->fetch_assoc()) {
     echo "<option value='" .$row['payeNumber']."'>" .$row['firstName']. " " . $row['lastName']. " (" .$row['payeNumber'] . ")" ."</option>";
     }
} else {
 echo "<script language='javascript'>alert('Driver list is empty!');</script>";
}

?>
