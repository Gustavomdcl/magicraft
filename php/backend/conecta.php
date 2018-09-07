<?php
	//https://admin.mysql.uhserver.com/index.php
	$dbname="magicraft"; //Nome do Banco de dados
	$usuario="magicraft";
	$password="P0tt3rPlay666";
	if(!($id = mysql_connect("mysql.magicraft.life",$usuario,$password)))
	{
	   echo "Não foi possível estabelecer com o Mysql - Erro 1";
	   exit;
	} 
	if(!($con=mysql_select_db($dbname,$id))) { 
	   echo "Não foi possível estabelecer com Mysql - Erro 2";
	   exit; 
	} 
	//Erro 1 - Usuario não existe
	//Erro 2 - Base de dados nao existe
?>