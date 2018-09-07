<?php
  include dirname(__FILE__)."/seguranca.php";
  protegePagina();

  // VARIAVEIS GLOBAIS ==================================
  $usuarioLogadoID = $_SESSION['usuarioUserID'];
  $usuarioLogadoEmail = $_SESSION['usuarioUserNome'];

  include dirname(__FILE__)."/conecta.php";
  include dirname(__FILE__)."/executa.php";

  // VALIDA PERFIL ======================================
  $perfilCriado = mysql_query("SELECT * FROM PP_USER WHERE email = '$usuarioLogadoEmail'");
  $id;
  $nome;
  $email;
  $user;

  if(mysql_num_rows($perfilCriado) > 0) {

    while ($row=mysql_fetch_array($perfilCriado)) {
      $profile_id=$row['id'];
      $nome=$row['name'];
      $email=$row['email'];
      $user=$row['user'];
    }

    if($user==NULL){
      header("Location: cadastro-inicial.php");
    }

  } else {
    header("Location: ../index.php");
  }

?>