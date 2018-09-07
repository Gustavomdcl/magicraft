 <?php //http://stackoverflow.com/questions/18972518/rename-a-file-if-already-exists-php-upload-system
	require_once ("../seguranca.php");
	protegePagina();

	// VARIAVEIS GLOBAIS ==================================
	$usuarioLogadoID = $_SESSION['usuarioUserID'];
	$usuarioLogadoEmail = $_SESSION['usuarioUserNome'];

	require_once("../conecta.php");
	require_once("../executa.php");

	$user 				=	$_POST['user'];
	$gender 			=	$_POST['gender'];
	
	$skin_color 		=	$_POST['skin_color'];
	$hair 				=	$_POST['hair'];
	$glasses			=	$_POST['glasses'];
	$clothe				=	$_POST['clothe'];

	$appearl			=	'skin_color='.$skin_color.',hair='.$hair.',glasses='.$glasses.',clothe='.$clothe;

	if($user==null){
		echo '<script>window.location.assign("../../index.php");</script>';
	} else {

		// ENVIO ==========

		$sqlFinal = "UPDATE PP_USER SET user='$user', gender='$gender', appearl='$appearl' WHERE email='$usuarioLogadoEmail'";
		mysqlexecuta($id, $sqlFinal);

		$mensagemValidacao = 'primeiro-perfil-atualizado';

		echo '<script>window.location.assign("../../painel.php?sucesso=' . $mensagemValidacao . '");</script>';
	}

?>