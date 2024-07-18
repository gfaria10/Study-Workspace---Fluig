// ======================= Manipulações no formulário =======================

/**
*@param {string} name - Thea odhasod ua
*/
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


/**
 * @description - Executa uma ação a partir de uma remoção em um campo zoom
 *
 * @param {object} removedItem - Retorna o objeto selecionado
 * @returns {void} - Não há retornos
 */
function setSelectedZoomItem(selectedItem) {
    var name = selectedItem.inputId.split("___")[0];
    var indice = selectedItem.inputId.split("___");

    if (indice.length > 1) { //Campos Pai-filho
        var id = indice[1];
    } else { //Campos normais
        if (name == "protheusProduto") {
            $("#codProduto").val(selectedItem["CODIGO"]);
            $("#descProduto").val(selectedItem["DESCRICAO"]);
        }
    }
}

/**
 * @description - Executa uma ação a partir de uma remoção em um campo zoom
 *
 * @param {object} removedItem - Retorna o objeto selecionado
 * @returns {void} - Não há retornos
 */
function removedZoomItem(removedItem) {
    var name = removedItem.inputId.split("___")[0];
    var indice = removedItem.inputId.split("___");

    if (indice.length > 1) { //Campos Pai-filho
        var id = indice[1];
    } else { //Campos normais
        if (name == "protheusProduto") {
            $("#codProduto").val('');
            $("#descProduto").val('');
        }
    }
}

function setFilterZoom() {
    if (window['data-protheusProduto'] == undefined) {
        setTimeout(setFilterZoom, 500);
    } else { //Aqui você vai chamar suas funções para bloquear o zoom 
        window["protheusProduto"].disable(true);
        window["protheusProduto"].disabled = true;
    }
}
// ======================= Manipulações no formulário =======================


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
    var atividadeCadastro = 6
    var atividadeProduto = 9
    var atividadeVendaProduto = 11
    var atividadeAprovacao = 13

    // Retorna o modo da atividade no momento (ADD, )
    var mode = getFormMode()

    if (numState == atividadeCadastro || mode == "ADD") {
        valido = validaCamposObrigatorios(".camposCadastro");
    } else if (numState == atividadeProduto) {
        valido = validaCamposObrigatorios(".camposProduto");
    } else if (numState == atividadeVendaProduto) {
        valido = validaCamposObrigatorios(".camposVenda");
    } else {
        valido = validaCamposObrigatorios(".camposAprovacao");
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