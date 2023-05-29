<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

session_start();
if (!empty($_SESSION['message'])) {
    $message = $_SESSION['message'];
    echo "<script type='text/javascript'>alert('$message');</script>";
    $_SESSION['message'] = "";
}

$link = mysqli_connect("localhost", "root", "", "react-tasks");
if (!$link) {
    printf("Connect failed: %s\n", mysqli_connect_error());
    exit();
}

$method = $_SERVER['REQUEST_METHOD'];
switch($method) {
    case "GET":
        $sql = "SELECT * FROM tasks";
        $result = $link->query($sql);
        $tasks = array();

        while ($row = $result->fetch_assoc()) {
            $tasks[] = $row;
        }

        header('Content-Type: application/json');
        echo json_encode($tasks);

        $result->free();
        $link->close();
        break;

    case "POST":
        $data = json_decode(file_get_contents('php://input'), true);

        $taskId = $data['id'];
        $isDone = $data['is_done'];

        $updateSql = "UPDATE tasks SET is_done = '$isDone' WHERE id = '$taskId'";
        $updateResult = $link->query($updateSql);

        if ($updateResult) {
            echo json_encode(['success' => true]);
        } else {
            echo json_encode(['success' => false]);
        }

        $link->close();
        break;

    case "PUT":
        $data = json_decode(file_get_contents('php://input'), true);

        $taskName = $data['name'];

        $insertSql = "INSERT INTO tasks (name, is_done) VALUES ('$taskName', 0)";
        $insertResult = $link->query($insertSql);

        if ($insertResult) {
            echo json_encode(['success' => true]);
        } else {
            echo json_encode(['success' => false]);
        }

        $link->close();
        break;
}
?>