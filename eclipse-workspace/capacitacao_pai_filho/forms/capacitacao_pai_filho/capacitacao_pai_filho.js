$(document).ready(function() {
	var usuario = getWKUser()
});

function setSelectedZoomItem(selectedItem){
	var name = selectedItem.inputId.split("___")[0];
	var indice = selectedItem.inputId.split("___");

    if(indice.length > 1){ //Campos Pai-filho
        var id = indice[1];
        if(name == "protheusProduto"){
            $("#_codProduto___" + id).val(selectedItem.CODIGO);
            $("#_descProduto___" + id).val(selectedItem.DESCRICAO);
        }
    }
}


function addItem(tablename) {
    var row = wdkAddChild(tablename);
}
