import React, {useCallback, useEffect} from 'react';
import './App.css';
import {CarType} from "./api/api";
import {AppStateType} from "./redux/store";
import {useDispatch, useSelector} from "react-redux";
import {deleteCarTC, setCarsTC} from "./redux/cars-reducer";
import MyButton from "./components/Button/Button";
import MyModal from "./components/Modal/Modal";
import {AppBar, IconButton, Toolbar, Typography} from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import {Route} from 'react-router-dom';
import {CarProfile} from "./components/CarProfile/CarProfile";
import Cars from "./components/Cars/Cars";

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

  const deleteCar = useCallback((carId: number) => {
    dispatch(deleteCarTC(carId))
  }, [dispatch])

  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <MenuIcon/>
          </IconButton>
          <Typography variant="h6">
            Cars
          </Typography>
        </Toolbar>
      </AppBar>
      <MyButton label={'Add car'} onClick={handleOpen} disabled={false}/>
      <MyModal open={open} setOpen={setOpen}/>
      <Route exact path={'/'} render={() =>
        <Cars cars={cars} deleteCar={deleteCar}/>}
      />
      <Route path='/car/:carId' render={() => <CarProfile cars={cars}/>}/>
    </div>
  );
}

export default App;
