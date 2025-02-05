<?php

/*
CREATE TABLE sessions
(
    id varchar(32) NOT NULL,
    access int(10) unsigned,
    data text,
    PRIMARY KEY (id)
);

+--------+------------------+------+-----+---------+-------+
| Field  | Type             | Null | Key | Default | Extra |
+--------+------------------+------+-----+---------+-------+
| id     | varchar(32)      |      | PRI |         |       |
| access | int(10) unsigned | YES  |     | NULL    |       |
| data   | text             | YES  |     | NULL    |       |
+--------+------------------+------+-----+---------+-------+
*/

class FileSessionHandler implements SessionHandlerInterface
{
    function open($save_path, $session_name) {
        global $_sess_db;

        $db_host  = 'localhost';     
        $db_user  = 'pi';   
        $db_pass  = 'Pink3rose';  
    
        if ($_sess_db = mysqli_connect($db_host, $db_user, $db_pass)) {
            mysqli_select_db($_sess_db, 'mtg_cards');
            return TRUE;
        }
    
        return FALSE;
    }

    function close() {
        global $_sess_db;
    
        mysqli_close($_sess_db);
        return TRUE;
    }

    function read($id) {
        global $_sess_db;

        $id = mysqli_real_escape_string($_sess_db, $id);

        $sql = "SELECT data
                FROM   sessions
                WHERE  id = '$id'";

        if ($result = mysqli_query($_sess_db, $sql)) {
            if (mysqli_num_rows($result)) {
                $record = mysqli_fetch_assoc($result);
                return $record['data'];
            }
        }

        return '';
    }

    function write($id, $data) {   
        global $_sess_db;

        $access = time();

        $id = mysqli_real_escape_string($_sess_db, $id);
        $access = mysqli_real_escape_string($_sess_db, $access);
        $data = mysqli_real_escape_string($_sess_db, $data);

        $sql = "REPLACE 
                INTO    sessions
                VALUES  ('$id', '$access', '$data')";

        return mysqli_query($_sess_db, $sql);
    }

    function destroy($id) {
        global $_sess_db;
    
        $id = mysqli_real_escape_string($_sess_db, $id);

        $sql = "DELETE
                FROM   sessions
                WHERE  id = '$id'";
        if (mysqli_query($_sess_db, $sql)) {
            return TRUE;
        }
        else {
            return FALSE;
        }
    }

    function gc($max) {
        global $_sess_db;
    
        $old = time() - $max;
        $old = mysqli_real_escape_string($old);

        $sql = "DELETE
                FROM   sessions
                WHERE  access < '$old'";

        return mysqli_query($_sess_db, $sql);
    }
}

$handler = new FileSessionHandler();
session_set_save_handler($handler, true);

// the following prevents unexpected effects when using objects as save handlers
register_shutdown_function('session_write_close');

?>
