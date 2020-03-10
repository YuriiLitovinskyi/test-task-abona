(function(){
    $connection.hub.start()
    .done(function(){
        console.log("Connected");
        $.connection.yardHub.BCMAck(operationArguments, token, seq);
    })
    .fail(function(){
        console.log("Error...");
    });

    $.connection.yardHub.client.BCMAck = function(operationArguments, token, seq){
        alert("connected!");
    }

})();