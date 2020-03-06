
// GET all transport units
$('#get_data').click(function() {
    $.get('https://yardwebapiexp.azurewebsites.net/api/CargoUnits/GetCargoUnitsInYard', function(data) {
    //debugger
    console.log(data);
    });
});

// POST transport unit
$('form').submit(function(e) {
    e.preventDefault();   
    let registrationPlate = $("#registrationPlate").val();
    let transportNumber = $("#transportNumber").val();
    let transportCompany = $("#transportCompany").val();
    console.log(registrationPlate);
    console.log(transportNumber);
    console.log(transportCompany);
   
    $.post(`https://yardwebapiexp.azurewebsites.net/api/CargoUnits/RegisterContainerCargoUnit/${registrationPlate}/${transportNumber}/${transportCompany}`, {}, function(data){
        console.log(data);
        $('form').each(function(){
            this.reset();
        });
    });
});
