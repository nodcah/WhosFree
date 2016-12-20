<?php
$myFile = "schedules.json";
$fh = fopen($myFile, 'w') or die("can't open file");
$stringData = $_GET["scheds"];
fwrite($fh, $stringData);
fclose($fh)
?>
