<?php
   $json = $_POST['scheds'];

   /* sanity check */
   if (json_decode($json) != null)
   {
     $file = fopen('schedules.json','w+');
     fwrite($file, $json);
     fclose($file);
   }
   else
   {
     // user has posted invalid JSON, handle the error

   }
?>
