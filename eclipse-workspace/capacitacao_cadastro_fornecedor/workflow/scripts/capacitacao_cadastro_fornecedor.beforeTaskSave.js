function beforeTaskSave(colleagueId,nextSequenceId,userList){
	validaAnexoProcesso();
}

function validaAnexoProcesso(){
	
	var activity = getValue("WKNumState"); 

	var attachments = hAPI.listAttachments(); 
	var hasAttachment = attachments.size() > 0 ? true : false; // verifica se possui anexo anexo na solicitação 

	if (!hasAttachment) { 
		throw "Não foi adicionado nenhum anexo no processo!"; 
		
	}
}