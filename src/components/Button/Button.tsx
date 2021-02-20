import React from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  }),
);
type PropsType = {
  label: string
  onClick: () => void
  disabled: boolean
}
export default React.memo(function MyButton(props: PropsType) {

  const classes = useStyles();

  return (
    <div className={classes.root} >
      <Button variant="contained" color="primary" onClick={props.onClick} disabled={props.disabled}>
        {props.label}
      </Button>
    </div>
  );
})