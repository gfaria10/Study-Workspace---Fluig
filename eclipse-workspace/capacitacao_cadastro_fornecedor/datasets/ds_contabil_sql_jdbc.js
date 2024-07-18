function createDataset(fields, constraints, sortFields) {
    log.info("### consulta_sql_contabil - INICIO ###");
    var newDataset = DatasetBuilder.newDataset();
    var dataSource = "/jdbc/AppDS";

    // seta o serviço java JDBC que irá ser consumido 
    var ic = new javax.naming.InitialContext();
    var ds = ic.lookup(dataSource);
    var created = false;
    var myQuery = ""

    myQuery += "SELECT " +
        " codigo," +
        " descricao " +
        "FROM ML001411 " +
        "WHERE" +
        " companyid = '1'" +
        " AND descricao <> '' " +
        "order by codigo"

    log.info("###  consulta_sql_contabil - sql - " + myQuery);

    try {
        // obtém a conexão com o banco de dados 
        var conn = ds.getConnection();
        var stmt = conn.createStatement();

        // Executa a consulta no banco de dados, e retorna um objeto ResultSet que contém os dados retornados pelo banco de dados.
        var rs = stmt.executeQuery(myQuery);

        // obtem o número de colunas 
        var columnCount = rs.getMetaData().getColumnCount();
        while (rs.next()) {
            // Na primeira interação verifica se as colunas foram criadas
            if (!created) {
                for (var i = 1; i <= columnCount; i++) {
                    newDataset.addColumn(rs.getMetaData().getColumnName(i));
                }
                created = true;
            }
            // apartir das proximas interações começar popular os registros/linhas do datataset 
            var Arr = new Array();
            for (var i = 1; i <= columnCount; i++) {
                var value = rs.getObject(rs.getMetaData().getColumnName(i)); // retorna o valor do registro da coluna posicionada utilizando o metodo getObject

                // verifica se o registro é null
                if (value != null) {
                    Arr[i - 1] = value.toString();
                } else {
                    Arr[i - 1] = "";
                }
            }
            newDataset.addRow(Arr);
        }
    } catch (e) {
        log.error("ERRO==============> " + e.message);
    } finally {
        if (rs != null) {
            rs.close();
        }
        if (stmt != null) {
            stmt.close();
        }
        if (conn != null) {
            conn.close();
        }
    }
    return newDataset;
}