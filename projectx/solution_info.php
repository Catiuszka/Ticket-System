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
$sql = "SELECT solutions.pk_solutions, tasks.title, status.status, tasks.date_create, tasks.date_end, users.login, tasks.date_update
FROM tasks
INNER JOIN solutions ON solutions.fk_tasks = tasks.pk_task
INNER JOIN users ON tasks.fk_user = users.pk_user
INNER JOIN status ON solutions.fk_status = status.pk_status";
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
