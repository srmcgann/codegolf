<?
	require("db.php");
	$id=mysqli_real_escape_string($link,$_GET['id']);
	$sql="SELECT * FROM applets WHERE id=$id";
	$res=$link->query($sql);
	if(mysqli_num_rows($res)){
		$row=mysqli_fetch_assoc($res);
		echo $row['code'];
	}else{
		echo -1;
	}
?>