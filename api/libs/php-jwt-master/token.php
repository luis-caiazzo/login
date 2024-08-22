<?php
// ========================================================== 
// Nombre: token.php
// Descripción: Se encarga de adminstrar token de JWT
// Llamado por: 
// Comentarios: 
// Autores: Luis E. Caiazzo
// Audit Trail: 
// <agregar una nueva línea por cada modificacion (cuando, quien, que y porque)>
// ===========================================================
use Firebase\JWT\JWT;

require_once __DIR__.'/src/BeforeValidException.php';
require_once __DIR__.'/src/ExpiredException.php';
require_once __DIR__.'/src/SignatureInvalidException.php';
require_once __DIR__.'/src/JWT.php';

// ========================================================== 
//	CONSTANTES 
// ========================================================== 
	//define("PATH_CONFIGFILE_DB", __DIR__."/config.txt");
// ========================================================== 

class jwtob 
{
	
	// ========================================================== 
	//	CONSTRUCTORES
	// ========================================================== 

	function __construct() 
	{		
		// ========================================================== 
		// Descripción: Permite construir el objeto manager
		// Autores: Luis E. Caiazzo
		// Fecha de creacion: 2020-05-21
		// Ultima modificacion: 2020-05-21
		// ===========================================================	
				
    }

	function __destruct() 
	{
		// ========================================================== 
		// Descripción: Permite destruir el objeto manager
		// Autores: Luis E. Caiazzo
		// Fecha de creacion: 2020-05-21
		// Ultima modificacion: 2020-05-21
		// ===========================================================

    }

	// ========================================================== 
	//	METODOS PUBLICOS
	// ========================================================== 

	public static function openConnection() 
	{
		// ========================================================== 
		// Descripción: Permite crear una conexion a la base
		// Autores: Luis E. Caiazzo
		// Fecha de creacion: 2020-05-21
		// Ultima modificacion: 2020-05-21
		// ===========================================================
		
		$arrConfig = parse_ini_file(PATH_CONFIGFILE_DB,true);
		
		/*----------  LOCALHOST  ----------*/
		/*$host     = $arrConfig['database']['host'];
		$basename = $arrConfig['database']['database'];
		$username = $arrConfig['database']['username'];
		$password = $arrConfig['database']['password'];*/
		
		/*----------    PROD    ----------*/
		$host     = $arrConfig['databasePROD']['host'];
		$basename = $arrConfig['databasePROD']['database'];
		$username = $arrConfig['databasePROD']['username'];
		$password = $arrConfig['databasePROD']['password'];
		//echo "$host - $basename - $username - $password"."<br>";

		$cnn = new mysqli($host, $username, $password, $basename);
		
		if(!$cnn || $cnn->errno || $cnn->connect_errno || $cnn->error)
		{
			try
			{
				throw new Exception("MySQL error $mysqli->error <br> Query:<br> $query", $msqli->errno);
			}
			catch(Exception $e )
			{
				throw new Exception($e->getMessage());
			}
		}
		else
		{
			return $cnn;
		}
	}
	
	public static function jwt_encode($params, $key, $time) {
		// ========================================================== 
		// Descripción: 
		// Autores: Luis E. Caiazzo
		// Fecha de creacion: 2020-05-24
		// Ultima modificacion: 2020-05-24
		// ===========================================================	
		
		$tiempo = time();
		
		switch($time){
			case '1d':
				$tiempo_duracion = (60 * 60 * 24);
				//$tiempo_duracion = (60);
			break;
		}
		
		$token = array(
			'iat' => $tiempo,
			//'exp' => $tiempo + (60 * 60 * 24),
			'exp' => $tiempo + $tiempo_duracion,
		);
		
		
		$params_array = explode('|', $params);
		
		foreach ($params_array as $elemento) {
			
			$valores = explode('_', $elemento);
			
			$token["$valores[0]"] = $valores[1];
		}
		
		$jwt = JWT::encode($token, $key);

		//echo $jwt."<br><br>";

		return $jwt;

	}
	
	public static function jwt_decode($token, $key){
		// ========================================================== 
		// Descripción: 
		// Autores: Luis E. Caiazzo
		// Fecha de creacion: 2020-05-21
		// Ultima modificacion: 2020-05-21
		// ===========================================================		
		
		$elem = new stdClass ();
		
		try
		{
			//echo("<br>Try<br>");
			$jwtDecode = JWT::decode($token, $key, array('HS256'));
			
			$elem->msj = "ok";
			$elem->idusuario = $jwtDecode->idusuario;
			$elem->usuario = $jwtDecode->usuario;
			
		}
		catch(Exception $e )
		{
			$elem->msj = $e->getMessage();
		}
		
		return $elem;
	}
}
?>