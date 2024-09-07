$(document).ready(function () {

  // for state drop down  

  $.get('/states/fetch_all_states', function (data) {

    alert(JSON.stringify(data.message));
    data.result.map((item) => {

      //    alert(item.categoryName)
      console.log("data", data);
      $('#stateid').append($('<option>').text(item.statename).val(item.stateid))
    })

  })

  // for city drop dowm

  $('#stateid').change(function () {
    $.get('/states/fetch_all_cities', { stateid: $(this).val() }, function (data) {
      console.log('Change event triggered');
      console.log(data); // Log the data received from the server

      $('#cityid').empty();
      $('#cityid').append($('<option>').text('cities'));

      // Check the data structure and adapt your code accordingly
      if (data.result) {
        data.result.map((item) => {
          console.log('Adding city: ' + item.cityname);
          $('#cityid').append($('<option>').text(item.cityname).val(item.cityid));
        });
      } else {
        alert('No cities found for the selected state.');
      }
    });
  });

  //  for cinema drop down  

  $('#cityid').change(function () {
    $.get('/states/fetch_all_cinemas', { cityid: $(this).val() }, function (data) {
      console.log('Change event triggered');
      console.log(data); // Log the data received from the server

      $('#cinemaid').empty();
      $('#cinemaid').append($('<option>').text('cinema'));

      // Check the data structure and adapt your code accordingly
      if (data.result) {
        data.result.map((item) => {
          console.log('Adding city: ' + item.cityname);
          $('#cinemaid').append($('<option>').text(item.cinemaname).val(item.cinemaid));
        });
      } else {
        alert('No cities found for the selected state.');
      }
    });
  });

  // for screen drop down 

  $('#cinemaid').change(function () {
    $.get('/states/fetch_all_screens', { cinemaid: $(this).val() }, function (data) {
      console.log('Change event triggered');
      console.log(data); // Log the data received from the server

      $('#screenid').empty();
      $('#screenid').append($('<option>').text('screen'));

      // Check the data structure and adapt your code accordingly
      if (data.result) {
        data.result.map((item) => {
          // console.log('Adding city: ' + item.cityname);
          $('#screenid').append($('<option>').text(item.screenname).val(item.screenid));
        });
      } else {
        alert('No cities found for the selected state.');
      }
    });
  });


  $('#formFile').change(function (e) {
    alert('image chnaged');

    $('#picture').attr('src', URL.createObjectURL(e.currentTarget.files[0]))

  })
          // sir drop down mein apne screen option choose nahi kiya tha 
})