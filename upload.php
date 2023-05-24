<?php
if (isset($_FILES['file'])) {
  $file = $_FILES['file'];
  $name = $file['name'];
  $tmp_name = $file['tmp_name'];
  $size = $file['size'];
  $error = $file['error'];

  // Checking for errors
  if ($error !== UPLOAD_ERR_OK) {
    die('Unknown error');
  }

  // Cheching file size
  if ($size > 100 * 102400 * 102400) { // 100 MB
    die('File is too big (Max 100 MB');
  }

  // Generation unique file name
  $ext = pathinfo($name, PATHINFO_EXTENSION);
  $filename = uniqid() . '.' . $ext;

  // Saveing file on server
  $upload_dir = 'E:/apache2/htdocs/uploads/';
  $upload_file = $upload_dir . $filename;
  move_uploaded_file($tmp_name, $upload_file);

  // Link for file
  $url = 'http://' . $_SERVER['HTTP_HOST'] . '/uploads/' . $filename;
  echo 'File has been successly uploaded: <a href="' . $url . '">' . $url . '</a>';
}
?>
