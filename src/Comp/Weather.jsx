import React, { useEffect, useState } from "react";

// Weather icon mapping
const weatherIconsDay = {
  Clear: "https://raw.githubusercontent.com/Makin-Things/weather-icons/master/static/clear-day.svg",
  Clouds: "https://raw.githubusercontent.com/Makin-Things/weather-icons/master/static/cloudy-1-day.svg",
  Rain: "https://raw.githubusercontent.com/Makin-Things/weather-icons/master/static/rain-and-sleet-mix.svg",
  Thunderstorm: "https://raw.githubusercontent.com/Makin-Things/weather-icons/master/static/isolated-thunderstorms.svg",
  Drizzle: "https://raw.githubusercontent.com/Makin-Things/weather-icons/master/static/rain-and-sleet-mix.svg",
  Snow: "https://raw.githubusercontent.com/Makin-Things/weather-icons/master/animated/snowy-3.svg",
  Mist: "https://raw.githubusercontent.com/Makin-Things/weather-icons/master/animated/fog.svg",
};
const weatherIconsNight = {
  Clear: "https://raw.githubusercontent.com/Makin-Things/weather-icons/master/static/clear-night.svg",
  Clouds: "https://raw.githubusercontent.com/Makin-Things/weather-icons/master/static/cloudy-1-night.svg",
  Rain: "https://raw.githubusercontent.com/Makin-Things/weather-icons/master/static/rain-and-sleet-mix.svg",
  Thunderstorm: "https://raw.githubusercontent.com/Makin-Things/weather-icons/master/static/isolated-thunderstorms.svg",
  Drizzle: "https://raw.githubusercontent.com/Makin-Things/weather-icons/master/static/rain-and-sleet-mix.svg",
  Snow: "https://raw.githubusercontent.com/Makin-Things/weather-icons/master/animated/snowy-3.svg",
  Mist: "https://raw.githubusercontent.com/Makin-Things/weather-icons/master/animated/fog.svg",
};

const Weather = () => {
  const [data, setData] = useState(null); // change from [] to null

  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=Dhaka&appid=54e1a12935effbdc259c8047a664335a`
    )
      .then((res) => res.json())
      .then((dataX) => setData(dataX));
  }, []);

  // Show loading state until data is ready
  if (!data || !data.weather || !data.main || !data.sys) {
    return (
      <div className="text-center text-white mt-10">Loading weather...</div>
    );
  }

  const weatherMain = data.weather[0].main;
  const timePro = data.weather[0].icon[2];
  let icon ="";
  if(timePro==="d"){
     icon = weatherIconsDay[weatherMain] ;
  }
  else{
     icon = weatherIconsNight[weatherMain] ;
  }
  

  const kelvinToCelsius = (k) => (k - 273.15).toFixed(1);

  const toTime = (unix, timezone) =>
    new Date((unix + timezone) * 1000).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

  const sunrise = toTime(data.sys.sunrise, data.timezone);
  const sunset = toTime(data.sys.sunset, data.timezone);

  return (
    <div className="bg-[#001311] max-w-sm  p-6 rounded-2xl shadow-lg space-y-4">
      <div className="flex items-center space-x-4">
        <img src={icon} alt={weatherMain} className="w-16 h-16" />
        <div>
          <h2 className="text-3xl font-semibold">
            {kelvinToCelsius(data.main.temp)}°C
          </h2>
          <p className="text-sm text-gray-400">
             Feels like {kelvinToCelsius(data.main.feels_like)}°C
          </p>
          <p className="text-gray-300 text-sm">
            {data.name}, {data.sys.country}
          </p>
        </div>
      </div>

      <div className="flex justify-between items-center bg-[#0d1f1f] px-4 py-2 rounded-xl text-sm">
        <div className="text-center">
          <p>🌅</p>
          <p>{sunrise}</p>
        </div>
        <p className="text-gray-400">——</p>
        <div className="text-center">
          <p>🌇</p>
          <p>{sunset}</p>
        </div>
      </div>

      <div className="flex justify-between items-center text-sm bg-[#0f2323] px-4 py-3 rounded-xl">
        <div className="flex items-center space-x-1 bg-white rounded-xl">
          <img src="/src/assets/umbrella.png" alt="Rain" className="w-5 h-5" />
          <p>Rain: {data.rain?.["1h"] ? "Yes" : "No"}</p>
        </div>
        <p>💧 {data.main.humidity}%</p>
        <p><img src="https://raw.githubusercontent.com/Makin-Things/weather-icons/master/animated/wind.svg" alt="" />{data.wind.speed} km/h</p>
      </div>
    </div>
  );
};

export default Weather;
