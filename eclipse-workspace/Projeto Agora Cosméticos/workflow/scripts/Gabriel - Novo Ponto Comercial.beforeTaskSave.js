function beforeTaskSave(colleagueId,nextSequenceId,userList){

    // Pega todos o anexos da solicitação
    var anexos = hAPI.listAttachments();
    var temAnexos = false;

    for (i = 0; i < anexos.size(); i++) {
        var anexoAtual = anexos.get(i);
        if (anexoAtual.getDocumentDescription() == "Proposta Comercial.pdf") {
            temAnexos = true;
        }
    }

    if (!temAnexos) {
        throw ("A proposta comercial não foi anexada.");
    }

}