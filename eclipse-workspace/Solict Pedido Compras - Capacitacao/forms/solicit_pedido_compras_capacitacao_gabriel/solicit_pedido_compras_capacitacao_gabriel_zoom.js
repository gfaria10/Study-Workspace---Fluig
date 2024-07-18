// CAMPO TDI ZOOM
function zoomFornecedor(obj) {
    var type = $(obj).prev("input").attr("name");
    var filters = "";
    var searchby = "";

    tdizoom.open(
        "cadastro_compl_fornecedor_gabriel", //Nome do Dataset
        "cnpj,CNPJ,codigo,Código,empresa,Empresa,filial,Filial",  //Campos a serem exibidos
        "codigo,cnpj,empresa,filial,uf,municipio", //Campos de retorno
        "Selecione o fornecedor...", //Título
        filters, //Filtros
        type, //Type (deve ser sempre o atributo name do campo)
        null, //likefield
        null, //likevalue
        searchby //Campo/Constraint que será buscado o conteudo digitado (Seachby)
    );
}
// CAMPO TDI ZOOM

function setSelectedZoomItem(selectedItem) {
    var name = selectedItem.type.split("___")[0];
    var indice = selectedItem.type.split("___");

    if (indice.length > 1) { //Campos Pai-filho
        var id = indice[1];
        if (name == "codProd") {
            $("#codProd___" + id).val(selectedItem.codigo);
            $("#descricaoProd___" + id).val(selectedItem.descricao);
            $("#UM___" + id).val(selectedItem.um);
            $("#tipoProd___" + id).val(selectedItem.tipo);
        }
    } else {
        if (name == "codFornecedor") {
            $("#codCliente").val(selectedItem.codigo + ' - ' + selectedItem.empresa);
            $("#nomeCliente").val(selectedItem.empresa);
            $("#cnpjCliente").val(selectedItem.cnpj);
            $("#ufCliente").val(selectedItem.uf);
            $("#municipioCliente").val(selectedItem.municipio);
        }
    }
}

function removedZoomItem(removedItem) {
    var name = removedItem.split("___")[0];
    var indice = removedItem.split("___");

    if (indice.length > 1) { //Campos Pai-filho
        var id = indice[1];
        if (name == "codProd") {
            $("#codProd___" + id).val("");
            $("#descricaoProd___" + id).val("");
            $("#UM___" + id).val("");
            $("#tipoProd___" + id).val("");
        }
    } else {
        if (name == "codCliente") {
            $("#codCliente").val("");
            $("#nomeCliente").val("");
            $("#cnpjCliente").val("");
            $("#ufCliente").val("");
            $("#municipioCliente").val("");
        }
    }
}
