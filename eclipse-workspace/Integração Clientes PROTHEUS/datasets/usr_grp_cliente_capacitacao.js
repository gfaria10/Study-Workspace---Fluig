function createDataset(fields, constraints, sortFields) {
    var dataset = DatasetBuilder.newDataset();

    log.info("entrou nbo dataset usuarios_papel")

    var groupId = 'Teste_capacitacao'
    var empresa = getValue("WKCompany")

    if (constraints != null) {
        if (constraints.length > 0) {
            for (var i = 0; i < constraints.length; i++) {
                var name = constraints[i].fieldName.toUpperCase();
                var value = constraints[i].initialValue;

                if (name == "FILTRO") {
                    filtro = value.toUpperCase();
                } else if (name == "GRUPO") {
                    groupId = value.toUpperCase();
                    log.info("GRUPO é " + groupId)
                }
            }
        }
    }

    dataset.addColumn("GRUPO");
    dataset.addColumn("NOMECLIENTE");

    log.info("entrou nbo dataset usuarios_papel -- 10")

    //Monta os filtros para obter os dados o papel 
    var companyGroupFilter = DatasetFactory.createConstraint("colleagueGroupPK.companyId", empresa, empresa, ConstraintType.MUST);
    var groupFilter = DatasetFactory.createConstraint("colleagueGroupPK.groupId", groupId, groupId, ConstraintType.MUST);
    var constraintsGroup = new Array(companyGroupFilter, groupFilter);

    //Chama dataset PAPELxUSUARIO filtrando por empresa e papel
    var colleaguesByGroup = DatasetFactory.getDataset("colleagueGroup", null, constraintsGroup, null);
    log.info("entrou nbo dataset usuarios_papel -- 20")

    for (var i = 0; i < colleaguesByGroup.rowsCount; i++) {
        log.info("entrou nbo dataset usuarios_papel -- 30")

        if (colleaguesByGroup != null && colleaguesByGroup.rowsCount != undefined && colleaguesByGroup.rowsCount > 0) {
            log.info("entrou nbo dataset usuarios_papel -- 40")

            // Monta os Filtros para obter os dados do usuário
            var matricula = colleaguesByGroup.getValue(i, "colleagueGroupPK.colleagueId")
            var companyUserFilter = DatasetFactory.createConstraint("colleaguePK.companyId", empresa, empresa, ConstraintType.MUST);
            var userFilter = DatasetFactory.createConstraint("colleaguePK.colleagueId", matricula, matricula, ConstraintType.MUST);

            var constraintsUser = new Array(companyUserFilter, userFilter);

            //Consulta o dataset de usuários
            var colleagues = DatasetFactory.getDataset("colleague", null, constraintsUser, null);
            log.info("entrou nbo dataset usuarios_papel -- 50")

            if (colleagues != null && colleagues.rowsCount != undefined && colleagues.rowsCount > 0) {

                // cria as variaves para receber os valores dos dataset consultados
                var idGrupo = colleaguesByGroup.getValue(i, "workflowColleagueRolePK.colleagueId")
                var nomeUsuario = colleagues.getValue(0, "colleagueName")

                dataset.addRow(new Array(
                    idGrupo,
                    nomeUsuario));
            }
        }
    }

    return dataset;
}