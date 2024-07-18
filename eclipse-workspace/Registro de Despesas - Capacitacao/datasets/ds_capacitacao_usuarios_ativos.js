function createDataset(fields, constraints, sortFields) {
    var dataset = DatasetBuilder.newDataset();
    var usuariosAtivos = 'true';

    dataset.addColumn("USUARIO");
    dataset.addColumn("FUNCIONARIO");
    dataset.addColumn("EMAIL");

    log.info('>>> INICIO DATASET CAPACITACAO USUARIOS ATIVOS');

    // .createConstraint("CAMPO", filtroInicio, filtroFim, TIPO)
    var constraint = DatasetFactory.createConstraint("active", usuariosAtivos, usuariosAtivos, ConstraintType.MUST);
    var grupoFiltro = new Array(constraint);
    var activeUsers = DatasetFactory.getDataset("colleague", null, grupoFiltro, null);

    for (var i = 0; i < activeUsers.rowsCount; i++) {
        var usuario = activeUsers.getValue(i, "login")
        var funcionarioNome = activeUsers.getValue(i, "colleagueName")
        var funcionarioEmail = activeUsers.getValue(i, "mail")

        log.info('>>> USUARIO: ' + usuario);
        log.info('>>> FUNCIONARIO NOME: ' + funcionarioNome);
        log.info('>>> FUNCIONARIO EMAIL: ' + funcionarioEmail);

        dataset.addRow(new Array(
            usuario,
            funcionarioNome,
            funcionarioEmail
        ));
        log.info('>>> DATASET: ' + dataset);
    }

    return dataset;
}
