import {Dispatch} from 'redux'
import {carsApi, CarType, ResCarsType} from "../api/api";

type initialStateType = {
  cars: Array<CarType>
}

const initialState: initialStateType = {
  cars: []
}

export const carsReducer = (state: ResCarsType = initialState, action: ActionsType): initialStateType => {
  switch (action.type) {
    case "SET-CARS":
      return {
        ...state,
        cars: action.cars
      }
    case 'ADD-CAR':
      return {...state, cars: [action.car, ...state.cars]}
    case 'DELETE-CAR':
      return {
        ...state,
        cars: state.cars.filter(c => c.id !== action.carId)
      }
    default:
      return state
  }
}

// actions

export const setCarsAC = (cars: Array<CarType>) => ({type: 'SET-CARS', cars: cars} as const);
export const addCarAC = (car: CarType) => ({type: 'ADD-CAR', car} as const);
export const deleteCarAC = (carId: number) => ({type: 'DELETE-CAR', carId} as const);

// thunks

export const setCarsTC = () => {
  return (dispatch: ThunkDispatch) => {
    carsApi.getCars()
      .then((res) => {
        dispatch(setCarsAC(res.data.cars))
      })
      .catch(error => {
        console.log(error, dispatch);
      })
  }
}

export const addCarTC = (brand: string, carNumber: string, engineType: string, model: string) => {
  return (dispatch: ThunkDispatch) => {
    carsApi.addCar(brand, carNumber, engineType, model)
      .then((res) => {
        dispatch(addCarAC(res.data.car))
      })
      .catch(error => {
        console.log(error, dispatch);
      })
  }
}

export const deleteCarTC = (carId: number) => {
  return (dispatch: ThunkDispatch) => {
    carsApi.deleteCar(carId)
      .then((res) => {
        dispatch(deleteCarAC(carId))
      })
      .catch(error => {
        console.log(error, dispatch);
      })
  }
}
// types

export type SetCarsActionType = ReturnType<typeof setCarsAC>;
export type AddCarActionType = ReturnType<typeof addCarAC>;
export type DeleteCarActionType = ReturnType<typeof deleteCarAC>;
type ActionsType = SetCarsActionType | AddCarActionType | DeleteCarActionType;

type ThunkDispatch = Dispatch<ActionsType>