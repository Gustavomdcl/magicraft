 <?php 
	require_once("../conecta.php");
	require_once("../executa.php");

	$usuarioAlterar 		=	$_POST['email'];

	//Verifica se esse cadastro já existe no PP_USER
	$usuarioVerify = mysql_query("SELECT * FROM PP_USER WHERE email = '$usuarioAlterar'");

	while ($row=mysql_fetch_array($usuarioVerify)) {
		$nome=$row['name'];
		$senha=$row['password'];
	}

	//Variáveis do Email
	$email = $usuarioAlterar;
	$assunto = utf8_decode("Change Password - MagiCraft");

	//Condições se existe um cadastro na registered do banco de dados ==============================
	if(mysql_num_rows($usuarioVerify) > 0) {
	    //echo 'tem';

	    //echo "Um código para trocar sua senha foi enviado para o seu email.";

	    $mensagemHTML = utf8_decode(
	    	'<p>Hello, ' . $nome . '.</p>
		    <p>You are trying to change your password, right?</p>
		    <p>To continue click on <a href="http://magicraft.life/alterar-senha.php?usuario=' . $usuarioAlterar . '&code=' . $senha . '" target="_blank">agenciawebnauta.com.br/bibliotecaPHP/alterar-senha.php?usuario='.$usuarioAlterar.'&code=' . $senha . '</a> and insert your new password</p>
		    <p>If you did not want to change your password, ignore it.</p>
		    <p>Thanks.</p>
		    <br>
		    <p>MagiCraft.</p>
			<hr>'
		);

		//Envio de Email ==============================
		include_once("email/class.phpmailer.php");

		$nomeDestinatario = utf8_decode('MagiCraft');

		$usuario = 'magicraft@magicraft.life';

		$senha = 'P0tt3rPlay666';

		$To = $email;
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

		//Volta para a anterior
		echo '<script>window.location.assign("../../index.php?sucesso=alterarsenha");</script>';
	} else {
		echo '<script>window.location.assign("../../index.php?error=emailnaocadastrado");</script>';
		//echo "Email não cadastrado";
	}

?>