// $(document).ready(function() {  

// })

// PE do ZOOM padrão Fluig Totvs - No momento que é selecionado um registro no ComboBox
function setSelectedZoomItem(selectedItem) {
    var name = selectedItem.inputId.split("___")[0];
    var indice = selectedItem.inputId.split("___");

    if (indice.length > 1) { //Campos Pai-filho
        var id = indice[1];
    } else { //Campos normais
        if (name == "vendedores") {
            $("#nome").val(selectedItem["colleagueName"]).prop("disabled", true);
            $("#loginUsuario").val(selectedItem["login"]).prop("disabled", true);
        } else if (name == "marcas") {
            reloadZoomFilterValues("veiculos", "MARCA," + selectedItem["Marca"]);
        } else if (name == "veiculos") {
            $("#marca").val(selectedItem["MARCA"]).prop("disabled", true);
            $("#modelo").val(selectedItem["MODELO"]).prop("disabled", true);
            $("#cor").val(selectedItem["COR"]).prop("disabled", true);
            $("#ano").val(selectedItem["ANO"]).prop("disabled", true);
            $("#valor").val(selectedItem["VALOR"]).prop("disabled", true);
        }
    }
}


function formaPgSelecionada() {
    var formaSelecionada = $('#formaPg').val();

    // 1 = Á vista
    // 2 = Financiamento
    // 3 = Entrada + Financiamento
    if (formaSelecionada == "1") {
        $("#inputVlrEntrada").hide(600)
        $("#inputParcelas").hide(600)
        $("#inputJuros").hide(600)
    } else if (formaSelecionada == "2") {
        $("#inputVlrEntrada").hide(600)
        $("#inputParcelas").show(600)
        $("#inputJuros").show(600)
    } else {
        $("#inputVlrEntrada").show(600)
        $("#inputParcelas").show(600)
        $("#inputJuros").show(600)
    }
}


function calculaJuros() {
    var parcelasSelecionadas = $('#parcelas').val();
    var vlrJuros = $("#vlrJuros")

    // 1 = 12x
    // 2 = 24x
    // 3 = 48x
    if (parcelasSelecionadas == "1") {
        vlrJuros.val('3% ao ano')
    } else if (parcelasSelecionadas == "2") {
        vlrJuros.val('5% ao ano')
    } else {
        vlrJuros.val('7% ao ano')
    }
}