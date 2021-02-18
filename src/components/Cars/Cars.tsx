import React, {useCallback, useState} from "react";
import MyInput from "../Input/Input";
import {Button} from "@material-ui/core";
import {useDispatch} from "react-redux";
import {addCarTC, deleteCarTC} from "../../redux/cars-reducer";
import Car from "./Car";
import {CarType} from "../../api/api";
import {MySelect} from "../Select/Select";

type PropType = {
  cars: Array<CarType>
}

export const Cars = React.memo((props: PropType) => {

  const [brand, setBrand] = useState<string>('');
  const [carNumber, setCarNumber] = useState<string>('');
  const [engineType, setEngineType] = useState<string>('');
  const [model, setModel] = useState<string>('');

  const dispatch = useDispatch();

  let [error, setError] = useState<string | null>(null)

  const onClick = useCallback(() => {
    dispatch(addCarTC(brand, carNumber, engineType, model))
  }, [dispatch, brand, carNumber, engineType, model])

  const deleteCar = useCallback((carId: number) => {
    dispatch(deleteCarTC(carId))
  },[dispatch] )

  return (
    <div>
      <div>
        <MyInput label={'Brand'} setValue={setBrand} setError={setError} error={error}/>
        <MyInput label={'Car Number'} setValue={setCarNumber} setError={setError} error={error}/>
        <MySelect label={'Engine Type'} filterItems={['FUEL', 'GAS', 'HYBRID']} setValue={setEngineType}/>
        <MyInput label={'Model'} setValue={setModel} setError={setError} error={error}/>
      </div>
      <Button variant="contained" color="primary" onClick={onClick}>
        Add
      </Button>
      <div>
        <Car cars={props.cars} deleteCar={deleteCar}/>
      </div>
    </div>
  );
});