$(document).ready(function() {

    // GET all transport units
    $.get('https://yardwebapiexp.azurewebsites.net/api/CargoUnits/GetCargoUnitsInYard', function(data) {
    //debugger
    console.log(data);
    $.each(data, function(i,item){
            content = `<p>${item.RegistrationPlate},  ${item.TransportNumber},  ${item.TransportCompanyName} </p>`;          
            $(content).appendTo("#transportList");
            const date = new Date(item.Arrival);
            console.log(date)
        });
       
        $('#gridContainer').dxDataGrid({
            dataSource: data,
            columns: [
                'OID',
                'Arrival',
                'TransportNumber',
                'TransportCompanyName',
                'RegistrationPlate'
            ],
            paging: {
                pageSize: 6
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
                editMode: "batch",
                editEnabled: true,
                removeEnabled: true,
                insertEnabled: true
            }
        });
        
    });    
  });


// // GET all transport units
// $('#get_data').click(function() {
//     $.get('https://yardwebapiexp.azurewebsites.net/api/CargoUnits/GetCargoUnitsInYard', function(data) {
//     //debugger
//     console.log(data);
//     $.each(data, function(i,item){
//             content = `<p>${item.RegistrationPlate},  ${item.TransportNumber},  ${item.TransportCompanyName} </p>`;          
//             $(content).appendTo("#transportList");
//         });
//     });
// });

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
        $('#transportList').append(`<p>${data.RegistrationPlate},  ${data.TransportNumber},  ${data.TransportCompanyName} </p>`)
    });
});
