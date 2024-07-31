import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios'



function App() {
  const [weatherData, setweatherData] = useState(null)
  const [location, setLocation] = useState('')

  useEffect (()=>{
  const fetchData = async () =>{
    if (!location) return;
    try {
      const response = await axios.get(`http://api.weatherapi.com/v1/forecast.json?key=${import.meta.env.VITE_WEATHER_API}&q=${location}&days=7&aqi=yes&alerts=yes`);
      setweatherData(response.data)
      console.log(response)
    } catch (error) {
      console.log(error)
    }
   };
     
      fetchData();

  },[location])

  const handleLocationChange = (event) =>{
    setLocation(event.target.value)
  }


  function getWeekday(dateStr) {
    const dateObj = new Date(dateStr);
    const weekdays = ["Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi"];
    return weekdays[dateObj.getDay()];
  }

  return(
    
    <div className='container'>
     <h1 className='title'> Weather App </h1>
     <div >
      <input className='input-container'
      type="text"
      placeholder='Search'
      value={location}
      onChange={handleLocationChange}
      />
      
     </div>
     {weatherData && <WeatherComponent weatherData={weatherData} getWeekday={getWeekday} />}
    </div>

  );
}
     
const WeatherComponent = ({ weatherData, getWeekday }) => {
  return (
  

    <div className='weather-container'>
      {weatherData.forecast.forecastday.map((day)=> (
     <div className='day' key={day.date}> 
      <h2 className='date' style={{backgroundColor:"#ebe9e9"}}> 
        {getWeekday(day.date)}    <br />
        {day.date}
      </h2>
                <img className='weather-icon ' style={{backgroundColor:"#ebe9e9"}} src={day.day.condition.icon} alt={day.day.condition.text} />
                <p className='temperature' style={{backgroundColor:"#ebe9e9"}}> {day.day.avgtemp_c} C</p>
                <p className='temperature' style={{backgroundColor:"#ebe9e9"}}> {day.day.condition.text}</p>
     </div>

))}
      
    </div>
  
)
}

  
export default App;

