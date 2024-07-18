// ---------- Valida CEP digitado ----------
function cepDigitadoValido(cepDigitado) {
    var regexCep = /^\d{5}-?\d{3}$/;
    return regexCep.test(cepDigitado);
}

// Consumo da API do ViaCEP
function consultaCEP() {
    var cepDigitado = $('#cep').val();

    // Valida se o CEP digitado foi válido ou não, usando REGEX
    if (!cepDigitadoValido(cepDigitado)) {
        FLUIGC.toast({
            title: 'CEP incorreto: ',
            message: 'Por favor valide o CEP digitado.',
            type: 'danger'
        });
        return;
    }

    $.ajax({
        url: "https://viacep.com.br/ws/" + cepDigitado + "/json/",
        type: "GET",
        dataType: "json",

        // Em caso de sucesso, preenche os campos automaticamente
        success: function (data) {
            // Caso passou da validação do Regex, mas o CEP não existe, entra no if com o retorno de erro da API
            if (data.erro) {
                FLUIGC.toast({
                    title: 'CEP não encontrado: ',
                    message: 'CEP inexistente, favor digitar novamente.',
                    type: 'warning'
                });
            } else {
                FLUIGC.toast({
                    title: 'CEP encontrado: ',
                    message: 'Os campos foram preenchidos automaticamente.',
                    type: 'success'
                });

                $('#logradouro').val(data.logradouro);
                $('#bairro').val(data.bairro);
                $('#cidade').val(data.localidade);
                $('#estado').val(data.uf);
            }
        },

        error: function () {
            FLUIGC.toast({
                title: 'Servidor indisponível: ',
                message: 'O serviço de consulta ao CEP está indisponível.',
                type: 'warning'
            });
        }

    })
}
// ---------- Valida CEP digitado ----------

// ----------    POST PROTHEUS    ----------
function criaItemProtheus() {
    // Monta o objeto JSON com os dados
    var itemData = {
        codigo: $('#codCliente').val(),
        cep: $('#cep').val(),
        logradouro: $('#logradouro').val(),
        complemento: $('#complemento').val(),
        bairro: $('#bairro').val(),
        localidade: $('#cidade').val(),
        uf: $('#estado').val()
    };

    $.ajax({
        url: "https://b4f7-200-246-100-82.ngrok-free.app/rest/cadastro_cep",
        type: "POST",
        contentType: "application/json",
        headers: {
            "Content-Type": "application/json",
            "tenantId": "99,01"
        },
        data: JSON.stringify(itemData),

        success: function (response) {
            FLUIGC.toast({
                title: 'Sucesso: ',
                message: 'Item criado com sucesso no Protheus.',
                type: 'success'
            });
        },

        error: function (error) {
            FLUIGC.toast({
                title: 'Erro: ',
                message: 'Falha ao criar o item no Protheus. ' + error.responseText,
                type: 'danger'
            });
        }
    });
}
