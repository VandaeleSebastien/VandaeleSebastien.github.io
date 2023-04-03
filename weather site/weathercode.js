//'https://api.weatherapi.com/v1/current.json?key=5d4c5d39ad664dcd8af122926230204&q=Ghent&aqi=no'

const app = {
    init: () => {
      document
        .getElementById('btnGet')
        .addEventListener('click', app.fetchWeather);
      document
        .getElementById('btnCurrent')
        .addEventListener('click', app.getLocation);
    },
    fetchWeather: (ev) => {
      //use the values from latitude and longitude to fetch the weather
      let city = document.getElementById('city').value;
      
      let key = '5d4c5d39ad664dcd8af122926230204';
      let lang = 'en';
      let units = 'metric';
      let url = `https://api.weatherapi.com/v1/current.json?&key=${key}&q=${city}&aqi=no`;
      //fetch the weather
      fetch(url)
        .then((resp) => {
          if (!resp.ok) throw new Error(resp.statusText);
          return resp.json();
        })
        .then((data) => {
          app.showWeather(data);
        })
        .catch(console.err);
    },
    getLocation: (ev) => {
      let opts = {
        enableHighAccuracy: true,
        timeout: 1000 * 10, //10 seconds
        maximumAge: 1000 * 60 * 5, //5 minutes
      };
      navigator.geolocation.getCurrentPosition(app.ftw, app.wtf, opts);
    },
    ftw: (position) => {
      //got position
      document.getElementById('city').value =
        position.city.toFixed(2);
    },
    wtf: (err) => {
      //geolocation failed
      console.error(err);
    },
    showWeather: (resp) => {
      console.log(resp);
      let row = document.querySelector('#weatherMap');
      //clear out the old weather and add the new
      // row.innerHTML = '';
      let weatherNow = resp.current;
      
      if (weatherNow.temp_c <= 0)
      {
        let img = document.createElement('img');
        img.setAttribute('src', 'Pictures/thermometer zeer koud.png');
        row.innerHTML = '';
        row.appendChild(img);
      }
       else if (weatherNow.temp_c >0 && weatherNow.temp_c <15){
        let img = document.createElement('img');
        img.setAttribute('src', 'Pictures/thermometer koud.png');
        row.innerHTML = '';
        row.appendChild(img);
      }
      else if (weatherNow.temp_c >=15 && weatherNow.temp_c <=20){
        let img = document.createElement('img');
        img.setAttribute('src', 'Pictures/thermometer licht warm.png');
        row.innerHTML = '';
        row.appendChild(img);
      }
      else if (weatherNow.temp_c >20 && weatherNow.temp_c <=29){
        let img = document.createElement('img');
        img.setAttribute('src', 'Pictures/thermometer warm.png');
        row.innerHTML = '';
        row.appendChild(img);
      }
      else {
        let img = document.createElement('img');
        img.setAttribute('src', 'Pictures/thermometer zeer warm.png');
        row.innerHTML = '';
        row.appendChild(img);
      }

    },
  };
  
  app.init();
  