 <?php 
	require_once("../conecta.php");
	require_once("../executa.php");

	$email = isset($_GET['email']) ? $_GET['email'] : null;
	$code = isset($_GET['code']) ? $_GET['code'] : null;

	//Verifica se email e senha batem no banco DL_ADMIN_registered
	$registeredVerify = mysql_query("SELECT * FROM PP_USER WHERE email = '$email' AND password = '$code'");
	$aprovedVerify = mysql_query("SELECT * FROM PP_USER WHERE email = '$email' AND password = '$code' AND approved = '1'");

	while ($row=mysql_fetch_array($registeredVerify)) {
		$email=$row['email'];
		$nome=$row['name'];
	}

	//Variáveis do Email
	$emaildestinatario = $email;
	$assunto = utf8_decode("Account Approved");

	//Condições se existe um cadastro na registered do banco de dados ==============================
	if(mysql_num_rows($registeredVerify) > 0) {
		if(mysql_num_rows($aprovedVerify) > 0) {
			//echo "Usuário não aprovado";
			echo '<script>window.location.assign("../../index.php?error=emailaprovado");</script>';
		} else {
			//echo 'tem';

		    //echo 'Obrigado por cadastrar. <br>';

		    $mensagemHTML = utf8_decode(
			    '<p>Hey, ' . $nome . '.</p>
			    <p>Your account was successfully approved!</p>
			    <p>Start now! <a href="http://www.potterplay.com" target="_blank">www.potterplay.com</a></p>
			    <p>Thanks.</p>
			    <br>
			    <p>MagiCraft.</p>
				<hr>'
			);

			//echo '<script>window.location.assign("../../lista-cpf.php?error=' . $cpf . '");</script>';

			//Envio para o Banco ==============================
			$sql = "UPDATE PP_USER SET approved='1' WHERE email='$email'";

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
			echo '<script>window.location.assign("../../index.php?sucesso=validado");</script>';
			
		}
	} else {
		//echo "Usuário não existente";
		echo '<script>window.location.assign("../../index.php?error=emailnaoexiste");</script>';
	}
?>