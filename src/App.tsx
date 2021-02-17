import React, {useEffect} from 'react';
import './App.css';
import {CarType} from "./api/api";
import {AppStateType} from "./redux/store";
import {useDispatch, useSelector} from "react-redux";
import {setCarsTC} from "./redux/cars-reducer";

function App() {

  const cars = useSelector<AppStateType, Array<CarType>>(state=> state.cars.cars);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setCarsTC());
  }, [dispatch]);

  console.log(cars);
  return (
    <div className="App">

    </div>
  );
}

export default App;
