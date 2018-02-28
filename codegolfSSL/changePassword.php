<?
	require("db.php");
	if(isset($_COOKIE["id"]) && isset($_COOKIE['session'])){
		$id=$_COOKIE["id"];
		$pass=$_COOKIE["session"];
		$sql="SELECT id FROM users WHERE id = $id AND pass = \"$pass\"";
		$res=$link->query($sql);
		if(mysqli_num_rows($res)){
			$newPass=password_hash($_POST['pass'], PASSWORD_DEFAULT);
			$sql="UPDATE users SET newHash=\"$newPass\" WHERE id=$id";
			$link->query($sql);
			$newPass=md5($_POST['pass']);
			$sql="UPDATE users SET pass=\"$newPass\" WHERE id=$id";
			$link->query($sql);
			setCookie("id",$id,time()+2592000);
			setCookie("session",$newPass,time()+2592000);
			echo 1;
		}
	}
?>