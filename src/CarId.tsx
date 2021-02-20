import React, {useCallback, useState} from "react";
import {useHistory, useParams} from "react-router-dom";
import {CarType} from "./api/api";
import MyInput from './components/Input/Input';
import {MySelect} from './components/Select/Select';
import MyButton from './components/Button/Button';
import {Grid, Typography} from "@material-ui/core";
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import {changeCarTC} from "./redux/cars-reducer";
import {useDispatch} from "react-redux";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 auto',
    },
    paper: {
      padding: theme.spacing(2, 2, 2),
      display: 'flex',
      flexDirection: 'column',
    },
  }),
);

type RouterParams = {
  carId: string
}

type PropsType = {
  cars: Array<CarType>
}
export const CarId = React.memo(function (props: PropsType) {
  const classes = useStyles();

  const params = useParams<RouterParams>();
  const carArr = props.cars.filter(c => c.id === Number(params.carId));
  const car = carArr[0];
  const [brand, setBrand] = useState<string>(car.brand);
  const [carNumber, setCarNumber] = useState<string>(car.carNumber);
  const [engineType, setEngineType] = useState<string>(car.engineType);
  const [model, setModel] = useState<string>(car.model);

  let [error, setError] = useState<string | null>(null)

  const dispatch = useDispatch();
  const history = useHistory();

  const editCar = useCallback(() => {
    dispatch(changeCarTC(Number(params.carId), brand, carNumber, engineType, model));
    history.push('/');
  }, [dispatch, history, params.carId, brand, carNumber, engineType, model])
  console.log(car);
  return (
    <div>
      <div className={classes.paper}>
        <Grid container justify={"space-between"} direction={"row"}>
          <Typography variant="h5">
            Edit car
          </Typography>
        </Grid>
        <Grid container justify={"space-around"} direction={"column"} wrap={"wrap"}>
          <MyInput label={'Brand'} value={brand} setValue={setBrand} setError={setError} error={error}/>
          <MyInput label={'Car Number'} value={carNumber} setValue={setCarNumber} setError={setError}
                   error={error}/>
        </Grid>
        <Grid container justify={"center"} direction={"column"} wrap={"wrap"}>
          <MySelect label={'Engine Type'} filterItems={['FUEL', 'GAS', 'HYBRID']} value={engineType}
                    setValue={setEngineType}/>
          <MyInput label={'Model'} value={model} setValue={setModel} setError={setError} error={error}/>
        </Grid>
        <Grid container justify={"flex-end"} direction={"row"} wrap={"wrap"}>
          <MyButton label={'cancel'} onClick={() => history.push('/')} disabled={false}/>
          <MyButton label={'edit'} onClick={editCar} disabled={!brand && !carNumber && !engineType && !model}/>
        </Grid>
      </div>
    </div>
  )
})