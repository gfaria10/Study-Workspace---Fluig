function defineStructure() {

}

function onSync(lastSyncDate) {

}

function createDataset(fields, constraints, sortFields) {

    var ds = DatasetBuilder.newDataset();

    // Cria as colunas
    ds.addColumn("Simbolo");
    ds.addColumn("nomeMoeda");

    // Cria os registros
    ds.addRow(new Array("R$", "Real"));
    ds.addRow(new Array("US$", "Dolar Americano"));
    ds.addRow(new Array("U$", "Peso Uruguaio"));

    return ds;

}

function onMobileSync(user) {

}