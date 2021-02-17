import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import {carsReducer} from "./cars-reducer";

let rootReducer = combineReducers({
  cars: carsReducer,
})

export type AppStateType = ReturnType<typeof rootReducer>

const store = createStore(rootReducer, applyMiddleware(thunk));
export default store;

// @ts-ignore
window.store = store