<?php
    $NAME = "schedules.json";
    $HANDLE = fopen($NAME,'r') or die ('CANT OPEN FILE');;
    $DATA = fread($HANDLE,filesize($NAME));
    fclose($HANDLE);
    echo $DATA;
?>
