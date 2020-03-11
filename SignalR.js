(function(){
    $.support.cors = true;
    // var signalR = $.signalR;
    // //$.connection.hub.url = "https://yardcorestandarddevelopment.azurewebsites.net";
    // signalR.hub = $.hubConnection("https://yardcorestandarddevelopment.azurewebsites.net/signalr");



    var yardHub = $.hubConnection("https://yardcorestandarddevelopment.azurewebsites.net/");  //signalr
    //var hub = connection.createHubProxy("BCMAck"); 
    //var subscription = hub.Subscribe("BCMAck");
    //var yardHub = $.connection;
    //var simpleHubProxy = $.connection.yardHub;
    //registerClientMethods(yardHub); 
    
    //hub.on("AddMessage", Method);
    yardHub.start()
                .done(function () {
                //$.connection.hub.logging = true;
                console.log('Connected... Hub id: ' + yardHub.id);
                //hub.say("success?");
                //yardHub.server.BCMAck(operationArguments, token, seq)
                //BCMAck (bCMAck)
                
            })
            .fail(function (a) {
                console.log('Not connected '+a);
            });
    



    // $.signalR.hub.start()
    // .done(function(){
    //     $.connection.hub.logging = true;
    //     console.log("Connected");
    //     $.signalR.hub.server.BCMAck(operationArguments, token, seq)
    //         .done(function(data){
    //             writeToPage(data);
    //         })
    //         .fail(function(error){
    //             writeToPage(error);
    //         });
    // })
    // .fail(function(){
    //     console.log("Error...");
    // });

    // $.signalR.hub.client.BCMAck = function(operationArguments, token, seq){     //bCMAck
    //     alert("connected!");
    //     writeToPage(operationArguments);
    //     //$.hub.client.registerContainerCargoUnit();
    //     // $.hub.client.RegisterInLandCargoUnit();
    //     //$.hub.client.LeftYard();
    // }

    // var writeToPage = function(msg){
    //     $("#msg").append(msg + '<br />');
    // }

})();