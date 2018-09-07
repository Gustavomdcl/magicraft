<?php
// IDENTIFICA LOGIN ===================================
//Inicia funções de conexão com o servidor e funções de segurança
require_once ("backend/seguranca.php");
//Identifica se existe se já existe uma sessão de login e redireciona para a página painel.php
if(isset($_SESSION['usuarioUserID'])){ header("Location: painel.php"); }

// ERROR ==============================================
//Retorno de <form> por GET (na url)
$error = isset($_GET['error']) ? $_GET['error'] : null;
if ($error == "cadastroemailexistente") {
	$mensagem = '<p>Email Já Registrado</p>';
} else if ($error == "emailnaoexiste") {
	$mensagem = '<p>Email não existe</p>';
} else if ($error == "emailaprovado") {
	$mensagem = '<p>Email já foi aprovado</p>';
} else if ($error == "emailnaoaprovado") {
	$mensagem = '<p>Email não foi aprovado, insira seu email abaixo, verifique se recebeu uma mensagem e clique no link enviado</p>';
} else if ($error == "emailnaocadastrado") {
	$mensagem = '<p>Email não cadastrado</p>';
}
// SUCESSO ==============================================
//Retorno de <form> por GET (na url)
$sucesso = isset($_GET['sucesso']) ? $_GET['sucesso'] : null;
if($sucesso == "aprovado") {
	$mensagem = '<p>Obrigado por cadastrar. <br> Verifique sua caixa de entrada, um email foi enviado para você validar seu usuário</p>';
} else if ($sucesso == "validado") {
	$mensagem = '<p>Seu cadastro foi confirmado com sucesso!</p>';
} else if ($sucesso == "alterarsenha") {
	$mensagem = '<p>Um código para trocar sua senha foi enviado para o seu email.</p>';
} else if ($sucesso == "senhaalterada") {
	$mensagem = '<p>Sua senha foi alterada!</p>';
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

<body class="no-js index">

	<!-- site
	======================================================== -->
	<div id="site">

		<?php 
			//Chama o arquivo header.php
			include 'template/header.php'; 
		?>

		<?php 
			//Se a mensagem de retorno do <form> por GET (na url) insere a mensagem
			if($mensagem!=null) { 
		?>
			<div class="mensagem-login">
				<?php echo $mensagem; ?>
			</div><!-- .mensagem-login -->
		<?php } ?>

		<div class="creat-account">
			<form id="formCadastroUsuario" method="post" action="backend/envios/enviarCadastroUsuario.php">
				<h1>Cadastrar</h1>
				<input type="text" name="nome" placeholder="Nome" id="nome" required>
				<input type="email" name="email" placeholder="Email" id="email" required>
				<input type="password" name="senha" placeholder="Senha" id="senha" required>
				<input type="checkbox" name="termos" value="Termos e condições" class="termos" id="termos" required >Li e estou de acordo com os<br><a href="" title="termos e condições">Termos e condições</a> </p>
				<button type="submit" class="bt-cadastrar">Cadastrar</button><br>
			</form>
		</div><!-- .creat-account -->
		<hr>
		<div class="login" >
			<form id="login_form" method="post" action="backend/valida.php">
				<h1>Login</h1>
				<input type="text" name="email" id="email" placeholder="Email" required>
				<input type="password" name="senha" id="senha" placeholder="Senha" required>
				<input type="checkbox" name="conectado" value="Continuar Conectado">Continuar Conectado
				<button type="submit" class="fazer-login">Fazer Login</button>
			</form>
		</div><!-- .login-->
		<hr>
		<div class="remind-password">
			<form id="lembrar_form" method="post" action="backend/envios/mudarSenha.php">
				<h1>Esqueci a senha</h1>
				<p>Não consegue lembrar sua senha? <br>Digite abaixo seu e-mail que a enviaremos para você.</p>
				<input type="email" name="email" placeholder="Digite aqui seu e-mail" id="email"><br>
				<button type="submit" class="enviar">Enviar</button>
			</form>
		</div><!-- .remind-password -->
					
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