import axios from "axios";

const instance = axios.create({
  baseURL: 'https://test-backend.esverito.com',
  // ...settings
})

// api
export const carsApi = {

  getCars() {
    return instance.get<ResCarsType>(`/api/car`);
  },
}

// types
/*export type ResponseCarsType = {
  cars: Array<CarType>
}*/

export type ResCarsType = {
  cars: Array<CarType>
}

export type CarType = {
  id: number
  carNumber: string
  model: string
  brand: string
  engineType: string
}
