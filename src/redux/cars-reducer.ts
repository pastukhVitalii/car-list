import {Dispatch} from 'redux'
import {carsApi, CarType, ResCarsType} from "../api/api";

const initialState: ResCarsType = {
  cars: [],
}

export const carsReducer = (state: ResCarsType = initialState, action: ActionsType): ResCarsType => {
  switch (action.type) {
    case "SET-CARS":
      return {
        ...state,
        cars: action.cars
      }
    default:
      return state
  }
}

// actions

export const setCarsAC = (cars: Array<CarType>) => ({type: 'SET-CARS', cars: cars} as const)

// thunks

export const setCarsTC = () => {
  return (dispatch: ThunkDispatch) => {
    carsApi.getCars()
      .then((res) => {
        debugger
        dispatch(setCarsAC(res.data.cars))
      })
      .catch(error => {
        console.log(error, dispatch);
      })
  }
}
// types

export type SetCarsActionType = ReturnType<typeof setCarsAC>;
type ActionsType = SetCarsActionType

type ThunkDispatch = Dispatch<ActionsType>