<?php

header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Origin: http://localhost:4200");

include ('../shared/init.php');

$user=$_POST['username'];
$userArr = explode('@', $user);
$user = $userArr[0];
$pass=$_POST['password'];

$q="
	SELECT
		sys_user.*

	FROM
		sys_user

	WHERE
		(MD5(sys_user.Email)='".md5($user.'@lenovo.com')."' OR
		MD5(sys_user.Email)='".md5($user.'@Lenovo.com')."') AND
		sys_user.Pass='".md5($pass)."'
";


function sanitize_query($string) {
	global $connect;

	$search = array(
		'@<script[^>]*?>.*?</script>@si',
		'@<[\/\!]*?[^<>]*?>@si',
		'@<style[^>]*?>.*?</style>@siU'
	);

	$string = preg_replace($search, '', $string);
	$string = str_replace('--', '', $string);
	$string = str_replace('/*', '', $string);
	$string = str_replace('*/', '', $string);
	$string = str_replace('\n', '', $string);
	$string = str_replace('\r', '', $string);

	return $string;
};

function query($query, $change_zerostring_to_null=false) {
	global $connect;

	$q=sanitize_query($query);
	if ($change_zerostring_to_null) {
		str_replace("''", "NULL", $q);
	};
	$r=mysqli_query($connect, $q);

	return $r;
};

$r = query($q);

$result = array(
	"success" => false,
	"message" => null,
	"cookie" => null,
	"data" => null
);

if (mysqli_num_rows($r) === 0) {
  $result['message'] = 'No user with these credentials.';
}

if (mysqli_num_rows($r) > 0) {
  if (mysqli_num_rows($r) === 1) {
  	$l=mysqli_fetch_assoc($r);

  	$_SESSION['local_sys_user_ID'] = $l['ID'];
  	$_SESSION['local_sys_user_Email'] = $l['Email'];
  	$_SESSION['local_sys_user_Pass'] = $l['Pass'];
  	$_SESSION['local_sys_user_Name'] = $l['Name'];
  	$_SESSION['local_sys_user_Status'] = $l['Status'];
  	$_SESSION['local_sys_user_Auth'] = $l['Auth'];

  	$result['success'] = true;
  	$result['data'] = $l;
  } else {
  	$result['message'] = 'More than one user with these credentials.';
  }
}

$conn -> close();

echo json_encode($result);

?>
