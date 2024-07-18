function defineStructure() {

}

function onSync(lastSyncDate) {

}

function createDataset(fields, constraints, sortFields) {

	// Filtros no dataset interno colleague
	// Código gerado pelo menu view
	var constraintColleague1 = DatasetFactory.createConstraint('sqlLimit', '100', '100', ConstraintType.MUST);
	var constraintColleague2 = DatasetFactory.createConstraint('colleaguePK.colleagueId', 'academy.aluno', 'academy.aluno', ConstraintType.MUST);
	var colunasColleague = new Array('colleaguePK.colleagueId', 'colleagueName');
	var datasetColleague = DatasetFactory.getDataset('colleague', colunasColleague, new Array(constraintColleague1, constraintColleague2), null);
	
	return datasetColleague;
	
}

function onMobileSync(user) {

}