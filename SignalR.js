
var hub = $.hubConnection("https://yardcorestandarddevelopment.azurewebsites.net/signalR"); 

hub.logging = true;

var HubProxy = hub.createHubProxy('yardHub');
HubProxy.on('BCMAck', function(operationArguments, token, seq) {
    console.log(operationArguments, token, seq);
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
