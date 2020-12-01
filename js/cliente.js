var sweet_loader = '<div class="loader_custom" style="width:80px;height:80px;"></div>';

function loadLista(){
  $('#table_clientes tbody').append('<tr id="tr_loading"><td colspan="100%" class="text-center">Carregando lista...</td></tr>');
  $.ajax({
    url: 'http://localhost/rest-api/clientes/',
    type: 'GET',
    dataType: "json",
    success: function (response) {
      $('#tr_loading').remove();
      var obj = JSON.parse(JSON.stringify(response));
      if(obj.total > 0){
        $.each(obj.dados, function (key, item) {
          var botoes = '<a href="http://localhost/front-end/clientes/editar/'+item.id+'" class="btn btn-sm btn-info mr-2 text-white"><i class="fas fa-edit"></i> Editar</a>';
          botoes += '<button type="button" name="button" class="btn btn-sm btn-danger" onclick="removeCliente(\''+item.id+'\');"><i class="far fa-trash-alt"></i> Remover</button>';
          var table = '<tr id="tr_cliente_'+item.id+'">';
          table += '<td>'+item.id+'</td>';
          table += '<td class="fld_search">'+item.nome+'</td>';
          table += '<td class="fld_search">'+item.email+'</td>';
          table += '<td>'+dataFormatada(item.data_nascimento)+'</td>';
          table += '<td>'+botoes+'</td>';
          table += '</tr>';
          $('#table_clientes tbody').append(table);
        });
      }else{
        $('#table_clientes tbody').append('<tr><td colspan="100%" class="text-center">'+obj.mensagem+'</td></tr>');
      }
    },
    error: function(jqXHR, textStatus, errorThrown) {
      $('#tr_loading').remove();
      $('#table_clientes tbody').append('<tr id="tr_loading"><td colspan="100%" class="text-center">Erro não foi possível carregar a lista.</td></tr>');
      console.log(errorThrown);
    }
  });
}

$(document).ready(function () {
  $("#cpf").mask('000.000.000-00', {reverse: true});

  $('#telefone').mask('(00) 0000-00009');
  $('#telefone').blur(function(event) {
   if($(this).val().length == 15){
      $('#telefone').mask('(00) 00000-0009');
   } else {
      $('#telefone').mask('(00) 0000-00009');
   }
 });
});

function addEndereco(){
  var atual = parseInt($('#total').val()) + 1;
  $('#total').val(atual);

  var table = '<tr id="tr_end_'+atual+'">';
  table += '<td><input type="text" name="cep[]" id="cep_'+atual+'" class="form-control form-control-sm cep" maxlength="9" placeholder="CEP" required onkeyup ="loadCEP(\''+atual+'\');"/></td>';
  table += '<td><input type="text" name="logradouro[]" id="logradouro_'+atual+'" class="form-control form-control-sm" maxlength="100" placeholder="Logradouro" required/></td>';
  table += '<td><input type="text" name="numero[]" id="numero_'+atual+'" class="form-control form-control-sm" maxlength="10" placeholder="Número" required/></td>';
  table += '<td><input type="text" name="complemento[]" id="complemento_'+atual+'" class="form-control form-control-sm" maxlength="20" placeholder="Complemento"/></td>';
  table += '<td><input type="text" name="bairro[]" id="bairro_'+atual+'" class="form-control form-control-sm" maxlength="100" placeholder="Bairro" required/></td>';
  table += '<td><input type="text" name="cidade[]" id="cidade_'+atual+'" class="form-control form-control-sm" maxlength="100" placeholder="Cidade" required/></td>';
  table += '<td><input type="text" name="estado[]" id="estado_'+atual+'" class="form-control form-control-sm" maxlength="2" placeholder="UF" required/></td>';
  table += '<td><button type="button" name="button" class="btn btn-sm btn-danger float-right" onclick="removeEndereco(\''+atual+'\');"><i class="far fa-trash-alt"></i> Remover</button></td>';
  table += '</tr>';

  $('#table_lista_enderecos tbody').append(table);

  $('.cep').unmask().mask('00000-000');
}

function removeEndereco(linha){
  $('#tr_end_'+linha).remove();
}

function loadCEP(linha){
  var cep = $('#cep_'+linha).val().replace('-','');
  if(cep.length == 8){
    $.ajax({
      url: 'https://brasilapi.com.br/api/cep/v1/'+$('#cep_'+linha).val(),
      type: 'GET',
      dataType: "json",
      success: function (response) {
        var obj = JSON.parse(JSON.stringify(response));
        $('#logradouro_'+linha).val(obj.street);
        $('#bairro_'+linha).val(obj.neighborhood);
        $('#cidade_'+linha).val(obj.city);
        $('#estado_'+linha).val(obj.state);
      },
      error: function(jqXHR, textStatus, errorThrown) {
        $('#cep_'+linha).val('');
        alertS('Alerta', 'CEP não encontrado.', 'error', 'btn btn-danger', 5);
        console.log(errorThrown);
      }
    });
  }
}

function saveCliente(){
  var erro = 0;
  $('[required]').each( function(idx, elem) {
      if($(elem).val() == ''){
        $(elem).addClass('is-invalid');
        erro++;
      }else{
        $(elem).removeClass('is-invalid');
      }
  });

  if($('#cpf').val() != ''){
    var valid_cpf = validaCPF($('#cpf').val());
    if(valid_cpf == false || valid_cpf == 'false'){
      $('#retorno_valid_cpf').html('Campo CPF não está preenchido com um valor válido.');
      $('#cpf').addClass('is-invalid');
    }else{
      $('#retorno_valid_cpf').html('');
      $('#cpf').removeClass('is-invalid');
    }
  }
  var id = 0;
  if(erro > 0){
    alertS('Alerta', 'Verifique o preenchimento dos campos em vermelho.', 'error', 'btn btn-danger');
  }else{
    swal({
        title: 'Salvando cliente',
        text: '....',
        showConfirmButton: false
    });
    $('.swal-button').hide();
    $('.swal-text').html(sweet_loader);

    $.ajax({
      url: 'http://localhost/rest-api/clientes/',
      type: 'POST',
      data: $('#formCadastroCliente').serialize(),
      success: function (response) {
        var obj = JSON.parse(JSON.stringify(response));
        id = parseInt(obj.id);
        saveEndereco(id);
        swal.close();
      },
      error: function(jqXHR, textStatus, errorThrown) {
        console.log(errorThrown);
      }
    });
  }
}

function saveEndereco(id){
  if(id > 0){
    swal({
        title: 'Salvando endereço',
        text: '....',
        showConfirmButton: false
    });
    $('.swal-button').hide();
    $('.swal-text').html(sweet_loader);

    $('#formEnderecoCliente').append('<input type="hidden" name="id_cliente" id="id_cliente" value="'+id+'">');
    $.ajax({
      url: 'http://localhost/rest-api/cliente-enderecos/',
      type: 'POST',
      data: $('#formEnderecoCliente').serialize(),
      success: function (response) {
        var obj = JSON.parse(JSON.stringify(response));
        swal.close();
        alertS('Sucesso', 'Cliente cadastrado com sucesso.', 'success', 'btn btn-success', 5);
        setTimeout(function(){ window.location.href = "http://localhost/front-end/clientes/"; }, 5000);
      },
      error: function(jqXHR, textStatus, errorThrown) {
        console.log(errorThrown);
        swal.close();
        alertS('Sucesso', 'Cliente cadastrado com sucesso.', 'success', 'btn btn-success', 5);
        setTimeout(function(){ window.location.href = "http://localhost/front-end/clientes/"; }, 5000);
      }
    });
  }
}

function validaCPF(cpf){
		cpf = cpf.replace('.','');
		cpf = cpf.replace('.','');
		cpf = cpf.replace('-','');

		erro = new String;
		if (cpf.length < 11) erro += "Campo CPF deve ser preenchido com 11 digitos.";
		var nonNumbers = /\D/;
		if (nonNumbers.test(cpf)) erro += "";
		if (cpf == "00000000000" || cpf == "11111111111" ||
		cpf == "22222222222" || cpf == "33333333333" || cpf == "44444444444" ||
    cpf == "55555555555" || cpf == "66666666666" || cpf == "77777777777" ||
    cpf == "88888888888" || cpf == "99999999999"){
			  erro += "Numero de CPF inválido."
		}
		var a = [];
		var b = new Number;
		var c = 11;
		for (i=0; i<11; i++){
			a[i] = cpf.charAt(i);
			if (i <  9) b += (a[i] *  --c);
		}
		if ((x = b % 11) < 2) { a[9] = 0 } else { a[9] = 11-x }
		b = 0;
		c = 11;
		for (y=0; y<10; y++) b += (a[y] *  c--);
		if ((x = b % 11) < 2) { a[10] = 0; } else { a[10] = 11-x; }
		status = a[9] + ""+ a[10]
		if ((cpf.charAt(9) != a[9]) || (cpf.charAt(10) != a[10])){
			erro +="Dígito verificador com problema.";
		}
		if (erro.length > 0){
			return false;
		}
		return true;
}

$(".search").on("keyup", function() {
  var value = this.value.toLowerCase().trim();
  $('.fld_search').parent('tr').show().filter(function() {
    return $(this).text().toLowerCase().trim().indexOf(value) == -1;
  }).hide();
});


function removeCliente(id){
  var titulo = 'Alerta';
  var msg = 'Tem certeza que deseja remover o cliente?';
  var icone = 'warning';
  swal({ title: titulo, text: msg, icon: icone, buttons: {
    cancel: { text: "Cancelar", value: false, visible: true, className: 'btn btn-danger', closeModal: true },
    confirm: { text: "Sim, desejo remover", value: true, visible: true, className: 'btn btn-success', closeModal: true }
  } }).then((result) => {
    if(result == true){
      swal({
          title: 'Removendo cliente',
          text: '....',
          showConfirmButton: false
      });
      $('.swal-button').hide();
      $('.swal-text').html(sweet_loader);

      $.ajax({
        url: 'http://localhost/rest-api/clientes/'+id,
        type: "DELETE",
        success: function (response) {
          $('#tr_cliente_'+id).remove();
          swal.close();
        },
        error: function(jqXHR, textStatus, errorThrown) {
          console.log(textStatus, errorThrown);
        }
      });
     }
  });
}

function loadCliente(id){
  $('#formCadastroCliente').append('<input type="hidden" name="id_cliente" id="id_cliente" value="'+id+'">');
  $('#btn_salvar').attr('onclick', 'editCliente(\''+id+'\');')
  $.ajax({
    url: 'http://localhost/rest-api/clientes/'+id,
    type: 'GET',
    dataType: "json",
    success: function (response) {
      var obj = JSON.parse(JSON.stringify(response));
      if(obj.total == 0){
        window.location.href = "http://localhost/front-end/clientes/";
      }
      var dados = obj.dados;
      $('#nome').val(dados.nome);
      $('#email').val(dados.email);
      $('#data_nascimento').val(dados.data_nascimento);
      $('#telefone').val(dados.telefone);
      $('#cpf').val(dados.cpf);
      $('#rg').val(dados.rg);
    },
    error: function(jqXHR, textStatus, errorThrown) {
      console.log(errorThrown);
      window.location.href = "http://localhost/front-end/clientes/";
    }
  });
}

function loadEndereco(id){
  $.ajax({
    url: 'http://localhost/rest-api/cliente-enderecos/'+id,
    type: 'GET',
    dataType: "json",
    success: function (response) {
      var obj = JSON.parse(JSON.stringify(response));
      if(parseInt(obj.total) > 0){
        $.each(obj.dados, function (key, item) {
          var atual = parseInt($('#total').val()) + 1;
          $('#total').val(atual);

          var table = '<tr id="tr_end_'+atual+'">';
          table += '<input type="hidden" name="id_endereco[]" id="id_endereco_'+atual+'" value="'+item.id+'"/>';
          table += '<td><input type="text" name="cep[]" id="cep_'+atual+'" class="form-control form-control-sm cep" maxlength="9" placeholder="CEP" required onkeyup ="loadCEP(\''+atual+'\');" value="'+item.cep+'"/></td>';
          table += '<td><input type="text" name="logradouro[]" id="logradouro_'+atual+'" class="form-control form-control-sm" maxlength="100" placeholder="Logradouro" required  value="'+item.logradouro+'"/></td>';
          table += '<td><input type="text" name="numero[]" id="numero_'+atual+'" class="form-control form-control-sm" maxlength="10" placeholder="Número" required  value="'+item.numero+'"/></td>';
          table += '<td><input type="text" name="complemento[]" id="complemento_'+atual+'" class="form-control form-control-sm" maxlength="20" placeholder="Complemento"  value="'+item.complemento+'"/></td>';
          table += '<td><input type="text" name="bairro[]" id="bairro_'+atual+'" class="form-control form-control-sm" maxlength="100" placeholder="Bairro" required  value="'+item.bairro+'"/></td>';
          table += '<td><input type="text" name="cidade[]" id="cidade_'+atual+'" class="form-control form-control-sm" maxlength="100" placeholder="Cidade" required  value="'+item.cidade+'"/></td>';
          table += '<td><input type="text" name="estado[]" id="estado_'+atual+'" class="form-control form-control-sm" maxlength="2" placeholder="UF" required  value="'+item.estado+'"/></td>';
          table += '<td><button type="button" name="button" id="btn_remove_'+atual+'" class="btn btn-sm btn-danger float-right" onclick="deleteEndereco(\''+atual+'\',\''+item.id+'\');"><i class="far fa-trash-alt"></i> Remover</button></td>';
          table += '</tr>';
          $('#table_lista_enderecos tbody').append(table);
        });
      }

      $('.cep').unmask().mask('00000-000');
    },
    error: function(jqXHR, textStatus, errorThrown) {
      console.log(errorThrown);
    }
  });
}

function deleteEndereco(linha,id_endereco){
  $('#btn_remove_'+linha).prop('disabled',true);
  $('#btn_remove_'+linha).html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span><span class="sr-only">Removendo...</span>');
  $.ajax({
    url: 'http://localhost/rest-api/cliente-enderecos/'+id_endereco,
    type: "DELETE",
    success: function (response) {
      $('#tr_end_'+linha).remove();
    },
    error: function(jqXHR, textStatus, errorThrown) {
      console.log(textStatus, errorThrown);
    }
  });
}


function editCliente(id){
  var erro = 0;
  $('[required]').each( function(idx, elem) {
      if($(elem).val() == ''){
        $(elem).addClass('is-invalid');
        erro++;
      }else{
        $(elem).removeClass('is-invalid');
      }
  });

  if($('#cpf').val() != ''){
    var valid_cpf = validaCPF($('#cpf').val());
    if(valid_cpf == false || valid_cpf == 'false'){
      $('#retorno_valid_cpf').html('Campo CPF não está preenchido com um valor válido.');
      $('#cpf').addClass('is-invalid');
    }else{
      $('#retorno_valid_cpf').html('');
      $('#cpf').removeClass('is-invalid');
    }
  }
  if(erro > 0){
    alertS('Alerta', 'Verifique o preenchimento dos campos em vermelho.', 'error', 'btn btn-danger');
  }else{
    swal({
        title: 'Salvando cliente',
        text: '....',
        showConfirmButton: false
    });
    $('.swal-button').hide();
    $('.swal-text').html(sweet_loader);

    $.ajax({
      url: 'http://localhost/rest-api/clientes/'+id,
      type: 'POST',
      data: $('#formCadastroCliente').serialize(),
      success: function (response) {
        console.log(response);
        editEndereco(id);
        swal.close();
      },
      error: function(jqXHR, textStatus, errorThrown) {
        console.log(errorThrown);
      }
    });
  }
}

function editEndereco(id){
  if(id > 0){
    swal({
        title: 'Salvando endereço',
        text: '....',
        showConfirmButton: false
    });
    $('.swal-button').hide();
    $('.swal-text').html(sweet_loader);

    $('#formEnderecoCliente').append('<input type="hidden" name="id_cliente" id="id_cliente" value="'+id+'">');
    $.ajax({
      url: 'http://localhost/rest-api/cliente-enderecos/'+id,
      type: 'POST',
      data: $('#formEnderecoCliente').serialize(),
      success: function (response) {
        console.log(response);
        swal.close();
        alertS('Sucesso', 'Cadastro do Cliente atualizado com sucesso.', 'success', 'btn btn-success', 5);
        setTimeout(function(){ window.location.href = "http://localhost/front-end/clientes/"; }, 5000);
      },
      error: function(jqXHR, textStatus, errorThrown) {
        console.log(errorThrown);
        swal.close();
        alertS('Sucesso', 'Cadastro do Cliente atualizado com sucesso.', 'success', 'btn btn-success', 5);
        setTimeout(function(){ window.location.href = "http://localhost/front-end/clientes/"; }, 5000);
      }
    });
  }
}
