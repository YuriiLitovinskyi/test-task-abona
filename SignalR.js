
var hub = $.hubConnection("https://yardcorestandarddevelopment.azurewebsites.net/signalR"); 

hub.logging = true;

var HubProxy = hub.createHubProxy('yardHub');
HubProxy.on('BCMAck', function(operationArguments, token, seq) {
    console.log(operationArguments, token, seq);
    console.log(operationArguments);
    console.log(token);
    console.log(seq);

    if (operationArguments.OperationName === 'RegisterContainerCargoUnit') {

        let store = [];

        HubProxy.client.updateStockPrice = function (data) {
            store.push([{ type: "update", key: data.Symbol, data: data }]);
        };


        let dataGrid = $("#gridContainer").dxDataGrid({
            // ...
        }).dxDataGrid("instance");
        let dataSource = dataGrid.getDataSource();
        dataSource.store().insert(data).then(function() {
            dataSource.reload();
        });
    }

    // var store = new DevExpress.data.CustomStore({
    //     load: function() {
    //         return HubProxy.server.getAllStocks();
    //     },
    //     key: "OID"
    // });

    HubProxy.client.updateStockPrice = function (data) {
        store.push([{ type: "update", key: data.Symbol, data: data }]);
    };

    
});

hub.start()
    .done(function () {        
        console.log(`Connected... Hub id: ${hub.id}`);
        console.log(`Transport: ${hub.transport.name}`);    
        console.log(hub);   
      
    })
    .fail(function (err) {
        console.log(`Not connected: ${err}`);
    });
