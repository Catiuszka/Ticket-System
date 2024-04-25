<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

$conn = new mysqli('localhost', 'root', '', 'project_x');

if ($conn->connect_errno) {
  die("Connection failed: " . $conn->connect_error);
  exit();
}

$user = $_POST['user'];
$login = $_POST['login'];
$password1 = $_POST['password1'];

$response = array();

$checkUserQuery = "SELECT * FROM users WHERE login='$login'";
$checkUserResult = $conn->query($checkUserQuery);

if ($checkUserResult->num_rows > 0) {
  $response['error'] = "User with this login already exists";
} 

else {
  $insertUserQuery = "UPDATE `users` 
  SET `login`='$login',`password`='$password1'
  WHERE `login` = '$user'";

  if ($conn->query($insertUserQuery) === TRUE) {
    $response['success'] = "New user added successfully";
  } else {
    $response['error'] = "Error adding new user: " . $conn->error;
  }
}

echo json_encode($response);

$conn->close();
?>