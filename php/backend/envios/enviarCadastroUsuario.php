 <?php 
	require_once("../conecta.php");
	require_once("../executa.php");

	$nome 			=	$_POST['nome'];
	$email 			=	$_POST['email'];
	$senha 			=	md5($_POST['senha']);

	//Valida se todos os campos foram preenchidos
	if($nome==null || $email==null || $senha==null){

		echo '<script>window.location.assign("../../index.php");</script>';

	} else {

		//Verifica se esse cadastro já existe no registered
		$emailRegisteredVerify = mysql_query("SELECT * FROM PP_USER WHERE email = '$email'");

		//Variáveis do Email
		$emaildestinatario = $email;
		$assunto = utf8_decode("Registration - MagiCraft");

		//Condições se existe um cadastro na registered do banco de dados ==============================
		if (mysql_num_rows($emailRegisteredVerify) > 0) {
			echo '<script>window.location.assign("../../index.php?error=cadastroemailexistente");</script>';
			//echo 'Email Já Registrado';
		} else {

		    $mensagemHTML = utf8_decode(
			    '<p>Hello, ' . $nome . ' , thank you for your registration!</p>
			    <p>Please click on the link bellow to validate your account:</p>
				<p><a href="http://magicraft.life/backend/envios/validaUsuario.php?email=' . $email . '&code=' . $senha . '" target="_blank">http://magicraft.life/backend/envios/validaUsuario.php?email=' . $email . '&code=' . $senha . '</a></p>
			    <p>Thanks.</p>
			    <br>
			    <p>MagiCraft.</p>
				<hr>'
			);

			//Envio para o Banco ==============================
			$sql = "INSERT INTO PP_USER (name, email, password, approved) VALUES ('$nome', '$email', '$senha', '0')";

			mysqlexecuta($id, $sql);

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
			echo '<script>window.location.assign("../../index.php?sucesso=aprovado");</script>';

		}

	}//Valida se todos os campos foram preenchidos

?>