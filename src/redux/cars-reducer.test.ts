import {addCarAC, carsReducer, changeCarAC, deleteCarAC, initialStateType} from "./cars-reducer";


const startStates: initialStateType = {
  cars: [
    {id: 1, brand: 'BMW', carNumber: 'AA1111BB', engineType: 'FUEL', model: 'X5'},
    {id: 2, brand: 'AUDI', carNumber: 'AA7777BB', engineType: 'GAS', model: 'Q7'}
  ]
}

test('correct car should be removed', () => {

  const endState = carsReducer(startStates, deleteCarAC(1));
  expect(endState.cars.length).toBe(1);
});

test('should be create new car', () => {
  let newCar = {id: 3, brand: 'Opel', carNumber: 'BC0101BB', engineType: 'GAS', model: 'Insignia'};
  const endState = carsReducer(startStates, addCarAC(newCar));
  expect(endState.cars.length).toBe(3);
})

test('should be change car', () => {
  let newCar = {id: 1, brand: 'Opel', carNumber: 'BC0101BB', engineType: 'GAS', model: 'Insignia'};
  const endState = carsReducer(startStates, changeCarAC(newCar));
  expect(endState.cars[0].brand).toBe('Opel');
})
