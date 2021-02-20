import React, {useCallback, useState} from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import {Grid, Typography} from "@material-ui/core";
import MyInput from "../Input/Input";
import {MySelect} from "../Select/Select";
import {useDispatch} from "react-redux";
import {addCarTC} from "../../redux/cars-reducer";
import MyButton from "../Button/Button";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 auto',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 2, 2),
      display: 'flex',
      flexDirection: 'column',
    },
  }),
);

type PropsType = {
  open: boolean
  setOpen: (open: boolean) => void
}

export default function MyModal(props: PropsType) {

  const classes = useStyles();

  const handleClose = () => {
    props.setOpen(false);
  };

  const [brand, setBrand] = useState<string>('');
  const [carNumber, setCarNumber] = useState<string>('');
  const [engineType, setEngineType] = useState<string>('');
  const [model, setModel] = useState<string>('');

  const dispatch = useDispatch();

  let [error, setError] = useState<string | null>(null)

  const addCar = useCallback(() => {
    dispatch(addCarTC(brand, carNumber, engineType, model));
    setBrand('');
    setCarNumber('');
    setEngineType('');
    setModel('');
  }, [dispatch, brand, carNumber, engineType, model]);

  return (
    <div>
      <Modal
        className={classes.modal}
        open={props.open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={props.open}>
          <div className={classes.paper}>
            <Grid container justify={"space-between"} direction={"row"}>
              <Typography variant="h5">
                Add a new car
              </Typography>
              <Typography variant="h5" onClick={handleClose}>
                x
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
              <MyButton label={'cancel'} onClick={handleClose} disabled={false}/>
              <MyButton label={'ok'} onClick={addCar} disabled={!brand || !carNumber || !engineType || !model}/>
            </Grid>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}