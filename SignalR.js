(function(){
    const hub = $.connection.yardHub;

    $connection.hub.start()
    .done(function(){
        $.connection.hub.logging = true;
        console.log("Connected");
        $.hub.server.BCMAck(operationArguments, token, seq)
            .done(function(data){
                writeToPage(data);
            })
            .fail(function(error){
                writeToPage(error);
            });
    })
    .fail(function(){
        console.log("Error...");
    });

    $.hub.client.BCMAck = function(operationArguments, token, seq){     //bCMAck
        alert("connected!");
        writeToPage(operationArguments);
        //$.hub.client.registerContainerCargoUnit();
        // $.hub.client.RegisterInLandCargoUnit();
        //$.hub.client.LeftYard();
    }

    var writeToPage = function(msg){
        $("#msg").append(msg + '<br />');
    }

})();