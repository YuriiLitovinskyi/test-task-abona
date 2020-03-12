
var hub = $.hubConnection("https://yardcorestandarddevelopment.azurewebsites.net/"); 

hub.logging = true;

var HubProxy = hub.createHubProxy('yardHub');
HubProxy.on('message', function(operationArguments, token, seq) {
    console.log(operationArguments, token, seq);
});

hub.start()
    .done(function () {        
        console.log(`Connected... Hub id: ${hub.id}`);
        console.log(`Transport: ${hub.transport.name}`);    
        console.log(hub);   
        
        $('#click').click(function () {
            HubProxy.invoke('BCMAck', {}, hub.token, 34);            
        });
    })
    .fail(function (err) {
        console.log(`Not connected: ${err}`);
    });
