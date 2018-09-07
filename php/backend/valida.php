<?php
	require_once 'seguranca.php';

	if ($_SERVER['REQUEST_METHOD'] == 'POST') {
	
		$email = (isset($_POST['email'])) ? $_POST['email'] : '';
		$senha = (isset($_POST['senha'])) ? $_POST['senha'] : '';

		//Valida approved
		$validaApproved = mysql_fetch_assoc(mysql_query("SELECT `approved` FROM `PP_USER` WHERE  `email` = '".$email."' LIMIT 1"));

		if($validaApproved['approved']==0){
			header("Location: ../index.php?error=emailnaoaprovado");
		} else {	
			if (validaUsuario($email, $senha) == true) {
				header("Location: ../painel.php");
			} else {
				expulsaVisitante();
			}
		}
	}
?>