// function createDataset(fields, constraints, sortFields) {
//     var dataset = DatasetBuilder.newDataset();
//     var Url = 'https://brasilapi.com.br/api/banks/v1'
//     var myApiConsumer = oauthUtil.getGenericConsumer("","","","")
//     var dados = myApiConsumer.get(Url)
//     var json = JSON.parse(dados)

//     //Cria as colunas
//     dataset.addColumn("ispb");
//     dataset.addColumn("name");
//     dataset.addColumn("code");
//     dataset.addColumn("fullname");

//     json.map(function(item){
//         dataset.addRow(new Array(item.ispb, item.name, item.code, item.fullName));
//     })

//     return dataset;
// }

function createDataset(fields, constraints, sortFields) {
    var dataset = DatasetBuilder.newDataset();
    
    //Cria as colunas
    dataset.addColumn("ispb");
    dataset.addColumn("name");
    dataset.addColumn("code");
    dataset.addColumn("fullname");
    
    
    log.info("INÍCIO CONSULTA BRASILAPI");
    try {
        // var serviceName = 'BrasilAPIGabriel'
        var clientService = fluigAPI.getAuthorizeClientService();
        var data = {
            companyId : getValue("WKCompany") + '',
            serviceCode: 'BrasilAPIGabriel', // código usado no cadastro do serviço
            endpoint: '/banks/v1',
            method: 'get',
            timeoutService: '100', // timeout do serviço em ms
        };
        
        // O objeto data montado para realizar a requisição precisa ser convertido para um texto para ser enviado
        var vo = clientService.invoke(JSON.stringify(data));
        
        if (vo.getResult() == null || vo.getResult().isEmpty()) {
            throw "O retorno está vazio";
        } else {
            var json = JSON.parse(vo.getResult());

            json.map(function (item) {
                dataset.addRow(new Array(item.ispb, item.name, item.code, item.fullName));
            })

        }
    } catch (err) {
        throw "Ocorreu um erro desconhecido"
    }

    return dataset;
}