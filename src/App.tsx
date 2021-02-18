import React, {useEffect} from 'react';
import './App.css';
import {CarType} from "./api/api";
import {AppStateType} from "./redux/store";
import {useDispatch, useSelector} from "react-redux";
import {setCarsTC} from "./redux/cars-reducer";
import {Cars} from "./components/Cars/Cars";
import MyButton from "./components/Button/Button";
import MyModal from "./components/Modal/Modal";

function App() {

  const cars = useSelector<AppStateType, Array<CarType>>(state => state.cars.cars);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setCarsTC());
  }, [dispatch]);

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  console.log(cars);
  return (
    <div className="App">
      <MyButton label={'Add car'} onClick={handleOpen}/>
      <MyModal open={open} setOpen={setOpen}/>
      <Cars cars={cars}/>
    </div>
  );
}

export default App;
