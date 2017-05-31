<?php include 'database.php'; ?>
<!DOCTYPE html>
<html>
    <head>
        <title>Form test</title>
    </head>
    <body>
      <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.1/css/bootstrap.min.css"/>
      <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css"/>
      <div class="container-fluid">
            <h1>Sign van out</h1>
                <!-- User Information -->
								<form action="signOut.php" method="POST">
                <fieldset>
                  <legend>Sign a van out 1 of 3</legend>
									<?php
                    include 'driverSignOutNames.php';
									 ?>

                <!-- A list of duties for the staff member to select which oen they are -->
								<?php
                  include 'getVanNumbersSignOut.php';
								?>

                <!-- List of vehicle numbers for a driver to select which one they are signing out -->
								<?php
                  include 'dutyNumbers.php';
								?>

                <!-- Number of keys for the van the staff member has taken -->
								Keys taken:
								<select name="keysTaken">
									<option value="one">One</option>
									<option value="two">Two</option>
								</select><br>

                <!-- List of PDAs for the staff member to select for signing out (1st PDA) -->
                PDA: <select name="firstPdaTaken"><option value=""></option><?php include 'pdaNumbers.php';?>
                PDA: <select name="secondPadTaken"><option value=""></option><?php include 'pdaNumbers.php';?>

                Collection keys: <input type="radio" name="collectionKeys" value="1">Yes <input type="radio" name="collectionKeys" value="0">No<br>
                Log book: <input type="radio" name="logBook" value="1">Yes <input type="radio" name="logBook" value="0">No<br>
              </fieldset>

              <fieldset>
                <legend>Sign a van out 2 of 3</legend>
                <!-- The health and safety standards a driver has to adhere to -->
								Posting pegs issued: <input type="radio" name="postingPegs" value="1">Yes <input type="radio" name="postingPegs" value="0">No<br>
								His-vis jacket: <input type="radio" name="hiVis" value="1">Yes <input type="radio" name="hiVis" value="0">No<br>
								Correct footwear: <input type="radio" name="footwear" value="1">Yes <input type="radio" name="footwear" value="0">No<br>
              </fieldset>

							<fieldset>
								<legend>Sign a van out 3 of 3</legend>
                <!-- Summary of information filled out by the staff member, before confirming their action -->
								Name: <input type="text" name="theDriversName"><br>
								Duty number: <input type="text" name="driversDuty"><br>
								Number of keys taken: <input type="text" name="keysCollected"><br>
								Vehicle number: <input type="text" name="vehNumTaken"><br>
								Registration: <input type="text" name="regNumTaken"><br>
								Serial number: <input type="text" name="serialNumTaken"><br>
								Log book: <input type="checkbox" name="logBookCollected"><br>
								PDA 1: <input type="text" name="driverPdaOne"><br>
								PDA 2: <input type="text" name="driverPdaTwo"><br>
								Posting pegs: <input type="checkbox" name="pegsCollected"><br>
								Hi-vis jacket: <input type="checkbox" name="hiVisWorn"><br>
								Footwear: <input type="checkbox" name="footwearWorn"><br>
								Collection keys: <input type="checkbox" name="collectionKeysCollected" value="true"><br>

								<i>I acknowledge the above information is correct</i><br>
								<input type="submit" value="Submit" class="btn">

							</fieldset>
              </form>

              <h1>Sign van in</h1>
              <form action="driverSignIn.php" method="POST">
              <fieldset>
                <legend>Sign a van in</legend>
                <!-- A list of driver names, for a driver to select before signing vehicle out -->

                <script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
                <script>
                function getName(val) {
                  //alert(val);
                  $.ajax({
                    type:"POST",
                    url:"getSignedOutVans.php",
                    data:'staffMember='+val,
                    success: function(data) {
                      $("#van-list").html(data);
                    }
                  });

                  $.ajax({
                    type:"POST",
                    url:"getSignedOutPDAs.php",
                    data:'staffMember='+val,
                    success: function(data) {
                      $("#driverPdaOne").html(data)[0].$pdaOne;
                      $("#driverPdaTwo").html(data)[0].$pdaTwo;
                    }
                  });

                  $.ajax({
                    type:"POST",
                    url:"getDriverSignInDuty.php",
                    data:'staffMember='+val,
                    success: function(data) {
                      $("#driverSignInList").html(data);
                    }
                  });

                }
                </script>

                Name:
                <select name="driverNames" id="driverNames-list" onChange="getName(this.value)" >
                  <option>Please select</option>
                  <?php include "driverSignInNamesddl.php" ?>
                </select><br>

                Duty number:
                <select name="driverDutySignIn" id="driverSignInList">
                  <option></option>
                </select><br>


                 <!-- A list of vans, for the driver to select which one they are returning -->
                 <!--Van number: <input type="text" name="vanSignInNumber" id="signInVanNum" value=""> <br> -->
                 Van number:
                 <select name="vanList" id="van-list">
                   <option value="">Please select</option>
                 </select><br>

                 Keys returned? <input type="checkbox" name="driverKeysIn" value="true"/><br>

                 <!-- Acknowledgement of returning necessary items and completed the required tasks -->
                 Log book returned? <input type="checkbox" name="logBookReturned" value="True"/><br>
                 PDA: <select name="driverPdaOne" id="driverPdaOne"><option value=""></option></select>
                 <input type="checkbox" name="pdaOneReturned" value="True"/><br>

                 PDA: <select name="driverPdaTwo" id="driverPdaTwo"><option value=""></option></select>
                 <input type="checkbox" name="pdaTwoReturned" value="True"/><br>

                 Collection pouch returned? <input type="checkbox" name="pouchReturned" value="True"/><br>

                 Collection duties completed? <input type="checkbox" name="collectionDutiesComplete" value="True"/><br>

                 <input type="submit" value="Submit">
               </fieldset>
               </form>

               <h1>Sign a PDA out</h1>
               <form action="pdaOut.php" method="POST">
               <fieldset>
                 <legend>Sign a PDA out</legend>

                 <!-- List of staff members, for selecting who is signing a PDA out -->
                 Name:
                 <?php
                  include 'driverSignoutNames.php';
                  ?>

              <!-- List of duties for a staff member to select -->
               <?php
                include 'dutyNumbers.php';
               ?>

               <!-- A list of PDAs for the staff member to pick -->
               PDA Number:
               <select name="pdaOnlyOutList" id="pdaOnlyOutList">
                 <option value="">Please select</option>
               <?php
                include 'pdaNumbers.php';
               ?>

               <!-- The health and safety standards a driver has to adhere to -->
               Posting pegs issued: <input type="radio" name="postingPegs" value="1">Yes <input type="radio" name="postingPegs" value="0">No<br>
               His-vis jacket: <input type="radio" name="hiVis" value="1">Yes <input type="radio" name="hiVis" value="0">No<br>
               Correct footwear: <input type="radio" name="footwear" value="1">Yes <input type="radio" name="footwear" value="0">No<br>

                <input type="submit" value="Submit">
              </fieldset>
               </form>

               <h1>Sign a PDA in</h1>
               <form action="pdaIn.php" method="POST">
                 <fieldset>
                   <legend>Sign a PDA in</legend>

                   <!-- List of duties for a  staff member to select -->
                   <?php

                   ?>

                  Name: <input type="text" name="pdaInName" readonly="true"><br>
                   <input type="submit" value="Submit">
                 </fieldset>
               </form>

               <!-- Adding a new van to the system -->
               <h1>Add a van</h1>
               <form action="addAVan.php" method="POST">
                 <fieldset>
                   <legend>Add a new van</legend>
                   Serial number: <input type="text" name="newVanSerialNumber"><br>
                   Vehicle number: <input type="text" name="newVanVehicleNumber"><br>
                   Registration number: <input type="text" name="newVanRegNumber"><br>
                   Number of keys: <select name="newVanKeys" id="newVanKeys"><option>1</option><option>2</option></select><br>
                   Reason for adding: <input type="text" name="newVanReason"><br>
                   Added by: <select name="newVanAddedBy" id="newVanAddedBy">
                     <option value="">Please select</option>
                     <?php
                      include 'getAdmins.php';
                     ?>
                   </select><br>

                    <input type="submit" value="Submit">
                 </fieldset>
               </form>

               <!-- Removing a van from the system, it can take one of the 3 fields on the screen to do so -->
               <h1>Remove a van</h1>
               <form action="removeAvan.php" method="POST">
                 <fieldset>
                   <legend>Remove a van</legend>

                     <!-- Remove van using the serial number -->
                     <?php
                       $sql = "SELECT serialNumber from projectdb1.vans ORDER BY serialNumber ASC";
                       $result = $conn->query($sql);
                           echo 'Serial number: ';
                           echo '<select name="vanSerialRemoval">';
                           if($result -> num_rows > 0) {
                             echo '<option value="">Please select</option>';
                             while ($row = $result->fetch_assoc()) {
                               echo "<option value='" .$row['serialNumber']."'>" .$row['serialNumber'] . "</option>";
                         }
                         echo "</select><br>";
                       }
                      ?>

                      <!-- Remove van using the vehicle number -->
                      <?php
                        $sql = "SELECT vehicleNumber from projectdb1.vans ORDER BY vehicleNumber ASC";
                        $result = $conn->query($sql);
                            echo 'Vehicle number: ';
                            echo '<select name="vanVehicleNumRemoval">';
                            if($result -> num_rows > 0) {
                              echo '<option value="">Please select</option>';
                              while ($row = $result->fetch_assoc()) {
                                echo "<option value='" .$row['vehicleNumber']."'>" .$row['vehicleNumber'] . "</option>";
                          }
                          echo "</select><br>";
                        }
                       ?>

                       <!-- Remove a van using the registration number -->
                       <?php
                         $sql = "SELECT regNumber from projectdb1.vans ORDER BY regNumber ASC";
                         $result = $conn->query($sql);
                             echo 'Registration number: ';
                             echo '<select name="vanRegNumRemoval">';
                             if($result -> num_rows > 0) {
                               echo '<option value="">Please select</option>';
                               while ($row = $result->fetch_assoc()) {
                                 echo "<option value='" .$row['regNumber']."'>" .$row['regNumber'] . "</option>";
                           }
                           echo "</select><br>";
                         }
                        ?>

                    <!-- Enter a reason for removing a van -->
                   Reason for removing: <input type="text" name="newVanReason"><br>

                   <!-- A list of employees who are permitted to remove vehicles. These are either transport office staff or management -->
                   Removed by: <select name="vanRemovedBY" id="vanRemovedBY">
                     <option value="">Please select</option>
                     <?php
                      include 'getAdmins.php';
                     ?>
                   </select><br>
                    <input type="submit" value="Submit">
                 </fieldset>
               </form>

               <h1> View log </h1>
               <form action="viewLog.php" method="POST">
               <fieldset>
                 <legend>View log</legend>
                 Date from: <input type="date" name="dateFrom" id="dateFrom"> Date to: <input type="date" name="dateTo" id="dateTo"> <br>
                 <i>Select item to search below</i><br>
                 Driver name: <input type="text" name="logDriverName" id="logDriverName" placeholder="A drivers name"><br>
                 Van number: <input type="text" name="viewLogVanNumber" id="viewLogVanNumber" placeholder="SW1"><br>
                 Registration number: <input type="text" name="viewLogRegNumber" id="viewLogRegNumber" placeholder="AB12 C34"><br>
                 Serial number: <input type="text" name="viewLogSerialNumber" id="viewLogSerialNumber" placeholder="01"><br>

               <input type="submit" value="Submit">
               </fieldset>
               </form>
             </div>
    </body>
</html>
