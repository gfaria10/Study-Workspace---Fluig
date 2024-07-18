function defineStructure() {
}

function onSync(lastSyncDate) {
}

function createDataset(fields, constraints, sortFields) {

    var dataset = DatasetBuilder.newDataset();

    //Cria as colunas
    dataset.addColumn("cep");
    dataset.addColumn("logradouro");
    dataset.addColumn("complemento");
    dataset.addColumn("bairro");
    dataset.addColumn("localidade");
    dataset.addColumn("uf");

    // Consumindo o ds de CEP que criei no fluig
    var clientService = fluigAPI.getAuthorizeClientService();
    var data = {
        companyId: getValue('WKCompany') + '',
        serviceCode: 'consulta_cep',
        endpoint: '/ws/13483170/json/',
        method: 'get', // 'delete', 'patch', 'put', 'post'
        timeoutService: '100', //segundos
    }

    // Faz a requisição
    var vo = clientService.invoke(JSON.stringify(data));
    // Valida o retorno da requisição
    if (vo.getResult() == null || vo.getResult().isEmpty()) {
        throw new Exception('Retorno está vazio');
    } else {
        log.info(vo.getResult());

        // Transformando o resultado em um obj de volta
        var cep = JSON.parse(vo.getResult());

        //Cria os registros, pegando os itens do retorno da api pelo obj criado acima
        dataset.addRow([
            cep.cep,
            cep.logradouro,
            cep.complemento,
            cep.bairro,
            cep.localidade,
            cep.uf
        ]);
    }

    return dataset;

}

function onMobileSync(user) {
}