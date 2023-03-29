import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

export default function StickyHeadTable({ columns = [], rows = [], handleView, handleUpdate, handleDelete }) {
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
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow className='title-row'>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align='center'
                                    sx={{ fontWeight: 'bold', fontSize: '1rem' }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {/* Set the data and the view, edit and delete action buttons */}
                        {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                            return (
                                <TableRow
                                    hover
                                    role="checkbox"
                                    tabIndex={-1}
                                    key={row.id}
                                >
                                    {columns.map((column) => {
                                        const value = row[column.id];
                                        if (column.id === 'actions') {
                                            return (
                                                <TableCell key={`${column.id}`} align='center'>
                                                    <i className='bi bi-eye-fill' onClick={ () => handleView(row.id)}/>
                                                    <i className='bi bi-pencil-fill ms-3 text-info' onClick={ () => handleUpdate(row.id)}/>
                                                    <i className='bi bi-trash-fill ms-3 text-danger' onClick={ () => handleDelete(row.id)}/>
                                                </TableCell>
                                            );
                                        }
                                        return (
                                            <TableCell key={`${column.id}`} align='center'>
                                                {column.format && typeof value === 'number' ? column.format(value) : value}
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
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
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}
