<!DOCTYPE html>

<html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Camping Countdown</title>
         <link rel="stylesheet" type="text/css" href="style.css">
         <link href="https://fonts.googleapis.com/css?family=Anton" rel="stylesheet">
    </head>
    <body>
        <?php
               
        (int)$days = $hours = $minutes = $seconds = 0;
        (float)$secs_left = (mktime(0, 0, 0, 7, 17, 2017) - time() + 32400); #32400 is to account for time zone differences between the two functions i believe
        $days = floor($secs_left/(86400));
        $hours = floor(($secs_left % 86400)/3600);
        $minutes = floor((($secs_left % 86400) % 3600) / 60);
        
        echo "<div>";
        echo "<h1> There are $days days, $hours hours, and $minutes minutes left until the SQUAD CAMPING TRIP! </h1>";
        echo "</div>";
        
        ?>
    </body>
</html>
