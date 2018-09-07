<?php
	require_once("backend/conecta.php");
	require_once("backend/executa.php");

	$email = isset($_GET['usuario']) ? $_GET['usuario'] : null;
	$senha = isset($_GET['code']) ? $_GET['code'] : null;

	//Verifica se email e senha batem no banco PP_USER
	$userVerify = mysql_query("SELECT * FROM PP_USER WHERE email = '$email' AND password = '$senha'");

	$mensagem = "";

	//Condições se existe um usuario no banco de dados ==============================
	if(mysql_num_rows($userVerify) > 0) {
		$mensagem = $email;
	} else {
		$mensagem = "false";
	}

?><!DOCTYPE html>
<html lang="pt_BR">
<head>

	<title>Título</title>

	<!-- SEO rel="nofollow" on links
	======================================================== -->
	<meta name="robots" content="NOINDEX, nofollow" />	
	<meta name="title" content="Título">
	<meta name="description" content="Descrição">

	<?php 
		//Chama o arquivo head.php
		include 'template/head.php'; 
	?>

</head>

<body class="no-js">

	<!-- site
	======================================================== -->
	<div id="site">

		<?php 
			//Chama o arquivo header.php
			include 'template/header.php'; 
		?>

		<div class="change-password">

			<?php if($mensagem == "false" ) {
				echo "<p>Usuário não existe</p>";
			} else { ?>

			<form id="formMudarSenha" method="post" action="backend/envios/enviarNovaSenha.php">

				<input type="hidden" name="usuario" id="usuario" value="<?php echo $email; ?>">

				<input type="hidden" name="senhaantiga" id="senhaantiga" value="<?php echo $senha; ?>">

				<input type="password" name="novasenha" id="novasenha" placeholder="Nova Senha:" required>

				<button type="submit">Enviar</button>

			</form>

			<?php }//end else ?>

		</div><!-- .change-password -->

		<?php 
			//Chama o arquivo footer.php
			include 'template/footer.php'; 
		?>
	</div><!-- #site -->

	<?php 
		//Chama o arquivo script.php
		include 'template/script.php'; 
	?>

</body>
</html>