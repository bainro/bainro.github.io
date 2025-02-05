<?php //index.php
  require_once 'header_no_log_msg.php';

  echo "<br><div style='text-align: center;'><span class='main'>Welcome to $appname,";

  if ($loggedin) header("Location: members.php?view=$user");
  else           echo " please <a href='signup.php'>sign up</a> or <a href='login.php'>log in</a> to join in on the fun.</span></div>";
?>

    </span><br><br>
</div><!--Container Div from header-->

    <script src="https://code.jquery.com/jquery-3.2.1.min.js" integrity="sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4=" crossorigin="anonymous"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>

  </body>
</html>
