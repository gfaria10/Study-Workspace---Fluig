function displayFields(form, customHTML) {
    var mode = form.getFormMode();
    var state = getValue("WKNumState");

    // Usando o customHTML para adicionar códigos JS antes da abertura do formulário
    customHTML.append("<script>");
    customHTML.append("		function getFormMode(){ return '" + mode + "'};");
    customHTML.append("		function getWKNumState(){ return '" + state + "'};");

    bloqueiaCampos(state, mode, customHTML);

    customHTML.append("</script>");

    // pega o usuario logado
    var usuario = getValue('WKUser');
    form.setValue('solicitante', usuario);
    form.setValue('emailSolicitante', buscaEmailUsuario(usuario));
}

function buscaEmailUsuario(usuario) {
    var email = ''
    // Primeiro monta a constraint
    var constraint = DatasetBuilder.createConstraint('colleaguePK.colleagueId', usuario, usuario, ConstraintType.MUST);
    // Após, consulta o dataset, no caso, colleague, passando a constraint criada como array
    var consultaDs = DatasetFactory.getDataset("colleague", null, [constraint], null);

    if (consultaDs != null && consultaDs.rowsCount != undefined && consultaDs.rowsCount > 0) {
        email = consultaDs.getValue(0, 'mail')
    }

    return email;
}


/**
 * @description - Bloqueia os campos para cada atividade
 *
 * @param {number} state - Número da atividade atual
 * @param {string} customHTML - Possibilidade de alterar o HTML
 */
function bloqueiaCampos(state, mode, customHTML) {
    var atividadeCadastro = 6
    var atividadeProduto = 9
    var atividadeVendaProduto = 11
    // var atividadeAprovacao = 13

    // Campos que sempre estarão bloqueados, independente da atividade
    customHTML.append(" $('#municipio').attr('readonly', true); \n"); // Campo input normal
    customHTML.append(" $('#uf').attr('readonly', true); \n");
    customHTML.append(" $('#logradouro').attr('readonly', true); \n");
    customHTML.append(" $('#bairro').attr('readonly', true); \n");
    customHTML.append(" $('#descProduto').attr('readonly', true); \n");
    customHTML.append(" $('#codProduto').attr('readonly', true); \n");

    if (state == atividadeCadastro || mode == 'ADD') {
        customHTML.append(" $('#protheusProduto').prop('disabled', true); \n"); // Exemplo campo zoom
        customHTML.append(" $('#fornecedorProduto').attr('readonly', true); \n");
        customHTML.append(" $('#categoriaProduto').attr('readonly', true); \n");
        customHTML.append(" $('#marcaProduto').attr('readonly', true); \n");
        customHTML.append(" $('#quantidadeEstoque').attr('readonly', true); \n");

        customHTML.append(" $('#valorBase').attr('readonly', true); \n");
        customHTML.append(" $('#valorVenda').attr('readonly', true); \n");
        customHTML.append(" $('#codigoBarras').attr('readonly', true); \n");

        customHTML.append(" $('#aprova').on('mousedown', function(e) { e.preventDefault(); }); \n"); // campo select
        customHTML.append(" $('#aprova').attr('readonly', true); \n"); // campo select
        customHTML.append(" $('#dtAprovacao').attr('readonly', true); \n");
        customHTML.append(" $('#motivo').attr('readonly', true); \n");
    } else if (state == atividadeProduto) {
        customHTML.append(" $('#cpf').attr('readonly', true); \n");
        customHTML.append(" $('#cep').attr('readonly', true); \n");

        customHTML.append(" $('#valorBase').attr('readonly', true); \n");
        customHTML.append(" $('#valorVenda').attr('readonly', true); \n");
        customHTML.append(" $('#codigoBarras').attr('readonly', true); \n");

        customHTML.append(" $('#aprova').on('mousedown', function(e) { e.preventDefault(); }); \n"); // campo select
        customHTML.append(" $('#aprova').attr('readonly', true); \n"); // campo select
        customHTML.append(" $('#dtAprovacao').attr('readonly', true); \n");
        customHTML.append(" $('#motivo').attr('readonly', true); \n");
    } else if (state == atividadeVendaProduto) {
        customHTML.append(" $('#cpf').attr('readonly', true); \n");
        customHTML.append(" $('#cep').attr('readonly', true); \n");

        customHTML.append(" $('#protheusProduto').prop('disabled', true); \n"); // Exemplo campo zoom
        customHTML.append(" $('#fornecedorProduto').attr('readonly', true); \n");
        customHTML.append(" $('#categoriaProduto').attr('readonly', true); \n");
        customHTML.append(" $('#marcaProduto').attr('readonly', true); \n");
        customHTML.append(" $('#quantidadeEstoque').attr('readonly', true); \n");

        customHTML.append(" $('#aprova').on('mousedown', function(e) { e.preventDefault(); }); \n"); // campo select
        customHTML.append(" $('#aprova').attr('readonly', true); \n"); // campo select
        customHTML.append(" $('#dtAprovacao').attr('readonly', true); \n");
        customHTML.append(" $('#motivo').attr('readonly', true); \n");
    } else {
        customHTML.append(" $('#cpf').attr('readonly', true); \n");
        customHTML.append(" $('#cep').attr('readonly', true); \n");

        customHTML.append(" $('#protheusProduto').prop('disabled', true); \n"); // Exemplo campo zoom
        customHTML.append(" $('#fornecedorProduto').attr('readonly', true); \n");
        customHTML.append(" $('#categoriaProduto').attr('readonly', true); \n");
        customHTML.append(" $('#marcaProduto').attr('readonly', true); \n");
        customHTML.append(" $('#quantidadeEstoque').attr('readonly', true); \n");

        customHTML.append(" $('#valorBase').attr('readonly', true); \n");
        customHTML.append(" $('#valorVenda').attr('readonly', true); \n");
        customHTML.append(" $('#codigoBarras').attr('readonly', true); \n");
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
