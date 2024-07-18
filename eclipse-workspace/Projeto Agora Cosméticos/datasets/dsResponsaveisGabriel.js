function createDataset(fields, constraints, sortFields) {

    // Criando o dataset para juntar as informações abaixo
    var ds = DatasetBuilder.newDataset();

    // Cria as colunas
    ds.addColumn("login");
    ds.addColumn("nome");

    var filtroGrupo = DatasetFactory.createConstraint("colleagueGroupPK.groupId", "GabrielResponsaveis", "GabrielResponsaveis", ConstraintType.MUST);

    var datasetGrupo = DatasetFactory.getDataset("colleagueGroup", null, new Array(filtroGrupo), null);

    for (i = 0; i < datasetGrupo.rowsCount; i++) {
        var colabGrupo = datasetGrupo.getValue(i, "colleagueGroupPK.colleagueId");

        var datasetColaborador = DatasetFactory.getDataset("colleague", null, null, null);

        for (j = 0; j < datasetColaborador.rowsCount; j++) {
            var colabCol = datasetColaborador.getValue(j, "colleaguePK.colleagueId");
            var colabNome = datasetColaborador.getValue(j, "colleagueName");

            if (colabCol == colabGrupo) {
                // Cria os registros
                ds.addRow(new Array(colabCol, colabNome));
            }
        }
    }

    // Retornando o dataset criado já com as informações juntadas acima
    return ds;

}
