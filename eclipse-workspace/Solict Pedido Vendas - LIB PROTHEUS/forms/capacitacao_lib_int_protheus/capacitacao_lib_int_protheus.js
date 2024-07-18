$(document).ready(function () {
    // Preechendo campos bases automaticamente
    $("#dtSolicitacao").val(FLUIGIP.USEFUL.getDate());
});


// Redirect para o cadastro complementar
function openDocGed(){
    var url = parent.WCMAPI.serverURL + parent.WCMAPI.protectedContextPath + "/" + parent.WCMAPI.tenantCode + "/pageworkflowview?processID=capacitacao_cadastro_cliente_lib"
    window.open(url, "_blank");
}


// ================= Funções da tabela PAI X FILHO
function addItem(nomeTabela) {
    FLUIGIP.TABLE.addTableChild(nomeTabela);
}

function clearItens(nomeTabela) {
    FLUIGIP.TABLE.clearTable(nomeTabela, "Todos os itens foram excluídos!");
    calculaValorTotal(); // Chama a função para recalcular, visto que foi removido itens
}

function removeItem(linhaAtual) {
    fnWdkRemoveChild(linhaAtual);
    calculaValorTotal(); // Chama a função para recalcular, visto que foi removido itens
}
// ================= Funções da tabela PAI X FILHO


// Soma dos valores dos produtos
function calculaValores(obj) {
    // Caso não preencha nada de valores
    if (!obj.value) {
        obj.value = 0
    }

    // Separa o nome fixo '#id___' + o número da linha que é dinâmico
    var idAtual = obj.id.split('___')[1];
    var qtdProduto = parseFloat($('#qtdProd___' + idAtual).val())
    var valorProduto = parseInt($('#valorProd___' + idAtual).val())

    var vlrTotalLinha = qtdProduto * valorProduto

    if (!isNaN(qtdProduto) && !isNaN(valorProduto)) {
        $('#valorTotalLinha___' + idAtual).val(vlrTotalLinha.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }));
        // Calcula valor total de todas as linhas
        calculaValorTotal();
    }

}

function calculaValorTotal() {
    let somaTotal = 0;

    // Utilizando uma classe para percorrer por todos os campos mais facilmente
    $('.campoValorTotal:not(:first)').each(function (i, value) {
        let valor = parseFloat($("#" + value.id).val().replace('R$', '').trim().replace('.', '').replace(',', '.'));

        somaTotal += valor;
    });

    $('#valorTotal').val(somaTotal.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }));
}