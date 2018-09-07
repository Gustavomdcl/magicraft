<?php
	$_SG['conectaServidor'] = true;    
	$_SG['abreSessao'] = true;         

	$_SG['caseSensitive'] = false;    

	$_SG['validaSempre'] = true;

	$_SG['banco'] = 'magicraft';
	$_SG['usuario'] = 'magicraft';
	$_SG['senha'] = 'P0tt3rPlay666';
	$_SG['servidor'] = 'mysql.magicraft.life';
	$_SG['tabela'] = 'PP_USER';

	$_SG['paginaLogin'] = 'index.php';        
	
	if ($_SG['conectaServidor'] == true) {
		$_SG['link'] = mysql_connect($_SG['servidor'], $_SG['usuario'], $_SG['senha']) or die("MySQL: Não foi possível conectar-se ao servidor [".$_SG['servidor']."].");
		mysql_select_db($_SG['banco'], $_SG['link']) or die("MySQL: Não foi possível conectar-se ao banco de dados [".$_SG['banco']."].");
	}
	
	if ($_SG['abreSessao'] == true) {
		session_start();
	}

	function jf_anti_injection($sql) {
		$sql = mysql_real_escape_string($sql);
		return $sql;
	}
	
	/**
	* Função que valida um usuário e senha
	*
	* @param string $usuario - O usuário a ser validado
	* @param string $senha - A senha a ser validada
	*
	* @return bool - Se o usuário foi validado ou não (true/false)
	*/
	function validaUsuario($usuario, $senha) {

		global $_SG;

		$cS = ($_SG['caseSensitive']) ? 'BINARY' : '';

		// Usa a função addslashes para escapar as aspas
		$nusuario = addslashes($usuario);
		$nsenha = addslashes($senha);
		$newsenha = md5($nsenha);

		// Monta uma consulta SQL (query) para procurar um usuário
		//$sql = "SELECT `id`, `email` FROM `".$_SG['tabela']."` WHERE  `email` = '".$nusuario."' AND  `password` = '".$newsenha."' LIMIT 1";
		$sql = "SELECT `id`, `email` FROM `".$_SG['tabela']."` WHERE  `email` = '".$nusuario."' AND  `password` = '".$newsenha."' LIMIT 1";
		jf_anti_injection($sql);
		$query = mysql_query($sql);
		$resultado = mysql_fetch_assoc($query);

		// Verifica se encontrou algum registro
		if (empty($resultado)) {
			//echo "// Nenhum registro foi encontrado => o usuário é inválido";
			header("Location: ../index.php?error=emailnaoexiste");
			die;
			return false;
		} else {
			// O registro foi encontrado => o usuário é valido

			// Definimos dois valores na sessão com os dados do usuário
			$_SESSION['usuarioUserID'] = $resultado['id']; // Pega o valor da coluna 'id do registro encontrado no MySQL
			$_SESSION['usuarioUserNome'] = $resultado['email']; // Pega o valor da coluna 'nome' do registro encontrado no MySQL

			// Verifica a opção se sempre validar o login
			if ($_SG['validaSempre'] == true) {
				// Definimos dois valores na sessão com os dados do login
				$_SESSION['usuarioUserLogin'] = $usuario;
				$_SESSION['usuarioUserSenha'] = $senha;
			}

		return true;
		}
	}

	/**
	* Função que protege uma página
	*/
	function protegePagina() {
		global $_SG;

		if (!isset($_SESSION['usuarioUserID']) OR !isset($_SESSION['usuarioUserNome'])) {
			// Não há usuário logado, manda pra página de login
			desloga();
		} else if (!isset($_SESSION['usuarioUserID']) OR !isset($_SESSION['usuarioUserNome'])) {
			// Há usuário logado, verifica se precisa validar o login novamente
			if ($_SG['validaSempre'] == true) {
				// Verifica se os dados salvos na sessão batem com os dados do banco de dados
				if (!validaUsuario($_SESSION['usuarioUserLogin'], $_SESSION['usuarioUserSenha'])) {
					// Os dados não batem, manda pra tela de login
					desloga();
				}
			}
		}
	}

	/**
	* Função para expulsar um visitante
	*/
	function expulsaVisitante() {
		global $_SG;

		// Remove as variáveis da sessão (caso elas existam)
		unset($_SESSION['usuarioUserID'], $_SESSION['usuarioUserNome'], $_SESSION['usuarioUserLogin'], $_SESSION['usuarioUserSenha']);

		// Manda pra tela de login
		header("Location: ../index.php");
	}
	
	/**
	* Função para expulsar um visitante
	*/
	function desloga() {
		global $_SG;

		// Remove as variáveis da sessão (caso elas existam)
		unset($_SESSION['usuarioUserID'], $_SESSION['usuarioUserNome'], $_SESSION['usuarioUserLogin'], $_SESSION['usuarioUserSenha']);
                
                // Destroi a sessão
                //session_destroy();
                
		// Manda pra tela de login
		header("Location: index.php");
	}
	
?>