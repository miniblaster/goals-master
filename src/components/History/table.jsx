import React from 'react';
import {withStyles, makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import {Chip} from "@material-ui/core";

const columns = [
    { id: 'title', label: 'Title', maxWidth: 120},
    // { id: 'win_amount', label: 'Win Amount', minWidth: 150, align: 'center'},
    // { id: 'bet_amount', label: 'Bet Amount' , minWidth: 150},
    { id: 'results', label: 'Result', align: 'center' },
    { id: 'status', label: 'Status', align: 'center' },
    { id: 'created', label: 'Date', minWidth: 120},
];

function createData(title, results, status, created) {
    return { title, results, status, created };
}

const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    container: {
        height: 'calc(100vh - 140px)',
        color: 'white'
    },
});
const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: '#363554',
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },

    },
}))(TableRow);
export default function HistoryTable(props) {
    const Loose= ({is_win, status}) =>{
        const color = status === 'Live' ? 'grey' : is_win === 0 ? "red" : "green"
        const label = status === 'Live' ? '--' : is_win === 0 ? "Loose" : "Win"
        return(
            <Chip
                style={{background: color, color: 'white', width:'80px'}}
                label={label}
            />
        )
    }
    const Status= ({status}) =>{
        const color = status === 'Finished' ? "#1b80e5" : "#0DA403"
        const label = status === 'Live' ? "Live" : "Finished"
        return(
            <Chip
                style={{background: color, color: 'white', width:'80px'}}
                label={label}
            />
        )
    }

    let rows = []
    if(props.data){
        props.data.map((obj)=>{
            rows.push(
                createData(obj.title, (<Loose is_win={obj.is_win} status={obj.status}/>), (<Status status={obj.status}/>), obj.created)
            )
        })
    }

    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <Paper className={classes.root}>
            <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <StyledTableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </StyledTableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                            return (
                                <StyledTableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                    {columns.map((column) => {
                                        const value = row[column.id];
                                        return (
                                            <StyledTableCell key={column.id} align={column.align}>
                                                {column.format && typeof value === 'number' ? column.format(value) : value}
                                            </StyledTableCell>
                                        );
                                    })}
                                </StyledTableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </Paper>
    );
}
