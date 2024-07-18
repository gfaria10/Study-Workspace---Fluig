function displayFields(form, customHTML) {
    var mode = form.getFormMode();
    var state = getValue("WKNumState");
    var complete = getValue("WKCompletTask");
    var user = getValue("WKUser");
    var locale = getValue("WKUserLocale");
    var mobile = form.getMobile();
    var processo = getValue("WKNumProces");

    if (form.getFormMode() == "VIEW") {
        form.setShowDisabledFields(true);
    }
    customHTML.append("<script>");
    customHTML.append("		function getFormMode(){ return '" + mode + "'};");
    customHTML.append("		function getMobile(){ return '" + mobile + "'};");
    customHTML.append("		function getWKNumState(){ return '" + state + "'};");
    customHTML.append("		function getWKUser(){ return '" + user + "'};");
    customHTML.append("		function getWKNumProces(){ return '" + processo + "'};");
    customHTML.append("		function getWKUserLocale(){ return '" + locale + "'};");
    customHTML.append("</script>");

    getUser = getInfoUsuario(user);
    form.setValue('emailFuncionario', getUser[0]);
    form.setValue('funcionario', user);
}

// Usando aqui para consumir dataset, no front end não reconheceu o DatasetFactory
function getInfoUsuario(user) {
    // Criando constraint para buscar usuário
    var arrayRetorno = []
    var constraints = []
    
    constraints.push(DatasetFactory.createConstraint("colleaguePK.colleagueId", user, user, ConstraintType.MUST));
    var dataset = DatasetFactory.getDataset("colleague", ["mail", "colleagueName"], constraints, null);

    if (dataset != null && dataset.rowsCount != undefined && dataset.rowsCount > 0) {
        email = dataset.getValue(0, "mail");
        nome = dataset.getValue(0, "colleagueName");
        arrayRetorno = new Array(email, nome);
    }

    // Após consultar o Ds retorna um array com os campos
    return arrayRetorno
}