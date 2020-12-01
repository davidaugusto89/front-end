var SweetAlert2Demo = function() {
  var initDemos = function(){};
  return {
    init: function() {
      initDemos();
    },
  };
}();

jQuery(document).ready(function() {
  SweetAlert2Demo.init();
});

function alertS(titulo, msg, icone, classname, tempo_fechar = 0){
  swal({ title: titulo, text: msg, icon: icone, buttons: { confirm: { text: "OK", value: true, visible: true, className: classname, closeModal: true } } });
  if(tempo_fechar > 0){ setInterval(function(){swal.close(); }, tempo_fechar * 1000);}
}

function dataFormatada(data){
    var dt = data.replace(/(\d*)-(\d*)-(\d*).*/, '$3/$2/$1');
    return dt;
}

function validLogin(){
  var login = localStorage.getItem("login");
  var email = localStorage.getItem("email");
  if(login != 'true' || email == ''){
    localStorage.removeItem("login");
    localStorage.removeItem("email");
    window.location.href = "http://localhost/front-end/";
  }
}

function logout(){
  localStorage.removeItem("login");
  localStorage.removeItem("email");
  window.location.href = "http://localhost/front-end/";
}
