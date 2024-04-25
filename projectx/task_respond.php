<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

// Połączenie z bazą danych
$conn = new mysqli('localhost', 'root', '', 'project_x');

// Sprawdzenie połączenia
if ($conn->connect_errno) {
  die("Connection failed: " . $conn->connect_error);
  exit();
}

$respond = $_POST['respond'];
$status = $_POST['status'];

$response = array();

$checkUserQuery = "SELECT users.login, tasks.title, tasks.task_txt, tasks.date_deadline, tasks.category, tasks.attachment 
FROM tasks
INNER JOIN users ON tasks.fk_user = users.pk_user
INNER JOIN status ON tasks.fk_status = status.pk_status";
$checkUserResult = $conn->query($checkUserQuery);

if ($checkUserResult->num_rows > 0) {
  $response['error'] = "User with this login already exists";
} 

else {
  $insertUserQuery = "INSERT INTO users (login, password, privileges) VALUES ('$login', '$password', '0')";
  if ($conn->query($insertUserQuery) === TRUE) {
    $response['success'] = "New user added successfully";
  } else {
    $response['error'] = "Error adding new user: " . $conn->error;
  }
}

echo json_encode($response);

$conn->close();
?>