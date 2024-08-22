<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: *');
header('Access-Control-Allow-Headers: Origin, Content-Type: application/json, Authorization');

require_once __DIR__.'/funciones_publicas.php';


if( isset($_POST['user']) && isset($_POST['pass']) ) {

	$usuario = $_POST['user'];
	$pass = $_POST['pass'];

	$jsonResult = login($usuario, $pass);

	echo json_encode ( $jsonResult );

} else {

	echo json_encode ( 'params not found !!!' );
}


?>