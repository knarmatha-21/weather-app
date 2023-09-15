import axios from "axios";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import Loader from "./Loader";
import searchIcon from '../assets/searchIcon.png'



const Weather = () =>{
    
    const [location, setLocation] = useState('');
    const [details, setDetails] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [toggle, setToggle] = useState(false);

    const apiKey = 'a45af9a6b06d4c86d9b1903b2130a7b9';
    const temparatureUnit = 'metric'; //"metric" for celsius, "imperial" for Fahrenheit
    const weatherIconURL = 'http://openweathermap.org/img/w'; // Weather Icon from API
    const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=${temparatureUnit}&appid=${apiKey}`
   
    const fetchData = async() =>{
        setIsLoading(true);
        setToggle(false);
        try{
            const response = await axios.get(apiURL);      
            setDetails(response.data);
            setIsLoading(false);
            setError('');
        }catch(e){       
                setError(e.response.data.message); 
                setIsLoading(false);
        }
    }
  
    const toggleBtn = () =>{
        toggle ? setToggle(false) : setToggle(true);
    }

    return(
        <div className="weatherBgSection">
            <div className="overlayBg"></div>
            <div>
                <h2 className="whiteFont title">Weather APP</h2>
            </div>
            <div className="weatherCard">
                <div className="locationSection">
                    <input className="locationInput" type="text" value={location} placeholder="Enter location" onChange={e=>setLocation(e.target.value)}/>
                    <Button onClick={fetchData} className="searchBtn">
                        <img src={searchIcon} alt="Search" className="searchIcon"/>
                    </Button>
                </div>
                {
                !isLoading ?<>
                {details && !error && <div className="weatherInfoSection"> 
                    <div className="weatherIconSection">
                        <img className="weatherIcon" src={`${weatherIconURL}/${details.weather[0].icon}.png`}/>
                    </div>
                    {
                        !toggle ? <h1 className="whiteFont"> {Math.round(details.main.temp)} °C </h1> : 
                        <h1 className="whiteFont"> {(Math.round(Math.round(details.main.temp) * 9/5) + 32)} F </h1>  
                    }
                    <div className="whiteFont locName"> {details.name}, {details.sys.country}</div>                   
                    <div className="smallText">{details.weather.length > 0 && details.weather[0].description}</div>
                    <div className="bottomSection">
                        <div className="whiteFont halfWidth">
                            <p className="bottomSectionTextSpace fontMedium">{details.main.humidity} %</p>
                            <p className="smallText bottomSectionTextSpace">Humidity</p>                            
                        </div>
                        <div className="whiteFont halfWidth">                            
                            <p className="bottomSectionTextSpace fontMedium">{details.wind.speed} m/s</p>
                            <p className="smallText bottomSectionTextSpace">Wind Speed</p>
                        </div>
                    </div> 
                    <div className="toggleSection">
                        <Form>
                            <Form.Check
                                type="switch"
                                id="custom-switch"
                                onClick={toggleBtn}    
                                className="toggleBtnStyle"                                                   
                            />
                        </Form>
                        <p className="smallText bottomSectionTextSpace">(Toggle to change temp to Fahrenheit)</p>
                    </div>                   
                </div>
                }
               
                {error && <div className="loaderSection"> 
                    <div>                        
                        <p className="whiteFont">{error}</p>
                    </div>             
                </div>
                }
                </>:
                    <div className="loaderSection">
                        <Loader/>
                    </div>
                }
            </div>
            
        </div>
    )
}

export default Weather
