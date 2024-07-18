function displayFields(form, customHTML) {
    var mode = form.getFormMode();
    var state = getValue("WKNumState");

    // Usando o customHTML para adicionar códigos JS antes da abertura do formulário
    customHTML.append("<script>");
    customHTML.append("		function getFormMode(){ return '" + mode + "'};");
    customHTML.append("		function getWKNumState(){ return '" + state + "'};");

    bloqueiaCampos(state, mode, customHTML);

    customHTML.append("</script>");
}

function bloqueiaCampos(state, mode, customHTML) {
    var atividadeDespesasConta = 6
    var atividadeAprovacaoDiretoria = 11

    // Bloqueia botão de adicionar linha no PAI X FILHO
    customHTML.append(" $('#btnAdicionar').attr('disabled', true); \n");

    if (state == atividadeDespesasConta || mode == 'ADD') {
        customHTML.append(" $('#aprova').on('mousedown', function(e) { e.preventDefault(); }); \n");
        customHTML.append(" $('#aprova').attr('readonly', true); \n");
        customHTML.append(" $('#observacoesAprova').attr('disabled', true); \n");

        customHTML.append(" $('#dtReembolso').attr('disabled', true); \n");
        customHTML.append(" $('#observacoes').attr('disabled', true); \n");
        customHTML.append(" $('#observacoesFinanc').attr('disabled', true); \n");
    } else if (state == atividadeAprovacaoDiretoria) {
        customHTML.append(" $('#situacao').attr('disabled', true); \n");
        customHTML.append(" $('#dataOcorrencia').attr('disabled', true); \n");
        customHTML.append(" $('#nome').attr('disabled', true); \n");
        customHTML.append(" $('#descricaoDespesa').attr('disabled', true); \n");
        customHTML.append(" $('#motivo').attr('disabled', true); \n");

        customHTML.append(" $('#agencia').attr('disabled', true); \n");
        customHTML.append(" $('#contaCorrente').attr('disabled', true); \n");
        customHTML.append(" $('#agenciaBase').attr('disabled', true); \n");
    } else {
        customHTML.append(" $('#situacao').attr('disabled', true); \n");
        customHTML.append(" $('#dataOcorrencia').attr('disabled', true); \n");
        customHTML.append(" $('#nome').attr('disabled', true); \n");
        customHTML.append(" $('#descricaoDespesa').attr('disabled', true); \n");
        customHTML.append(" $('#motivo').attr('disabled', true); \n");

        customHTML.append(" $('#agencia').attr('disabled', true); \n");
        customHTML.append(" $('#contaCorrente').attr('disabled', true); \n");
        customHTML.append(" $('#agenciaBase').attr('disabled', true); \n");

        customHTML.append(" $('#aprova').on('mousedown', function(e) { e.preventDefault(); }); \n");
        customHTML.append(" $('#aprova').attr('readonly', true); \n");
        customHTML.append(" $('#observacoesAprova').attr('disabled', true); \n");
    }
}