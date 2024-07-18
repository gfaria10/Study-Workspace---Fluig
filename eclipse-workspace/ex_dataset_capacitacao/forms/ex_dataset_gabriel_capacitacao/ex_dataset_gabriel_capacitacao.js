// $(document).ready(function() {  
	
// })

// PE do ZOOM padrão Fluig Totvs - No momento que é selecionado um registro no ComboBox
function setSelectedZoomItem(selectedItem){
	var name = selectedItem.inputId.split("___")[0];
	var indice = selectedItem.inputId.split("___");
	
	if(indice.length > 1){ //Campos Pai-filho
		var id = indice[1];
	}else{ //Campos normais
	     if(name == "grupos"){
	    	reloadZoomFilterValues("usuarios", "GRUPO," + selectedItem["groupId"]);
		}else if(name == "usuarios"){
	    	$("#nome").val(selectedItem["NOME"]);
	    	$("#usuario").val(selectedItem["LOGIN"]);
			$("#email").val(selectedItem["EMAIL"]);
		}
	}
}