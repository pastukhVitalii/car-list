import React, {ChangeEvent} from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            '& > *': {
                margin: theme.spacing(1),
                width: '25ch',
            },
        },
    }),
);
type PropsType = {
    label: string
    setValue: (value: string) => void
}
export default function MyInput(props: PropsType) {
    const classes = useStyles();

    const onChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const value = event.currentTarget.value;
        props.setValue(value);
        console.log(value);
    }

    return (
        <form className={classes.root} noValidate autoComplete="off">
            <TextField id="outlined-basic" label={props.label} variant="outlined" onChange={onChange}/>
        </form>
    );
}