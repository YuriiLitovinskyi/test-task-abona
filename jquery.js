$(document).ready(function() {

    // GET all transport units
    $.get('https://yardwebapiexp.azurewebsites.net/api/CargoUnits/GetCargoUnitsInYard', function(data) {
    //debugger    
    data.forEach(item => item.Arrival = new Date(item.Arrival));
    console.log(data);
       
        $('#gridContainer').dxDataGrid({
            dataSource: data,
            showRowLines: true,           
            rowAlternationEnabled: true,            
            showBorders: true,
            columns: [
                 {
                    dataField: "OID",
                    caption: "OID",
                    width: 60
                },
                'Arrival',
                'TransportNumber',
                'TransportCompanyName',
                'RegistrationPlate',                           
                'CargoUnitStatus',
                'IsLeftYard'                            
            ],
            paging: {
                pageSize: 4
            },
            sorting: {
                mode: "multiple"
            },
            allowColumnReordering: true,
            allowColumnResizing: true,
            filterRow: {
                visible: true
            },
            selection: {
                mode: "multiple"
            },
            groupPanel: {
                visible: true
            },
            editing: {
                allowUpdating: true, 
                allowAdding: true, 
                allowDeleting: true,
                mode: 'row' // 'batch' | 'cell' | 'form' | 'popup'
            },
            columnHidingEnabled: true,
            columnChooser: {
                enabled: true,
                mode: "select"
            },
            grouping: {
                contextMenuEnabled: true,
                expandMode: "rowClick"
            }            
        });        
    });  
  });


// POST transport unit
$('form').submit(function(e) {
    e.preventDefault();   
    let registrationPlate = $("#registrationPlate").val();
    let transportNumber = $("#transportNumber").val();
    let transportCompany = $("#transportCompany").val();
    // console.log(registrationPlate);
    // console.log(transportNumber);
    // console.log(transportCompany);
   
    let url = `https://yardwebapiexp.azurewebsites.net/api/CargoUnits/RegisterContainerCargoUnit/${registrationPlate}/${transportNumber}/${transportCompany}`;
    $.post(url, {}, function(data){
        data.Arrival = new Date(data.Arrival);
        //console.log(data);

        let dataGrid = $("#gridContainer").dxDataGrid({
            // ...
        }).dxDataGrid("instance");
        let dataSource = dataGrid.getDataSource();
        dataSource.store().insert(data).then(function() {
            dataSource.reload();
        });

        $('form').each(function(){
            this.reset();
        });        
    });
});

