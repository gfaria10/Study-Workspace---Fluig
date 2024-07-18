// CAMPO TDI ZOOM
function zoomClientes(obj) {
    var type = $(obj).prev("input").attr("name");
    var filters = "";
    var searchby = "";

    tdizoom.open(
        "capacitacao_cadastro_cliente_lib", //Nome do Dataset
        "codigo,Código,cnpj,CNPJ,empresa,Empresa,filial,Filial",  //Campos a serem exibidos
        "codigo,cnpj,empresa,filial,uf,municipio", //Campos de retorno
        "Selecione o cliente...", //Título
        filters, //Filtros
        type, //Type (deve ser sempre o atributo name do campo)
        null, //likefield
        null, //likevalue
        searchby //Campo/Constraint que será buscado o conteudo digitado (Seachby)
    );
}

function zoomProduto(obj) {
    var type = $(obj).prev("input").attr("name");
    var filters = "";
    var searchby = "";

    tdizoom.open(
        "consulta_cadastro_produto_protheus", //Nome do Dataset
        "codigo,Codigo,descricao,Descrição,um,Unidade Medida,tipo,Tipo",  //Campos a serem exibidos
        "codigo,descricao,um,tipo", //Campos de retorno
        "Selecione...", //Título
        filters,
        type, //Type (deve ser sempre o atributo name do campo)
        null, //likefield
        null, //likevalue
        searchby //Campo/Constraint que será buscad o o conteudo digitado (Seachby)
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
        if (name == "codCliente") {
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
