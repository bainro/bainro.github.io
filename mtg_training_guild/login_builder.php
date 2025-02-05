<?php
//login_builder.php
require_once 'header_no_log_msg_builder.php';
echo "<div class='main'><h3>Please enter your details to log in</h3>";
$error = $user = $pass = "";

if (isset($_POST['user'])) {
    $user = sanitizeString($_POST['user']);
    $pass = sanitizeString($_POST['pass']);

    if ($user == "" || $pass == "")
        $error = "Not all fields were entered<br>";
    else {
        //create token and salt then pass to query on next line
        $pass2 = $pass . 'kxz*';
        $pass3 = '*Dxp-' . $pass2;
        $token = hash('ripemd128', "$pass3");
        $result = queryMySQL("SELECT user,pass FROM members
        WHERE user='$user' AND pass='$token'");

        if ($result->num_rows == 0) {
            $error = "<span class='error'>Username/Password
                  invalid</span><br><br>";
        } else {
            $_SESSION['user'] = $user;
            echo "<script>window.location='http://rkbain.com/mtg/builder';</script>";        
        }
    }
}

echo <<<_END
    <form method='post' action='login_builder.php'>$error
    <span class='fieldname'>Username</span><input type='text'
      maxlength='16' name='user' value='$user'><br>
    <span class='fieldname'>Password</span><input type='password'
      maxlength='16' name='pass' value='$pass'>
_END;
?>

<br>
<span class='fieldname'>&nbsp;</span>
<input type='submit' value='Login'>
</form><br></div>

<script src="https://code.jquery.com/jquery-3.2.1.min.js" integrity="sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4=" crossorigin="anonymous"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>

</body>
</html>
