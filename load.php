<?php
    $fHandle = fopen("schedules.json", 'r');
    $DATA = fread($fHandle, filesize("schedules.json"));
    fclose($fHandle);
    echo "\"$DATA\"";
?>
