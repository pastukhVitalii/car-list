import React, {useCallback} from "react";
import {useDispatch} from "react-redux";
import {deleteCarTC} from "../../redux/cars-reducer";
import Car from "./Car";
import {CarType} from "../../api/api";

type PropType = {
  cars: Array<CarType>
}

export const Cars = React.memo((props: PropType) => {

  const dispatch = useDispatch();

  const deleteCar = useCallback((carId: number) => {
    dispatch(deleteCarTC(carId))
  }, [dispatch])

  return (
    <div>
      <Car cars={props.cars} deleteCar={deleteCar}/>
    </div>
  );
});