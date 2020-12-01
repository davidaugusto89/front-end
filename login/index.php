<!doctype html>
<html lang="pt_br">
<head>
  <meta charset="utf-8">
  <title>Front-End - Login</title>
  <base href="/">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="author" content="David Augusto Keller Haddad">
  <link rel="icon" type="image/x-icon" href="favicon.ico">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.1/css/all.min.css" crossorigin="anonymous">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/sweetalert2@10/dist/sweetalert2.min.css" id="theme-styles">
  <style type="text/css">
  body,html {
    height: 100%;
  }
  </style>
</head>
<body>
  <div class="container h-100">
    <div class="row h-100">
      <div class="col-6 mx-auto my-auto bg-light p-4 rounded">
        <form action="" method="post" id="formLogin">
          <div class="form-group">
            <h1 class="h3 mb-3 text-center">Login</h1>

            <label for="inputEmail" class="mt-2">E-mail</label>
            <input type="email" id="email" name="email" class="form-control" placeholder="Endereço de e-mail" required value="davidakhaddad@gmail.com">

            <label for="inputPassword" class="mt-2">Senha</label>
            <input type="password" id="senha" name="senha" class="form-control" placeholder="Senha" required value="1234">

            <button class="btn btn-lg btn-primary btn-block mt-3" type="button" onclick="submitForm();"><i class="fas fa-sign-in-alt"></i> Logar</button>
          </div>
        </form>
      </div>
    </div>
  </div>

  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js" integrity="sha512-bLT0Qm9VnAYZDflyKcBaQ2gg0hSYNQrJ8RilYldYQ1FxQYoCLtUjuuRuZo+fjqhx/qtq/1itJ0C2ejDxltZVFg==" crossorigin="anonymous"></script>
  <script src="http://localhost/front-end/js/sweetalert.min.js"></script>
  <script src="http://localhost/front-end/js/function.js"></script>
  <script src="http://localhost/front-end/js/login.js"></script>
</body>
</html>
