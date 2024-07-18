function defineStructure() {

}

function onSync(lastSyncDate) {

}

function createDataset(fields, constraints, sortFields) {

    var dataset = DatasetBuilder.newDataset();

    // Cria as colunas
    dataset.addColumn('Usuário');
    dataset.addColumn('Gestor');

    // Cria os registros
    // dataset.addRow(new Array('Usuário 01', 'Gestor 01'));
    // dataset.addRow(new Array('Usuário 02', 'Gestor 02'));

    var datasetDs_usuario_gestor = DatasetFactory.getDataset('ds_consulta_usuario_gestor', null, null, null);

    // .rowsCount retorna o número de registros da consulta
    for (let i = 0; i < datasetDs_usuario_gestor.rowsCount; i++) {
        dataset.addRow([
            datasetDs_usuario_gestor.getValue(i, 'Usuário'),
            datasetDs_usuario_gestor.getValue(i, 'Gestor')
        ]);
    }

    return dataset;
}

function onMobileSync(user) {

}