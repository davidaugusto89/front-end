function submitForm(){

  $.ajax({
    url: 'http://localhost/rest-api/login/',
    type: 'POST',
    data: $('form').serialize(),
    success: function (response) {
      var obj = JSON.parse(JSON.stringify(response));
      if(obj.status != '200'){
        alertS('Alerta', obj.mensagem, 'error', 'btn btn-danger', 5);
      }else{
        localStorage.setItem("login", "true");
        localStorage.setItem("email", $('#email').val());
        window.location.href = "http://localhost/front-end/clientes/";
      }
    },
    error: function(jqXHR, textStatus, errorThrown) {
      console.log(errorThrown);
    }
  });
}
