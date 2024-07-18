function createDataset(fields, constraints, sortFields) {
    var dataset = DatasetBuilder.newDataset();

    //Cria as colunas
    dataset.addColumn("MARCA");
    dataset.addColumn("MODELO");
    dataset.addColumn("COR");
    dataset.addColumn("ANO");
    dataset.addColumn("VALOR");

    var tempDataset = getDefaultValues();

    if (constraints != null && constraints.length && constraints[0].fieldName != 'sqlLimit') { //se tiver constraint/diferente da padrão de SQL filtra

        if (constraints[0].constraintType == ConstraintType.MUST) { // implementação somente para o MUST

            for (var a = 0; a < tempDataset.length; a++) {
                // se o valor inicial da constraint for igual ao valor do campo na constraint adiciona a linha
                if (constraints[0].initialValue == tempDataset[a][constraints[0].fieldName]) {
                    dataset.addRow(new Array(tempDataset[a]["MARCA"], tempDataset[a]["MODELO"], tempDataset[a]["COR"], tempDataset[a]["ANO"], tempDataset[a]["VALOR"]));
                }
            }
        }
    } else { // se não tiver constraint adiciona todas as linhas
        for (var a = 0; a < tempDataset.length; a++) {
            dataset.addRow(new Array(tempDataset[a]["MARCA"], tempDataset[a]["MODELO"], tempDataset[a]["COR"], tempDataset[a]["ANO"], tempDataset[a]["VALOR"]));
        }
    }

    return dataset;
}

function getDefaultValues() { // retorna valores default para serem filtrados
    return [{
        MARCA: "Hyundai",
        MODELO: "Hb20",
        COR: "Branco",
        ANO: "2020",
        VALOR: "R$ 62.000"
    },
    {
        MARCA: "Chevrolet",
        MODELO: "Onix",
        COR: "Preto",
        ANO: "2016",
        VALOR: "R$ 48.000"
    },
    {
        MARCA: "Volkswagen",
        MODELO: "Jetta",
        COR: "Prata",
        ANO: "2020",
        VALOR: "R$ 85.000"
    },
    {
        MARCA: "Chevrolet",
        MODELO: "Cruze",
        COR: "Vermelho",
        ANO: "2015",
        VALOR: "R$ 52.000"
    },
    {
        MARCA: "Toyota",
        MODELO: "Corolla",
        COR: "Branco",
        ANO: "2023",
        VALOR: "R$ 115.000"
    },
    {
        MARCA: "Hyundai",
        MODELO: "Creta",
        COR: "Vermelho",
        ANO: "2018",
        VALOR: "R$ 73.000"
    },
    {
        MARCA: "Fiat",
        MODELO: "Argo",
        COR: "Preto",
        ANO: "2016",
        VALOR: "R$ 50.000"
    },
    {
        MARCA: "Chevrolet",
        MODELO: "Tracker",
        COR: "Preto",
        ANO: "2019",
        VALOR: "R$ 83.000"
    },
    {
        MARCA: "Ford",
        MODELO: "Ka",
        COR: "Branco",
        ANO: "2017",
        VALOR: "R$ 45.000"
    },
    {
        MARCA: "Honda",
        MODELO: "Civic",
        COR: "Branco",
        ANO: "2021",
        VALOR: "R$ 105.000"
    },
    {
        MARCA: "Jeep",
        MODELO: "Renegade",
        COR: "Preto",
        ANO: "2019",
        VALOR: "R$ 92.000"
    },
    {
        MARCA: "Renault",
        MODELO: "Kwid",
        COR: "Preto",
        ANO: "2018",
        VALOR: "R$ 39.000"
    },
    {
        MARCA: "Nissan",
        MODELO: "Kicks",
        COR: "Branco",
        ANO: "2020",
        VALOR: "R$ 89.000"
    },
    {
        MARCA: "Peugeot",
        MODELO: "208",
        COR: "Branco",
        ANO: "2019",
        VALOR: "R$ 59.000"
    },
    {
        MARCA: "Citroën",
        MODELO: "C4 Cactus",
        COR: "Prata",
        ANO: "2020",
        VALOR: "R$ 95.000"
    },
    {
        MARCA: "BMW",
        MODELO: "320i",
        COR: "Prata",
        ANO: "2019",
        VALOR: "R$ 160.000"
    },
    {
        MARCA: "Audi",
        MODELO: "A3",
        COR: "Branco",
        ANO: "2021",
        VALOR: "R$ 145.000"
    },
    {
        MARCA: "Mercedes-Benz",
        MODELO: "A 200",
        COR: "Branco",
        ANO: "2019",
        VALOR: "R$ 170.000"
    },
    {
        MARCA: "Kia",
        MODELO: "Sportage",
        COR: "Prata",
        ANO: "2021",
        VALOR: "R$ 130.000"
    },
    {
        MARCA: "Mitsubishi",
        MODELO: "Outlander",
        COR: "Vermelho",
        ANO: "2020",
        VALOR: "R$ 150.000"
    }];
}