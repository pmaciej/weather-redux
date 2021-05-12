import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  getWeatherFromCoords,
  getLocationFromCoords,
  getLocationListFromInput,
  setError,
} from '../store/actions/weatherActions';
import {debounce} from 'lodash';
import Context from '../Context';
import Header from './Layout/Header';
import Content from './Layout/Content';
import Tagline from './Tagline';
import WeatherSearch from './WeatherSearch';
import WeatherData from './WeatherData';
import Error from './Error';
import Footer from './Layout/Footer';
import {NUMBER_OF_DAYS_TO_DISPLAY} from '../helpers/keys.js';
import getValueFromLocation from '../helpers/getValueFromLocation';

const localStorageName = 'Last Session Coordinates';

const Main = () => {
  const dispatch = useDispatch();
  const weather = useSelector((state) => state.weather.data);
  const location = useSelector((state) => state.location.data);
  const locationList = useSelector((state) => state.locationList.data);
  const error = useSelector((state) => state.weather.error);

  useEffect(() => {
    if (localStorage.getItem(localStorageName) === null) {
      navigator.geolocation.getCurrentPosition((position) => {
        dispatch(
          getWeatherFromCoords(
            position.coords.latitude,
            position.coords.longitude
          )
        );
        dispatch(
          getLocationFromCoords(
            position.coords.latitude,
            position.coords.longitude
          )
        );
      });
    } else {
      const lastSession = JSON.parse(localStorage.getItem(localStorageName));
      dispatch(
        getWeatherFromCoords(lastSession.latitude, lastSession.longitude)
      );
      dispatch(
        getLocationFromCoords(lastSession.latitude, lastSession.longitude)
      );
    }
  }, [dispatch]);
  
  const selectOption = debounce((input) => {
    dispatch(setError(null));
    if (!locationList) {
      dispatch(getLocationListFromInput(input));
    }

    if (locationList) {
      const newLocation = locationList.find(
        (location) => input === getValueFromLocation(location)
      );

      if (newLocation) {
        dispatch(getWeatherFromCoords(newLocation.lat, newLocation.lon));
        dispatch(getLocationFromCoords(newLocation.lat, newLocation.lon));
        localStorage.setItem(
          localStorageName,
          JSON.stringify({
            latitude: newLocation.lat,
            longitude: newLocation.lon,
            name: newLocation.name,
            country: newLocation.country,
            state: newLocation.state,
          })
        );
      }
      dispatch(getLocationListFromInput(null));
    }
  }, 1000);

  return (
    <div className="main">
      <Header />
      <Content>
        <Context.Provider
          value={{
            location,
            weather,
            locationList,
            selectOption,
          }}
        >
          <Tagline />
          <WeatherSearch />
          <Error error={error} />
          {!weather && !error && <h1 data-testid="loading">Loading Data...</h1>}
          {weather &&
            location !== null &&
            location !== undefined &&
            weather.slice(0, NUMBER_OF_DAYS_TO_DISPLAY).map((item, index) => {
              return <WeatherData key={index} day={item} index={index} />;
            })}
        </Context.Provider>
        <Footer />
      </Content>
    </div>
  );
};

export default Main;
