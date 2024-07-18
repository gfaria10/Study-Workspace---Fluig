$(document).ready(function() {  
	
})

// PE do ZOOM padrão Fluig Totvs - No momento que é selecionado um registro no ComboBox
function setSelectedZoomItem(selectedItem){
	var name = selectedItem.inputId.split("___")[0];
	var indice = selectedItem.inputId.split("___");
	
	if(indice.length > 1){ //Campos Pai-filho
		var id = indice[1];
	}else{ //Campos normais
	     if(name == "codigoAlteracao"){
	    	$("#filial").val(selectedItem["filial"]);
	    	$("#codigo").val(selectedItem["codigo"]);
			$("#empresa").val(selectedItem["empresa"]);
		}else if(name == "codigoContaContabil"){
			$("#contaContabil").val(selectedItem["Descricao"]);
		}
	}
}

//PE do ZOOM padrão Fluig Totvs - Acionado no momento que a informação e removida
function removedZoomItem(removedItem){
		
	var name = removedItem.inputId.split("___")[0];
	var indice = removedItem.inputId.split("___");
	
	if(indice.length > 1){ //Campos Pai-filho
		var id = indice[1];

	}else{ //Campos normais
		if(name == "codigoAlteracao"){
			$("#filial").val('');
			$("#empresa").val('');
		}else if(name == "codigoContaContabil"){
			$("#contaContabil").val('');
		}
	}
}

function validaTipoSolicitacao(){
	
 var tipoSolcitacao = $("#tipo_solicitacao").val()
    
    // Verifico se é tipo inclusão ou alteração 
	if(tipoSolcitacao =="1"){
		$("#empresa_cadastrada").hide(600)
		$("#empresa_nova").show(600)
        liberaBloqueiaCampos(".dadosCadastrais",false)
		limpaCampos(tipoSolcitacao)

	}else{
		$("#empresa_cadastrada").show(600)
		$("#empresa_nova").hide(600)
		liberaBloqueiaCampos(".dadosCadastrais",true)
		limpaCampos(tipoSolcitacao)
	}
}

function limpaCampos(tipoSolcitacao){

	// limpa os campos ZOOM
    $('select').each(function() {
		//documentacao attr: https://api.jquery.com/attr/
		var type = $(this).attr('type');
		if (type== "zoom"){
			idCampo = this.id
			window[idCampo].clear();
		}
	})
    $(".dadosCadastrais").val('')
	$(".contabilidade").val('')
	$(".financeiro").val('')
}

function liberaBloqueiaCampos(elemento,booleano){
	$(elemento).prop('readonly', booleano)
}
