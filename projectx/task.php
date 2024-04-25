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

$title = $_POST['title'];
$description = $_POST['description'];
$category = $_POST['category'];
$deadline = $_POST['deadline'];
$attachment = $_POST['attachment'];
$user = $_POST['user'];

$response = array();

// foreach ($attachments['tmp_name'] as $key => $tmp_name) {
//   $attachment_data = addslashes(file_get_contents($tmp_name)); // Odczytaj zawartość pliku i zapisz jako binarny
//   $attachment_name = addslashes($attachments['name'][$key]);

  $insertUserQuery = "INSERT INTO `tasks`(`fk_user`, `fk_category`, `title`, `task_txt`, `date_end`, `date_deadline`, `fk_status`) 
  VALUES ((SELECT `pk_user` FROM `users` WHERE `login`='$user'), '$category', '$title', '$description', '0000-00-00', '$deadline', 1);";
  if ($conn->query($insertUserQuery) === TRUE) {
  $response['success'] = "New ticket added successfully";
  } else {
    $response['error'] = "Error adding new ticket: " . $conn->error;
  }
// }

echo json_encode($response);

$conn->close();
?>