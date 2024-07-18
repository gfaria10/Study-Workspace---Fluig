function createDataset(fields, constraints, sortFields) {
    var dataset = DatasetBuilder.newDataset();
       
    //Cria as colunas
    dataset.addColumn("MARCA");
      
    //Cria os registros
    dataset.addRow(new Array("Hyundai"));
    dataset.addRow(new Array("Chevrolet"));
    dataset.addRow(new Array("Volkswagen"));
    dataset.addRow(new Array("Toyota"));
    dataset.addRow(new Array("Fiat"));
    dataset.addRow(new Array("Ford"));
    dataset.addRow(new Array("Honda"));
    dataset.addRow(new Array("Jeep"));
    dataset.addRow(new Array("Renault"));
    dataset.addRow(new Array("Nissan"));
    dataset.addRow(new Array("Peugeot"));
    dataset.addRow(new Array("Citroën"));
    dataset.addRow(new Array("BMW"));
    dataset.addRow(new Array("Audi"));
    dataset.addRow(new Array("Mercedes-Benz"));
    dataset.addRow(new Array("Kia"));
    dataset.addRow(new Array("Mitsubishi"));
     
    return dataset;
}