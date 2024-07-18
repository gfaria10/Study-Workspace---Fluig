function validarCEP(cep) {
    const regex = /^\d{5}-?\d{3}$/;
    return regex.test(cep);
}

function limpaCampos() {
    $('.camposCEP').val('');
}

function consultaCEP() {
    var cepDigitado = $('#cep').val();
    var cepValido = validarCEP(cepDigitado);

    if (!cepValido) {
        FLUIGC.toast({
            title: 'Aviso: ',
            message: 'O CEP foi digitado incorretamente.',
            type: 'warning'
        });

        // Exclui os valores dos campos, em caso de digitar um CEP errado e já terem valores
        limpaCampos();
        return;
    }

    $.ajax({
        type: "get",
        url: "https://viacep.com.br/ws/" + cepDigitado + "/json/",
        data: "data",
        dataType: "json",
        success: function (response) {
            if (response.erro == true) {
                FLUIGC.toast({
                    title: 'Erro: ',
                    message: 'O CEP digitado não existe.',
                    type: 'danger'
                });

                limpaCampos();
                return;
            }

            $('#municipio').val(response.localidade);
            $('#uf').val(response.uf);
            $('#logradouro').val(response.logradouro);
            $('#bairro').val(response.bairro);

            FLUIGC.toast({
                title: 'Sucesso: ',
                message: 'Os campos foram preenchidos automaticamente.',
                type: 'success'
            });
        },

        error: function () {
            FLUIGC.toast({
                title: 'Servidor indisponível: ',
                message: 'O serviço de consulta ao CEP está indisponível.',
                type: 'warning'
            });
        }
    });
}

// Libera campos de acordo com a atividade
$(document).ready(function () {
    var numState = getWKNumState();
    var mode = getFormMode();

    if (numState == '5' || mode == 'ADD') {
        FLUIGIP.execChangeFields($("#cpf"), false);
        FLUIGIP.execChangeFields($("#cep"), false);
        FLUIGIP.execChangeFields($("#numero"), false);
    } else if (numState == '6') {
        FLUIGIP.execChangeFields($("#bank"), false);
        FLUIGIP.execChangeFields($("#agencia"), false);
        FLUIGIP.execChangeFields($("#numConta"), false);
    } else {
        FLUIGIP.execChangeFields($("#aprova"), false);
        FLUIGIP.execChangeFields($("#dtAprovacao"), false);
        FLUIGIP.execChangeFields($("#motivo"), false);
    }
});
// Libera campos de acordo com a atividade

// CAMPO TDI ZOOM
function zoomBank(obj) {
    var type = $(obj).prev("input").attr("name");
    var filters = "";
    var searchby = "";

    tdizoom.open(
        "ds_banks_gabriel", //Nome do Dataset
        "code,Codigo,fullname,Nome",  //Campos a serem exibidos
        "code,fullname", //Campos de retorno
        "Selecione o Banco...", //Título
        filters, //Filtros
        type, //Type (deve ser sempre o atributo name do campo)
        null, //likefield
        null, //likevalue
        searchby //Campo/Constraint que será buscado o conteudo digitado (Seachby)
    );
}

function setSelectedZoomItem(selectedItem) {
    var name = selectedItem.type.split("___")[0];
    // var indice = selectedItem.type.split("___");

    if (name == "bank") {
        $("#bank").val(selectedItem.code);
        $("#nomeBanco").val(selectedItem.fullname);
    }
}

function removedZoomItem(removedItem) {
    var name = removedItem.split("___")[0];
    // var indice = removedItem.split("___");

    if (name == "bank") {
        $("#bank").val("");
        $("#nomeBanco").val("");
    }
}

// beforeSendValidate
// function beforeSendValidate(numState, nextState) {
//     FLUIGIP.VALID.validateForm();
// }