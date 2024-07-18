function createDataset(fields, constraints, sortFields) {
    var dataset = DatasetBuilder.newDataset();
       
    //Cria as colunas
    dataset.addColumn("marca");
    dataset.addColumn("modelo");
    dataset.addColumn("ano");
    dataset.addColumn("valor");
      
    //Cria os registros
    dataset.addRow(new Array("Hyundai", "Hb20", "2020", "R$ 62.000"));
    dataset.addRow(new Array("Chevrolet", "Onix", "2016", "R$ 48.000"));
    dataset.addRow(new Array("Volkswagen", "Jetta", "2020", "R$ 85.000"));
    dataset.addRow(new Array("Chevrolet", "Cruze", "2015", "R$ 52.000"));
    dataset.addRow(new Array("Toyota", "Corolla", "2023", "R$ 115.000"));
    dataset.addRow(new Array("Hyundai", "Creta", "2018", "R$ 73.000"));
    dataset.addRow(new Array("Fiat", "Argo", "2016", "R$ 50.000"));
    dataset.addRow(new Array("Chevrolet", "Tracker", "2019", "R$ 83.000"));
     
    return dataset;
}