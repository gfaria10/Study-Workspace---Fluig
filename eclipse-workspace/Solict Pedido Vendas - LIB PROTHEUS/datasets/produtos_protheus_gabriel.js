function createDataset(fields, constraints, sortFields) {
	var minhaQuery =  ""
	
	log.info("### consulta_cadastro_produto_protheus- INICIO ###");

	var codigo = ""
	
	if (constraints != null) {
		for (var i = 0; i < constraints.length; i++) {
			if (constraints[i].fieldName == "CODIGO") { 
				minhaQuery = constraints[i].initialValue;
			}
		}
	}
	
	minhaQuery = "SELECT " +
			"		B1_COD  CODIGO,  " +
			"		B1_DESC DESCRICAO, " +
			"		B1_UM UM, " +
			"		B1_TIPO TIPO " +
			"FROM SB1T10 " +
			"where " +
			"		D_E_L_E_T_ = ' ' " +
			"		And B1_COD LIKE '%"+codigo+"%'"+
			"limit 100 ";

	var dataSource = "java:jboss/datasources/PostgreSQLDS"; // Versão 1.6+
	log.info("###### jdbc: " + dataSource);
	log.info("###### SQL: " + minhaQuery);
	var newDataset = DatasetBuilder.newDataset();
	var ic = new javax.naming.InitialContext();
	var ds = ic.lookup(dataSource);
	var created = false;
	try {
		var conn = ds.getConnection();
		var stmt = conn.createStatement();
		var rs = stmt.executeQuery(minhaQuery);
		var columnCount = rs.getMetaData().getColumnCount();
		while(rs.next()) {
			if(!created) {
				for(var i=1;i<=columnCount; i++) {
					newDataset.addColumn(rs.getMetaData().getColumnName(i));
				}
				created = true;
			}
			var Arr = new Array();
			for(var i=1;i<=columnCount; i++) {
				var obj = rs.getObject(rs.getMetaData().getColumnName(i));
				if(null!=obj){
					Arr[i-1] = rs.getObject(rs.getMetaData().getColumnName(i)).toString();
				}
				else {
					Arr[i-1] = "null";
				}
			}
			newDataset.addRow(Arr);
		}
	} catch(e) {
		log.info(" ####### ERRO dsSQL.js =====> " + e.message);
	} finally {
		if(stmt != null) stmt.close();
		if(conn != null) conn.close();                     
	}
	return newDataset;
} 
