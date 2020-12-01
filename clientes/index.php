<?php
$tmp = str_replace('/front-end/clientes/','',$_SERVER['REQUEST_URI']);
$tmp = explode('/',$tmp);
$rota = $tmp[0];
$id = !empty($tmp[1]) ? $tmp[1] : null;
$script = '';
switch ($rota) {
  case '':
    $arquivo = 'view/lista.html';
    $script = '<script>loadLista(); validLogin();</script>';
  break;

  case 'cadastrar':
    $arquivo = 'view/cadastrar.html';
    $script = '<script>validLogin();</script>';
  break;

  case 'editar':
    if($id <= 0){
      header('Location: http://localhost/front-end/clientes/');
    }
    $arquivo = 'view/cadastrar.html';
    $script = '<script>
                loadCliente(\''.$id.'\');
                loadEndereco(\''.$id.'\');
                validLogin();
              </script>';
  break;

  default:
    header('Location: http://localhost/front-end/');
  break;
}
?>
<!doctype html>
<html lang="pt_br">
<head>
  <meta charset="utf-8">
  <title>Front-End - Clientes</title>
  <base href="/">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="author" content="David Augusto Keller Haddad">
  <link rel="icon" type="image/x-icon" href="favicon.ico">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.1/css/all.min.css" crossorigin="anonymous">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/sweetalert2@10/dist/sweetalert2.min.css" id="theme-styles">
  <link rel="stylesheet" href="http://localhost/front-end/css/custom.css">
  <style type="text/css">
  body,html {
    height: 100%;
    background: #F9FBFD;
  }
  </style>
</head>
<body>
  <div class="wrapper h-100">
    <nav id="sidebar" class="h-100">
      <div class="sidebar-header h-100">
        <ul class="list-unstyled components">
          <li>
            <a href="http://localhost/front-end/clientes/"><i class="fas fa-users"></i> Clientes</a>
          </li>
          <li>
            <a href="javascript:logout();"><i class="fas fa-sign-out-alt"></i> Sair</a>
          </li>
        </ul>
      </div>
    </nav>

    <div class="container-fluid mt-4">
      <?php require_once($arquivo); ?>
    </div>
  </div>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js" integrity="sha512-bLT0Qm9VnAYZDflyKcBaQ2gg0hSYNQrJ8RilYldYQ1FxQYoCLtUjuuRuZo+fjqhx/qtq/1itJ0C2ejDxltZVFg==" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.mask/1.14.16/jquery.mask.min.js" integrity="sha512-pHVGpX7F/27yZ0ISY+VVjyULApbDlD0/X0rgGbTqCE7WFW5MezNTWG/dnhtbBuICzsd0WQPgpE4REBLv+UqChw==" crossorigin="anonymous"></script>
    <script src="http://localhost/front-end/js/sweetalert.min.js"></script>
    <script src="http://localhost/front-end/js/function.js"></script>
    <script src="http://localhost/front-end/js/cliente.js"></script>
    <?=$script?>
  </body>
  </html>
