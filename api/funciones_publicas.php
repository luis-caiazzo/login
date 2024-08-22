<?php
require_once __DIR__.'/libs/php-jwt-master/token.php';

function validarToken($token, $key){
	
	try
	{
		$jwt_result = jwtob::jwt_decode($token, $key);
	}
	catch(Exception $e )
	{
		$jwt_result->msj = $e->getMessage();
	}
	
	return $jwt_result;
}

function login($user, $pass) {
	echo "PHP response user: $user | pass: $pass"; 
	$elem = new stdClass ();
	$json = Array ();
	
    // hardcode to demo
    $usuario = $user;
    $idusuario = 1;

	$parametros = "";
    $parametros .= "idusuario_$idusuario";
    $parametros .= "|usuario_$usuario";
    
    $jwt = jwtob::jwt_encode($parametros, 'demo_jwt', '1d');
    
    $elem->msj 			= "ok";
    $elem->idusuario 	= $idusuario;
    $elem->usuario 		= $usuario;
	$elem->nombre		= 'Jhon Doe';
    $elem->access_token = $jwt;
	$elem->rol = $user == 'admin'? $user : 'other';
	$elem->access_token = $jwt;
	
	$json = $elem;
	
	return $json;
    
}

?>