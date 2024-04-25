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
$sql = "SELECT tasks.title, tasks.task_txt, status.status, category.category, tasks.date_create, tasks.date_deadline, tasks.date_update, tasks.date_end
FROM tasks
INNER JOIN category ON tasks.fk_category = category.pk_category
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
