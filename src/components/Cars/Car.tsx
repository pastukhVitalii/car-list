import React, {useCallback} from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Paper from '@material-ui/core/Paper';
import {CarType} from "../../api/api";
import {IconButton} from '@material-ui/core';
import {Delete} from "@material-ui/icons";
import {useDispatch} from "react-redux";
import {setCarTC} from "../../redux/cars-reducer";
import CarModal from '../Modal/CarModal';

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key,
): (a: { [key in Key]: number | string }, b: { [key in Key]: number | string }) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(array: T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

interface HeadCell {
  disablePadding: boolean;
  id: keyof CarType;
  label: string;
  numeric: boolean;
}

const headCells: HeadCell[] = [
  {id: 'brand', numeric: false, disablePadding: true, label: 'Brand'},
  {id: 'carNumber', numeric: true, disablePadding: false, label: 'Car Number'},
  {id: 'engineType', numeric: true, disablePadding: false, label: 'Engine Type'},
  {id: 'model', numeric: true, disablePadding: false, label: 'Model'},
];

interface EnhancedTableProps {
  classes: ReturnType<typeof useStyles>;
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof CarType) => void;
  order: Order;
  orderBy: string;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const {classes, order, orderBy, onRequestSort} = props;
  const createSortHandler = (property: keyof CarType) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    paper: {
      width: '100%',
      marginBottom: theme.spacing(2),
    },
    table: {
      minWidth: 550,
    },
    visuallyHidden: {
      border: 0,
      clip: 'rect(0 0 0 0)',
      height: 1,
      margin: -1,
      overflow: 'hidden',
      padding: 0,
      position: 'absolute',
      top: 20,
      width: 1,
    },
  }),
);

type MyTableRowType = {
  row: CarType
  deleteCar: (carId: number) => void
  labelId: string
}

function MyTableRow(props: MyTableRowType) {

  const dispatch = useDispatch();

  const [openCar, setOpenCar] = React.useState(false);

  const setCar = useCallback((carId: number) => {
    dispatch(setCarTC(carId));
    setOpenCar(true);
  }, [setOpenCar])

  return (
    <>
      <CarModal key={props.row.id} car={props.row} setOpenCar={setOpenCar} openCar={openCar}/>
      <TableRow
        hover
        tabIndex={-1}
        key={props.row.id}
      >
        <TableCell padding="checkbox">
        </TableCell>
        <TableCell component="th" id={props.labelId} scope="row" padding="none"
                   onClick={() => setCar(props.row.id)}>
          {props.row.brand}
        </TableCell>
        <TableCell align="right">{props.row.carNumber}</TableCell>
        <TableCell align="right">{props.row.engineType}</TableCell>
        <TableCell align="right" onClick={() => props.deleteCar(props.row.id)}>{props.row.model}
          <IconButton>
            <Delete/>
          </IconButton>
        </TableCell>
      </TableRow></>
  )
}

type PropType = {
  cars: Array<CarType>
  deleteCar: (carId: number) => void
}

export default React.memo(function Car(props: PropType) {

    const rows = props.cars;

    const classes = useStyles();
    const [order, setOrder] = React.useState<Order>('asc');
    const [orderBy, setOrderBy] = React.useState<keyof CarType>('model');
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof CarType) => {
      const isAsc = orderBy === property && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(property);
    };

    const handleChangePage = (event: unknown, newPage: number) => {
      setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };

    return (
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <TableContainer>
            <Table
              className={classes.table}
              aria-labelledby="tableTitle"
              aria-label="enhanced table"
            >
              <EnhancedTableHead
                classes={classes}
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
              />
              <TableBody>
                {stableSort(rows, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <MyTableRow key={row.id} labelId={labelId} row={row} deleteCar={props.deleteCar}/>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Paper>
      </div>
    );
  }
)