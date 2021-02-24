$('input[type="radio"]').click(function() {
    let value = $('input[name="Format"]:checked').val();
    switch (value) {
        case 'coordinateFormat':
            {
                $('#cityInput').attr('placeholder', 'Latitude');
                $('#countryInput').attr('Placeholder', 'Longitude');
                break;
            }

        case 'nameFormat':
            {
                $('#cityName').text("City Name");
                $('#countryName').text("Country Name");
                $('#cityInput').attr('placeholder', 'City Name');
                $('#countryInput').attr('Placeholder', 'Country Name');
                break;
            }

        default:
            alert("Please Choose An Option");
    }
});

$(".weatherForm").on(('submit'), function() { // on method specifies the current event that was happening 
    console.log('trigger');

    let that = $(this),
        data = {}; // appending this through jquery mwthod because we have been passing onto the ajax through json method in the data variable

    that.find('[name]').each(function(index, forValue) { // Find Method Used to find Each Element With the name attribute in the form
        let that = $(this),
            name = that.attr('name'),
            formValue = that.val();

        data[name] = formValue;

    })



    const xml = new XMLHttpRequest;
    let query = data.cityName;
    xml.open('POST', "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=062798097c085e918908ddb409a14c57&units=metric", true)

    xml.onload = function() {
        let data = JSON.parse(this.responseText);
        console.log(data);

        let latitude = data.coord.lat;
        let longitude = data.coord.lon;
        let countryName = data.sys.country;
        let temprature = data.main.temp;
        let cityName = data.name;

        let radiovalue = $('input[name="Format"]:checked').val();

        if (radiovalue === "coordinateFormat") {
            $('#cityInput').val(latitude); // Used For Replacing the Values in the Format.
            $('#countryInput').val(longitude);
        } else if (radiovalue === "nameFormat") {
            $('#cityInput').val(cityName);
            $('#countryInput').val(countryName);
        }

        $('.tempatureResultClass').text(" The Temprature of " + cityName + " is :- " + temprature);


    }
    xml.send();
    return false; // to Prevent it from Submitting to the Default State
})