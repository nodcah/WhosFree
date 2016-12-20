<?php
    $json = $_POST['scheds'];
    echo $json;
    $file = fopen('schedules.json','w') or die("Unable to open file!");
    fwrite($file, $json);
    fclose($file);
?>
