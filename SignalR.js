
var hub = $.hubConnection("https://yardcorestandarddevelopment.azurewebsites.net/"); 

hub.logging = true;
hub.start()
    .done(function () {        
        console.log(`Connected... Hub id: ${hub.id}`);
        console.log("Transport = " + hub.transport.name);
    
        console.log(hub);        
    })
    .fail(function (err) {
        console.log(`Not connected: ${err}`);
    });
