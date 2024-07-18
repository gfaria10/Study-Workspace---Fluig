// ====================== BRASILAPI CNPJ ======================
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
        }

    })
}

// Preenche os campos usando ".each"
function preencheDados(dados) {
    $("#uf").val(dados.uf);
    $("#municipio").val(dados.municipio);
}