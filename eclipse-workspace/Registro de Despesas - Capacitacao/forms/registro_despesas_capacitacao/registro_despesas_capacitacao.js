// Add linha na tabela PAI X FILHO
function addItem(tablename) {
    var row = wdkAddChild(tablename);
}

// ======================= Validação tipo de despesa =======================
function tipoDespesa() {
    var selecaoDespesa = $("#descricaoDespesa").val()

    if (selecaoDespesa == 'transporte') {
        $('#btnAdicionar').attr('disabled', false);

        FLUIGC.toast({
            title: 'Info: ',
            message: 'Adicione ao formulário as informações sobre o transporte.',
            type: 'info'
        });
    } else {
        $('#btnAdicionar').attr('disabled', true);
    }
}
// ======================= Validação tipo de despesa =======================


// ======================= Validação antes de enviar o formulário com beforeSendValidate =======================
/**
 * @description - Valida os campos no momento do clique de enviar
 *
 * @param {string} numState - Retorna o número da atividade atual
 * @param {string} nextState - Retorna o número da próxima atividade
 * 
 * @returns {boolean}
 */
var beforeSendValidate = function (numState, nextState) {
    var valido = true
    var atividadeDespesasConta = 6
    var atividadeAprovacaoDiretoria = 11

    // Retorna o modo da atividade no momento (ADD, )
    var mode = getFormMode()

    if (numState == atividadeDespesasConta || mode == "ADD") {
        valido = validaCamposObrigatorios(".camposDespesas");
    } else if (numState == atividadeAprovacaoDiretoria) {
        valido = validaCamposObrigatorios(".camposAprovacao");
    } else {
        valido = validaCamposObrigatorios(".camposFinanceiro");
    }

    return valido;
}


/**
 * @description - É usado para validação uma classe para percorrer todos os campos correspondentes
 *
 * @param {string} classeValidacao - Classe que todos os campos correspondentes tem
 */
function validaCamposObrigatorios(classeValidacao) {
    var validaCampos = true

    $(classeValidacao).each(function (i, element) {
        var elementoAtual = $("#" + element.id)

        if (elementoAtual.val() === "") {
            validaCampos = false;
            elementoAtual.parent().addClass('has-error');
        } else if (elementoAtual.val() !== "") {
            elementoAtual.parent().removeClass('has-error');
        }
    });

    if (!validaCampos) {
        FLUIGC.toast({
            title: 'Alerta!',
            message: 'Campo(s) obrigatórios não foram preenchidos.',
            type: 'warning'
        });
    }

    return validaCampos;
}
// ======================= Validação antes de enviar o formulário com beforeSendValidate =======================