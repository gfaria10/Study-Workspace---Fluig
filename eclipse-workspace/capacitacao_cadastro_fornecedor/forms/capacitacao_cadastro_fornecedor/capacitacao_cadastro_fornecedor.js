// ========================== Manipulação das seções em solicitações ==========================
$(document).ready(function () {
    atividadeAtual = getWKNumState();
    mode = getFormMode();
    ocultaSecao(atividadeAtual, mode);
})

function ocultaSecao(atividadeAtual, mode) {
    if (atividadeAtual != 'null') {

        var atividadeSolicitante = 4;
        var atividadeFinanceiro = 11;
        var atividadeContabilidade = 9;

        // Esconde todas as abas, inicialmente
        $("#abaSolicitacao").parent().hide();
        $("#dadosSolicitacao").hide();

        $("#abaContabilidade").parent().hide();
        $("#contabilidade").hide();

        $("#abaFinanceiro").parent().hide();
        $("#financeiro").hide();

        $("#abaDiretoria").parent().hide();
        $("#diretoria").hide();

        // Mostra e define a aba ativa conforme a atividade atual
        if (atividadeAtual == atividadeSolicitante || mode == "ADD") {
            $("#abaSolicitacao").parent().show().addClass('active');
            $("#dadosSolicitacao").show();
        } else if (atividadeAtual == atividadeFinanceiro) {
            $("#abaFinanceiro").parent().show().addClass('active');
            $("#financeiro").show();
        } else if (atividadeAtual == atividadeContabilidade) {
            $("#abaContabilidade").parent().show().addClass('active');
            $("#contabilidade").show();
        } else {
            $("#abaDiretoria").parent().show().addClass('active');
            $("#diretoria").show();
        }
    }
}
// ========================== Manipulação das seções em solicitações ==========================


// ========================== Manipulação de formulário ==========================
var dtAprovacaoCalendar = FLUIGC.calendar('#dtAprovacao');

function formataCNPJ(cnpjDigitado) {
    return cnpjDigitado.replace(/[^\d]/g, '');
}

// Consumo da API da Receita Federal
function consultaCNPJ() {
    var cnpjDigitado = $('#cnpj').val();
    // Caso tenha preenchido com um CNPJ válido e depois tenha apagado
    if (!cnpjDigitado) {
        limpaCampos();
    }
    var cnpjSemFormatacao = formataCNPJ(cnpjDigitado);

    $.ajax({
        url: "https://brasilapi.com.br/api/cnpj/v1/" + cnpjSemFormatacao,
        type: "GET",
        dataType: "json",

        // Em caso de sucesso, preenche os campos automaticamente
        success: function (data) {
            FLUIGC.toast({
                title: 'CNPJ ' + cnpjSemFormatacao + ' encontrado: ',
                message: 'Os campos foram preenchidos automaticamente.',
                type: 'success'
            });

            preencheDados(data)
        },

        error: function (jqXHR) {
            FLUIGC.toast({
                title: 'ERRO: ',
                message: jqXHR.responseJSON.message,
                type: 'danger'
            });

            limpaCampos();
        }

    })
}

// Preenche os campos usando ".each"
function preencheDados(dados) {
    $.each(dados, function (campo, valor) {
        if (campo != 'cnpj') {

            // Valida se o campo é qsa (array que contém o cpf do representante)
            if (campo == 'qsa') {
                campo = 'cpf_representante_legal'
                valor = valor[0].cpf_representante_legal
            }

            $("#" + campo).val(valor);
        }
    });
}

// Limpa os campos em caso de trocar um CNPJ VÁLIDO para INVÁLIDO
function limpaCampos() {
    $('.cnpjAPI').val('');
}

// Preenchimento da conta contábil pós seleção do campo zoom
function setSelectedZoomItem(selectedItem) {
    var name = selectedItem.inputId.split("___")[0];
    var indice = selectedItem.inputId.split("___");

    if (indice.length > 1) { //Campos Pai-filho
        var id = indice[1];
    } else { //Campos normais
        if (name == "contaContabil") {
            $("#descContabil").val(selectedItem["descricao"]);
        } else if (name == "bank") {
            $("#nomeBanco").val(selectedItem["fullname"]);
        }
    }
}

// Realiza ações após excluir um item do zoom
function removedZoomItem(removedItem) {
    var name = removedItem.inputId.split("___")[0];
    var indice = removedItem.inputId.split("___");

    if (indice.length > 1) { //Campos Pai-filho
        var id = indice[1];
    } else { //Campos normais
        if (name == "contaContabil") {
            $("#descContabil").val("");
        } else if (name == "bank") {
            $("#nomeBanco").val("");
        }
    }
}
// ========================== Manipulação de formulário ==========================

// ========================== Valida campos obrigatórios ==========================
var beforeSendValidate = function (numState, nextState) {
    var valida = true
    var atividadeSolicitante = 4
    var atividadeFinanceiro = 11
    var atividadeContabilidade = 9
    var mode = getFormMode()

    // Para realizar a validação, é criado uma classe e aplicada em cada input correspondente
    if (numState == atividadeSolicitante || mode == "ADD") {
        valida = validaCamposObrigatorios(".dadosSolicitacao")
    } else if (atividadeAtual == atividadeFinanceiro) {
        valida = validaCamposObrigatorios(".financeiro")
    } else if (atividadeAtual == atividadeContabilidade) {
        valida = validaCamposObrigatorios(".contabilidade")
    } else {
        valida = validaCamposObrigatorios(".diretoria")
    }

    return valida
}

function validaCamposObrigatorios(classeValidacao) {
    var validaCampos = true

    // Usando a função each do jQuery para percorrer os elementos que possuem a classe validação, utilizado para validar os campos obrigatórios
    $(classeValidacao).each(function (i, element) {

        // valida o campo tipo zoom
        var type = this.type
        if (type == "zoom") {
            idCampo = this.id
            window[idCampo].clear();
            value = $("#" + element.id).val()[0]
        } else {
            value = $("#" + element.id).val()
        }

        // Valida o preenchimento do campo obrigatório posicionado 
        if (value == "") {
            // Adiciona classe obrigatório para mudar a cor da borda do input para vermelho como (obrigatório)
            $(this).addClass('obrigatorio');

            // Verifica se o asterisco já existe
            if (!$(this).parent().find('span').length) {

                // Adiciona o asterisco acima do campo
                $('<span class="asterisco">*</span>').insertBefore($(this));
            }
            validaCampos = false
        } else {
            // Remove a classe obrigatorio 
            $(this).removeClass('obrigatorio');

            // Remove o elemento span com asterisco vermelho
            $(this).parent().find('span').remove();
        }
    });

    if (!validaCampos) {
        FLUIGC.toast({
            title: 'Alerta!',
            message: 'Campo(s) obrigatórios não foram preenchidos',
            type: 'warning'
        });
    }

    return validaCampos
}

