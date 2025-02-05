<?php // header_no_log_msg.php
  require_once 'functions.php';
  
  session_start();

  echo "<!DOCTYPE html>\n<html><head><meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">";

  $userstr = ' (Guest)';

  if (isset($_SESSION['user']))
  {
    $user     = $_SESSION['user'];
    $loggedin = TRUE;
    $userstr  = " ($user)";
  }
  else $loggedin = FALSE;

  echo "<title>$appname$userstr</title><link rel='stylesheet' " .
       "href='styles.css' type='text/css'>"                     .
       "<meta name='viewport' content='width=device-width, initial-scale=1.0'>" .
       "<link rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css' integrity='sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u' crossorigin='anonymous'>
       <link rel='stylesheet' href='styles.css' type='text/css'>" .
       "</head><body>" .
       "<!--[if lte IE 9]>
            <p class='browserupgrade'>You are using an <strong>outdated</strong> browser. Please <a href='https://browsehappy.com/'>upgrade your browser</a> to improve your experience and security.</p>
        <![endif]-->" .
       "<nav class='navbar navbar-inverse navbar-static-top'>
        <div class='container'>
          <div class='navbar-header'>
            <button type='button' class='navbar-toggle collapsed' data-toggle='collapse' data-target='#bs-example-navbar-collapse-1' aria-expanded='false'>
              <span class='sr-only'>Toggle navigation</span>
              <span class='icon-bar'></span>
              <span class='icon-bar'></span>
              <span class='icon-bar'></span>
            </button>
            <a class='navbar-brand' href='#'>$appname$userstr</a>
          </div>
            <div class='collapse navbar-collapse' id='bs-example-navbar-collapse-1'>";
                
                if ($loggedin)
                {
                  echo "<ul class='nav navbar-nav navbar-right'>
                          <li><a href='members.php?view=$user'>Home</a></li>
                          <li class='dropdown'>
                            <a href='#' class='dropdown-toggle' data-toggle='dropdown' role='button' aria-haspopup='true' aria-expanded='false'>Navigation<span class='caret'></span></a>
                            <ul class='dropdown-menu'>
                              <li><a href='members.php'>Members</a></li>
                              <li><a href='friends.php'>Friends</a></li>
                              <li><a href='messages.php'>Messages</a></li>
                              <li><a href='profile.php'>Edit Profile</a></li>
                            </ul>
                          </li>
                          <li><a href='logout.php'>Log out</a></li>
                        </ul>";
                }
                else
                {
                  echo ("<ul class='nav navbar-nav navbar-right'>
                          <li><a href='login.php'>Log in</a></li>
                          <li><a href='signup.php'>Sign up</a></li>
                        </ul>");
                }


                echo "

            </div>
          </div>
        </nav><div class='container'><div style='text-align:center;'><canvas id='logo' width='624' " .
        "height='96'>$appname</canvas></div><hr>" .
        "<script src='javascript.js'></script>";

?>
