import React, {ChangeEvent, useCallback} from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: 10,
      minWidth: 222,
    },
  }),
);
type PropsType = {
  label: string
  value: string
  setValue: (value: string) => void
  error: string | null
  setError: (error: string | null) => void
}
export default React.memo(function MyInput(props: PropsType) {
  const classes = useStyles();

  const onChange = useCallback((event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const value = event.currentTarget.value;
    if (value.trim() !== '') {
      props.setValue(value);
      props.setError(null);
    } else {
      props.setError("Title is required");
    }
  }, [props])
  return (
    <TextField className={classes.formControl} label={props.label} variant="outlined"
               onChange={onChange}
               helperText={props.error} value={props.value}/>
  );
})