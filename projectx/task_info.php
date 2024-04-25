<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

$conn = new mysqli('localhost', 'root', '', 'project_x');

// Check connection
if ($conn -> connect_errno) {
  die("Connection failed: " . $conn -> connect_error);
  exit();
}

// Fetch data from database
$sql = "SELECT tasks.pk_task, tasks.title, users.login, status.status, tasks.date_create, tasks.date_deadline
FROM tasks
INNER JOIN users ON tasks.fk_user = users.pk_user
INNER JOIN status ON tasks.fk_status = status.pk_status";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
  $rows = array();
  while($row = $result->fetch_assoc()) {
    $rows[] = $row;
  }
  echo json_encode($rows);
} else {
  echo "0 results";
}
$conn->close();
?>
