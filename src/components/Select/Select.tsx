import React, {useCallback, useMemo} from 'react';
import {createStyles, FormControl, InputLabel, makeStyles, MenuItem, Select, Theme} from "@material-ui/core";

type PropsType = {
  label: string
  filterItems: Array<string>
  setValue: (value: string) => void
}
export const MySelect = React.memo(function (props: PropsType) {
  console.log('Select');

  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      formControl: {
        margin: 10,
        minWidth: 222,
      },
      selectEmpty: {
        marginTop: theme.spacing(2),
      },
    }),
  );

  const classes = useStyles();

  let [statusApi, setStatus] = React.useState('');
  const handleChange = useCallback((event: React.ChangeEvent<{ value: unknown }>) => {
    setStatus(event.target.value as string);
    props.setValue(event.target.value as string);
  }, [statusApi, props.setValue]);


  return (
    <>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="demo-simple-select-outlined-label">{props.label}</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={statusApi}
          onChange={handleChange}
          label={props.label}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {useMemo(() => {
            return props.filterItems.map(f => {
              return <MenuItem key={f} value={f}>{f}</MenuItem>
            })
          }, [props.filterItems])}
        </Select>
      </FormControl>
    </>
  );
})

