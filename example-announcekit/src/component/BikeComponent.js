import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { useQuery } from '@apollo/client';
import { GET_VEHICLE_STATUS } from '../apollo/query/bike';
import { Checkbox, TablePagination } from '@material-ui/core';
import { toast } from 'react-toastify';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
    root: {
        marginTop: '15px'
    },
});

let dataVehicleStatus = [];

export default function BikeComponent() {
    const classes = useStyles();

    const [bikeId, setBikeId] = React.useState('');

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const { data, refetch, loading, error } = useQuery(GET_VEHICLE_STATUS, {
        variables: { bike_id: bikeId }
    });

    useEffect(() => {
        if (data?.VehicleStatus.length > 1 && JSON.stringify(dataVehicleStatus) !== JSON.stringify(data?.VehicleStatus)) {
            toast.success('All data updated');
        }
        else if (data && data.VehicleStatus.length === 1) {
            toast.success('Updated ' + bikeId + ' bike');
        }
    }, [data, bikeId]);

    if (data?.VehicleStatus.length > 1 && JSON.stringify(dataVehicleStatus) !== JSON.stringify(data?.VehicleStatus)) {
        dataVehicleStatus = data.VehicleStatus;
    }
    else if (data?.VehicleStatus.length === 1) {
        dataVehicleStatus.map(x => {
            if (x.Bike_id === data.VehicleStatus[0].Bike_id) {
                x = data.VehicleStatus[0];
            }
        });
    }

    if (error) toast.error(`Error! ${error}`);

    return (
        <React.Fragment>
            <TextField id="outlined-basic" label="Bike ID" variant="outlined" value={bikeId} onChange={e => setBikeId(e.target.value)} />
            <Button disabled={loading} style={{ marginLeft: 10 }} variant="contained" color="primary" onClick={() => refetch()}>
                {loading ? 'Updating' : 'Update Status'}
            </Button>
            <Paper className={classes.root}>
                <TableContainer component={Paper}>
                    <Table className={classes.table} stickyHeader aria-label="sticky">
                        <TableHead>
                            <TableRow>
                                <TableCell>Bike ID</TableCell>
                                <TableCell align="right">Lat</TableCell>
                                <TableCell align="right">Lon</TableCell>
                                <TableCell align="right">Reserved</TableCell>
                                <TableCell align="right">Disabled</TableCell>
                                <TableCell align="right">Type</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {dataVehicleStatus.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, key) => (
                                <TableRow key={key} >
                                    <TableCell component="th" scope="row">
                                        {row.Bike_id}
                                    </TableCell>
                                    <TableCell align="right">{row.Lat}</TableCell>
                                    <TableCell align="right">{row.Lon}</TableCell>
                                    <TableCell align="right">
                                        <Checkbox
                                            checked={row.Is_reserved}
                                            color="primary"
                                            inputProps={{ 'aria-label': 'secondary checkbox' }}
                                        />
                                    </TableCell>
                                    <TableCell align="right">
                                        <Checkbox
                                            checked={row.Is_disabled}
                                            color="primary"
                                            inputProps={{ 'aria-label': 'secondary checkbox' }}
                                        />
                                    </TableCell>
                                    <TableCell align="right">{row.Vehicle_type}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={dataVehicleStatus.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Paper>
        </React.Fragment>
    );
}