import React, {useCallback, useState} from "react";
import MyInput from "../Input/Input";
import {Button} from "@material-ui/core";
import {useDispatch} from "react-redux";
import {addCarTC, deleteCarTC} from "../../redux/cars-reducer";
import Car from "./Car";
import {CarType} from "../../api/api";

type PropType = {
  cars: Array<CarType>
}

export const Cars = React.memo((props: PropType) => {

  const [brand, setBrand] = useState<string>('');
  const [carNumber, setCarNumber] = useState<string>('');
  const [engineType, setEngineType] = useState<string>('');
  const [model, setModel] = useState<string>('');

  const dispatch = useDispatch();

  const onClick = useCallback(() => {
    dispatch(addCarTC(brand, carNumber, engineType, model))
  }, [dispatch, brand, carNumber, engineType, model])

  const deleteCar = useCallback((carId: number) => {
    dispatch(deleteCarTC(carId))
  },[dispatch] )

  return (
    <div>
      <div>
        <MyInput label={'Brand'} setValue={setBrand}/>
        <MyInput label={'Car Number'} setValue={setCarNumber}/>
        <MyInput label={'Engine Type'} setValue={setEngineType}/>
        <MyInput label={'Model'} setValue={setModel}/>
      </div>
      <Button variant="contained" color="primary" onClick={onClick}>
        Add
      </Button>
      <div>
        <Car cars={props.cars}/>
      </div>
    </div>
  );
});