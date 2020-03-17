$(document).ready(function() {

    var hub = $.hubConnection("https://yardcorestandarddevelopment.azurewebsites.net/signalR"); 

    hub.logging = true;

    var HubProxy = hub.createHubProxy('yardHub');

    // GET all transport units
    $.get('https://yardwebapiexp.azurewebsites.net/api/CargoUnits/GetCargoUnitsInYard', function(data) {
    //debugger    
    data.forEach(item => item.Arrival = new Date(item.Arrival));
    console.log(data);

    HubProxy.on('BCMAck', function(operationArguments, token, seq) {
        console.log(operationArguments, token, seq);
        console.log(operationArguments);
        console.log(token);
        console.log(seq);

        let dataGrid = $("#gridContainer").dxDataGrid({
            // ...
        }).dxDataGrid("instance");
        let dataSource = dataGrid.getDataSource();
    
        if (operationArguments.OperationName === 'RegisterContainerCargoUnit' || operationArguments.OperationName === 'RegisterInLandCargoUnit') {                 
            dataSource.store().insert(operationArguments.Arguments).then(function() {
                dataSource.reload();
            });
        } else if (operationArguments.OperationName === 'LeftYard') {              
            dataSource.filter(["!", ["RegistrationPlate", "=", operationArguments.Arguments.RegistrationPlate]] )
            dataSource.reload();              
        }        
    });
        hub.start()
        .done(function () {        
            console.log(`Connected... Hub id: ${hub.id}`);
            console.log(`Transport: ${hub.transport.name}`);    
            console.log(hub); 
            
            $('#gridContainer').dxDataGrid({
                dataSource: data,  //store
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
                    'IsLeftYard',
                    'Standing'                            
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
        })
        .fail(function (err) {
            console.log(`Not connected: ${err}`);
        });            
    });  
});


// POST transport unit
$('form').submit(function(e) {
    e.preventDefault();   
    let registrationPlate = $("#registrationPlate").val();
    let transportNumber = $("#transportNumber").val();
    let transportCompany = $("#transportCompany").val();
   
    let url = `https://yardwebapiexp.azurewebsites.net/api/CargoUnits/RegisterContainerCargoUnit/${registrationPlate}/${transportNumber}/${transportCompany}`;
    $.post(url, {}, function(data){
        data.Arrival = new Date(data.Arrival);
        //console.log(data);

        // let dataGrid = $("#gridContainer").dxDataGrid({
        //     // ...
        // }).dxDataGrid("instance");
        // let dataSource = dataGrid.getDataSource();
        // dataSource.store().insert(data).then(function() {
        //     dataSource.reload();
        // });

        $('form').each(function(){
            this.reset();
        });        
    });
});

