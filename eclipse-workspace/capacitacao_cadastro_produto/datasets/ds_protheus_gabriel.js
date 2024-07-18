function createDataset(fields, constraints, sortFields) {
    var dataset = DatasetBuilder.newDataset();

    dataset.addColumn("FILIAL");
    dataset.addColumn("DESCRICAO");
    dataset.addColumn("CODIGO");

    try {
        var clientService = fluigAPI.getAuthorizeClientService();
        var data = {
            companyId: getValue("WKCompany") + '',
            serviceCode: 'WSPROTHEUSGABRIEL', // código usado no cadastro do serviço
            endpoint: '/api/acproduct/v1/products',
            method: 'get',
            timeoutService: '100', // timeout do serviço em ms
        };

        // O objeto data montado para realizar a requisição precisa ser convertido para um texto para ser enviado
        var vo = clientService.invoke(JSON.stringify(data));

        if (vo.getResult() == null || vo.getResult().isEmpty()) {
            throw "O retorno está vazio";
        } else {
            var json = JSON.parse(vo.getResult());

            // Verifique se 'items' existe e é um array
            if (Array.isArray(json.items)) {
                json.items.forEach(function (item, index) {
                    dataset.addRow(new Array(item.filial, item.descri, item.codigo));
                });
            }
        }
    } catch (err) {
        log.error("Ocorreu um erro desconhecido: " + err);
        throw "Ocorreu um erro desconhecido";
    }

    return dataset;
}
