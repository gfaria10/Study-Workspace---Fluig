function displayFields(form, customHTML) {
    var mode = form.getFormMode();
    var state = getValue("WKNumState");

    // Usando o customHTML para adicionar códigos JS antes da abertura do formulário
    customHTML.append("<script>");
    customHTML.append("		function getFormMode(){ return '" + mode + "'};");
    customHTML.append("		function getWKNumState(){ return '" + state + "'};");

    bloqueiaCampos(customHTML);

    customHTML.append("</script>");

    // Pega o usuário logado
    var user = getValue('WKUser');
    form.setValue('solicitante', user);

    // Pega o email do usuário logado consultando o dataset
    form.setValue('emailSolicitante', buscaEmailUsuario(user));
}

function buscaEmailUsuario(filtro) {
    // Criando constraint para buscar usuário
    var campo = ""
    var constraint = DatasetFactory.createConstraint("colleaguePK.colleagueId", filtro, filtro, ConstraintType.MUST);
    var grupoFiltro = new Array(constraint);
    var dataset = DatasetFactory.getDataset("colleague", null, grupoFiltro, null);

    if (dataset != null && dataset.rowsCount != undefined && dataset.rowsCount > 0) {
        campo = dataset.getValue(0, "mail");
    }

    // Após consultar o Ds retorna o campo email
    return campo
}


function bloqueiaCampos(customHTML) {
    // Dados da solicitação
    customHTML.append(" $('#razao_social').attr('readonly', true); \n"); // Campo input normal
    customHTML.append(" $('#nome_fantasia').attr('readonly', true); \n");
    customHTML.append(" $('#cpf_representante_legal').attr('readonly', true); \n");
    customHTML.append(" $('#ddd_telefone_1').attr('readonly', true); \n");

    // Endereço
    customHTML.append(" $('#cep').attr('readonly', true); \n");
    customHTML.append(" $('#uf').attr('readonly', true); \n");
    customHTML.append(" $('#municipio').attr('readonly', true); \n");
    customHTML.append(" $('#logradouro').attr('readonly', true); \n");
    customHTML.append(" $('#numero').attr('readonly', true); \n");
    customHTML.append(" $('#bairro').attr('readonly', true); \n");

    // Contabilidade
    customHTML.append(" $('#descContabil').attr('readonly', true); \n");

    // Financeiro
    customHTML.append(" $('#nomeBanco').attr('readonly', true); \n");

    // customHTML.append(" $('"+id+"').on('mousedown', function(e) { e.preventDefault(); }); \n"); // Campo select
}