<?php
  require_once ("backend/seguranca.php");
  protegePagina();

  // VARIAVEIS GLOBAIS ==================================
  $usuarioLogadoID = $_SESSION['usuarioUserID'];
  $usuarioLogadoEmail = $_SESSION['usuarioUserNome'];

  require_once("backend/conecta.php");
  require_once("backend/executa.php");

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

    if($user!=NULL){
      header("Location: index.php");
    }

  } else {
    header("Location: index.php");
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

<body class="no-js painel">

  <!-- site
  ======================================================== -->
  <div id="site">

    <?php 
      //Chama o arquivo header.php
      include 'template/header.php'; 
    ?>

    <h1>Cadastro Inicial</h1>
    <p>Olá <?php echo $nome; ?>. Finalize seu cadastro abaixo:</p>
    <a href="sair.php">Sair</a>

    <form id="enviarPerfil" method="post" action="backend/envios/enviarPerfilUsuario.php" enctype="multipart/form-data">
      <label for="user">Usuário: Não poderá trocar, não coloque espaços ou acentos</label>
      <input type="text" name="user" id="user" placeholder="Usuário" required>
      <br> 

      <label for="gender">Gênero</label>
      <select name="gender" id="gender">
        <option value="male" selected>Male</option> 
        <option value="female">Female</option>
      </select>
      <br>

      <label for="skin_color">Cor da Pele</label>
      <select name="skin_color" id="skin_color">
        <option value="black" selected>Black</option>
        <option value="brown">Brown</option>
        <option value="middle">Middle</option>
        <option value="white">White</option>
      </select>
      <br>

      <label for="hair">Cabelo</label>
      <select name="hair" id="hair">
        <option value="black" selected>Black</option>
        <option value="brown">Brown</option>
        <option value="red">Red</option>
        <option value="blond">Blond</option>
      </select>
      <br>

      <label for="glasses">Óculos</label>
      <select name="glasses" id="glasses">
        <option value="none" selected>Nenhum</option>
        <option value="rounded">Rounded</option>
      </select>
      <br>

      <label for="clothe">Roupa</label>
      <select name="clothe" id="clothe">
        <option value="striped" selected>Striped</option>
        <option value="polkadot">Polka dot</option>
        <option value="plaid">Plaid</option>
      </select>
      <br>

      <button type="submit" class="salvar-cadastro-perfil">Salvar</button>
    </form>

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
