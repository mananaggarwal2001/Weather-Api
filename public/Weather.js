$('input[type="radio"]').click(function(){
  let value = $('input[name="Format"]:checked').val();
  switch (value) {
  case 'coordinateFormat':{
  $('#cityName').text("Latitude");
  $('#countryName').text("Longitude");
  $('#cityInput').attr('placeholder','Latitude');
  $('#countryInput').attr('Placeholder','Longitude');

  break;
  }
  case 'nameFormat':{
    $('#cityName').text("City Name");
    $('#countryName').text("Country Name");

    $('#cityInput').attr('placeholder','City Name');
    $('#countryInput').attr('Placeholder','Country Name');

  break;
  }

  default:
  alert("Please Choose An Option");
  }
});
