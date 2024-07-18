function validateForm(form){
    
	// Dados da conta contábil
	if (form.getValue('codigo') == null || form.getValue('codigo') == '') {
	    throw 'O campo "Código" não foi preenchido.';
	}
	
	if (form.getValue('descricao') == null || form.getValue('descricao') == '') {
	    throw 'O campo "Descrição" não foi preenchido.';
	}
}