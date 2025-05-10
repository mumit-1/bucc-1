import React, { useContext, useEffect, useState } from "react";
import { tower } from './Root';
import { FiSunrise, FiSunset } from "react-icons/fi";
import { MdOutlineWaves } from "react-icons/md";
import { IoIosSearch } from "react-icons/io";
import { BsUmbrellaFill } from "react-icons/bs";
import { DateTime } from "luxon";
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
  const [sure,setSure] = useState("dhaka");
  const [data, setData] = useState(null);
  const {mode}= useContext(tower);
  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${sure}&appid=${import.meta.env.VITE_apikey}`
    )
      .then((res) => res.json())
      .then((dataX) => setData(dataX));
  }, [sure]);
  if (!data || !data.weather || !data.main || !data.sys) {
    return (
      <div className="text-center text-white mt-10">Loading weather...</div>
    );
  }

  const weatherMain = data.weather[0].main;
  
  const timePro = data.weather[0].icon[2];
  let icon ="";
  if(timePro==="d"){
     icon = (weatherIconsDay[weatherMain]? weatherIconsDay[weatherMain]:weatherIconsDay["Clouds"]) ;
  }
  else{
     icon = (weatherIconsNight[weatherMain]? weatherIconsNight[weatherMain]:weatherIconsNight["Clouds"]) ;
  }
  

  const kelvinToCelsius = (k) => (k - 273.15).toFixed(1);


const toTime = (unix, offsetInSeconds) => {
  return DateTime.fromSeconds(unix + offsetInSeconds).toUTC().toFormat("HH:mm");
};


const sunrise = toTime(data.sys.sunrise, data.timezone);
const sunset = toTime(data.sys.sunset, data.timezone);

    const handleSubmit = (e) =>{
      e.preventDefault();
      const name = e.target.name.value;
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=54e1a12935effbdc259c8047a664335a`
      )
      .then((res) => res.json())
      .then((dataX2) => {
        dataX2.cod ==="404" ? null: setSure(name)
      });
    }
  return (
    <div className={`bg-[#001311] lg:max-w-sm  p-6 rounded-2xl shadow-lg space-y-4 ${mode?"bg-[#001311]":"bg-white border border-[#132523]"} rounded-3xl p-2 border-transparent shadow-lg`}>
      <div className="flex items-center flex-col ">
        <div><img src={icon} alt={weatherMain} className="w-24" /></div>
        <div className="flex justify-center items-center flex-col">
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

      <div className={`flex justify-between items-center ${mode?"bg-[#112120]":"bg-gray-200"}   px-2.5 py-2 rounded-full text-sm`}>
        <div className="text-center">
          <p className="flex justify-center items-center gap-2"><FiSunrise className={`text-xl bg-[#02ffe2] rounded-full w-8 h-8 p-1.5 text-black`}/>{sunrise}</p>
        </div>
        <p className="text-gray-400">---</p>
        <div className="text-center">
          <p className="flex justify-center items-center gap-2">{sunset}<FiSunset className="text-xl text-black bg-[#02ffe2] rounded-full w-8 h-8 p-1.5"/></p>
        </div>
      </div>
      
      <div className={`flex justify-between items-center rounded-2xl`}>
        <div className="flex justify-center items-center gap-3 w-full">
          <div className="flex justify-center items-center flex-col w-1/2">
            <div className={`w-full flex px-1.5 py-2 rounded-full items-center space-x-1 ${mode?"bg-[#112120]":"bg-gray-200"}  rounded-2xl`}>
              <BsUmbrellaFill className={`w-7 h-7 bg-[#02ffe2] text-black rounded-full p-1.5`} />
              <p>Rain: {data.rain?.["1h"] ? "Yes" : "No"}</p>
            </div>
            <div className={`${mode?"bg-[#112120]":"bg-gray-200"} w-full rounded-2xl mt-3 py-4`}>
            <div className="flex flex-col justify-center items-center text-xl"><MdOutlineWaves  className="w-20 text-3xl mx-auto shadow-2xl"/><p className="text-center  px-2 py-0.5 text-lg">{data.main.humidity}%</p><p className="text-center text-xs opacity-50">Humidity</p></div>
            </div>
          </div>
          <div className="w-1/2 h-full">
            <div className={` px-1 h-[165px] rounded-2xl  ${mode?"bg-[#112120]":"bg-gray-200"}  rounded-xl`}>
            <p className="flex flex-col justify-center items-center text-xl"><img src="https://raw.githubusercontent.com/Makin-Things/weather-icons/master/animated/wind.svg" alt="" className="py-2.5"/><span className="px-9">{data.wind.speed}</span> km/h</p><p className="text-center text-xs opacity-50 pt-2.5">Wind Speed</p>
            </div>
          </div>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="flex gap-2.5" >
        <input type="text" name="name" id="" className={` ${mode?"bg-[#112120]":"bg-gray-200"} p-1.5 rounded-full pl-3 w-full`} placeholder="Enter City Name"/>
        <button className=" text-black bg-[#02ffe2] rounded-full w-9 h-9 p-2.5"><IoIosSearch /></button>
      </form>
    </div>
  );
};

export default Weather;
