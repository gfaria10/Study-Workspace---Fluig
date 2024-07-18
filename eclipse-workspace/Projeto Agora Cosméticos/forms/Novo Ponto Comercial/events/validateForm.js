function validateForm(form){
 
    var msg = "";

    if(form.getValue("nome") == "") {
        msg += "O campo nome não foi preenchido. ";
    }

    if(form.getValue("email") == "") {
        msg += "O campo email não foi preenchido. ";
    }

    if(form.getValue("telefone") == "") {
        msg += "O campo telefone não foi preenchido. ";
    }

    if(form.getValue("documentoIdentidade") == "") {
        msg += "O campo Documento de Identidade não foi preenchido. ";
    }

    if(form.getValue("dataNascimento") == "") {
        msg += "O campo Data de Nascimento não foi preenchido. ";
    }

    // Validação dos responsáveis, passando tablename
    var responsaveis = form.getChildrenIndexes("responsaveisTabela")
    if (responsaveis.length == 0) {
        msg += "Nenhum responsável foi selecionado. ";
    }

    // Só irá ser mostrado caso haja erros, ou seja, msg != ""
    if(msg != ""){
        throw "ERRO: " + msg;
    }
}