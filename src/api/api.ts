import axios from "axios";

const instance = axios.create({
  baseURL: 'https://test-backend.esverito.com/api',
  // ...settings
})

// api
export const carsApi = {

  getCars() {
    return instance.get<ResCarsType>(`/car`);
  },
  addCar(brand: string, carNumber: string, engineType: string, model: string) {
    return instance.post<ResCarType>(`/car`, {
      brand: brand,
      carNumber: carNumber,
      engineType: engineType,
      model: model
    });
  },
  deleteCar(carId: number) {
    return instance.delete(`/car/${carId}`)
  },
  changeCar(carId: number, brand: string, carNumber: string, engineType: string, model: string) {
    return instance.put<ResCarType>(`/car/${carId}`, {
      brand: brand,
      carNumber: carNumber,
      engineType: engineType,
      model: model
    })
  }
}

// types
export type ResCarType = {
  car: CarType
}

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
