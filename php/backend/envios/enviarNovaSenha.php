 <?php 
	require_once("../conecta.php");
	require_once("../executa.php");

	$usuarioAlterar 	=	$_POST['usuario'];
	$senhaAntiga		=	$_POST['senhaantiga'];
	$senhaNova			=	md5($_POST['novasenha']);

	//Verifica se esse cadastro já existe no PP_USER
	$usuarioVerify = mysql_query("SELECT * FROM PP_USER WHERE email = '$usuarioAlterar' AND password = '$senhaAntiga'");

	if(mysql_num_rows($usuarioVerify) > 0) {

		$sql = "UPDATE PP_USER SET password='$senhaNova' WHERE email='$usuarioAlterar'";

		mysqlexecuta($id, $sql);

		while ($row=mysql_fetch_array($usuarioVerify)) {
			$nome=$row['name'];
		}

	    $mensagemHTML = utf8_decode(
		    '<p>Hello, ' . $nome . '.</p>
		    <p>Your password has been changed</p>
		    <p>To login click on the link bellow:</p>
			<p><a href="http://magicraft.life/" target="_blank">http://magicraft.life/</a></p>
			<p>Thanks.</p>
		    <br>
		    <p>MagiCraft.</p>
			<hr>'
		);

		//Variáveis do Email
		$emaildestinatario = $usuarioAlterar;
		$assunto = utf8_decode("Senha Alterada - MagiCraft");

		//Envio de Email ==============================
		include_once("email/class.phpmailer.php");

		$nomeDestinatario = utf8_decode('MagiCraft');

		$usuario = 'magicraft@magicraft.life';

		$senha = 'P0tt3rPlay666';

		$To = $usuarioAlterar;
		$Subject = $assunto;
		$Message = $mensagemHTML;

		$Host = 'smtpi.'.substr(strstr($usuario, '@'), 1);
		$Username = $usuario;
		$Password = $senha;
		$Port = "587";

		$mail = new PHPMailer();
		$body = $Message;
		$mail->IsSMTP(); // telling the class to use SMTP
		$mail->Host = $Host; // SMTP server
		$mail->SMTPDebug = 0; // enables SMTP debug information (for testing)
		// 1 = errors and messages
		// 2 = messages only
		$mail->SMTPAuth = true; // enable SMTP authentication
		$mail->SMTPSecure = 'tls';//NOVO
		$mail->Port = $Port; // set the SMTP port for the service server
		$mail->Username = $Username; // account username
		$mail->Password = $Password; // account password

		$mail->SetFrom($usuario, $nomeDestinatario);
		$mail->Subject = $Subject;
		$mail->MsgHTML($body);
		$mail->AddAddress($To, "");

		if(!$mail->Send()) {
		$mensagemRetorno = 'Erro ao enviar e-mail: '. print($mail->ErrorInfo);
		} else {
		$mensagemRetorno = 'E-mail enviado com sucesso!';
		}

		//echo 'Senha alterada!';
		//Volta para a anterior
		echo '<script>window.location.assign("../../index.php?sucesso=senhaalterada");</script>';

	} else {
		echo '<script>window.location.assign("../../index.php?error=emailnaocadastrado");</script>';
		//echo utf8_decode("Usuário não existente");
	}

?>