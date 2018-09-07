<?php
  require_once ("backend/header.php");
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

  <?php 
    //Chama o arquivo header.php
    include 'template/header.php'; 
  ?>

  <h1>Painel</h1>
  <p>Olá <?php echo $nome; ?>. Seu email é <?php echo $email; ?> e seu id é <?php echo $profile_id; ?></p>
  <p><a href="http://magicraft.life:21288/">Clique aqui para jogar</a></p>
  <a href="sair.php">Sair</a>

  <?php 
    //Chama o arquivo footer.php
    include 'template/footer.php'; 
  ?>

  <?php 
    //Chama o arquivo script.php
    include 'template/script.php'; 
  ?>

</body>
</html>
