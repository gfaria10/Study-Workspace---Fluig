// $(document).ready(function () {

// });

// Valida CEP digitado
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
