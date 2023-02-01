import React, { useState } from 'react';
import {
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Paper,
    Checkbox,
    Container,
    IconButton,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import TableToolbar from '../components/TableToolbar';
import TableHeader from '../components/TableHeader';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getComparator, stableSort } from '../common/funcations';



const Dashboard = () => {
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('name');
    const [selected, setSelected] = useState([]);
    const navigate = useNavigate()
    const [search, setSearch] = useState('')
    const dispatch = useDispatch();

    const productData = useSelector((state) => state.productData);
    const SearchedProductData = useSelector((state) => state.SearchedProductData);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelected = productData.map((n) => n.id);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        setSelected(newSelected);
    };

    const handaleSearchChange = (e) => {
        const { value } = e.target
        setSearch(value)
        dispatch({ type: "SEARCH_PRODUCT", payload: search });
    }
    const isSelected = (name) => selected.indexOf(name) !== -1;

    return (
        <Container>
            <Box sx={{ width: '100%', marginTop: 10 }}>
                <Paper sx={{ width: '100%', mb: 2 }}>
                    <TableToolbar numSelected={selected.length}
                        selected={selected}
                        setSelected={setSelected}
                        search={search}
                        handaleSearchChange={handaleSearchChange} />
                    <TableContainer>
                        <Table
                            sx={{ minWidth: 750 }}
                            aria-labelledby="tableTitle"
                            size='medium'
                        >
                            <TableHeader
                                numSelected={selected.length}
                                order={order}
                                orderBy={orderBy}
                                onSelectAllClick={handleSelectAllClick}
                                onRequestSort={handleRequestSort}
                                rowCount={productData.length}
                            />
                            <TableBody>
                                {stableSort((search !== '' && SearchedProductData?.length > 0 ? SearchedProductData : productData), getComparator(order, orderBy))
                                    .map((row, index) => {
                                        const isItemSelected = isSelected(row.id);
                                        const labelId = `enhanced-table-checkbox-${index}`;

                                        return (
                                            <TableRow
                                                hover
                                                onClick={(event) => handleClick(event, row.id)}
                                                role="checkbox"
                                                aria-checked={isItemSelected}
                                                tabIndex={-1}
                                                key={row.id}
                                                selected={isItemSelected}
                                            >
                                                <TableCell padding="checkbox">
                                                    <Checkbox
                                                        color="primary"
                                                        checked={isItemSelected}
                                                        inputProps={{
                                                            'aria-labelledby': labelId,
                                                        }}
                                                    />
                                                </TableCell>
                                                <TableCell
                                                    component="th"
                                                    id={labelId}
                                                    scope="row"

                                                >
                                                    {row.name}
                                                </TableCell>
                                                <TableCell align="left">{row.category}</TableCell>
                                                <TableCell align="left">{row.description}</TableCell>
                                                <TableCell align="right" padding='none'>{row.costPrice}</TableCell>
                                                <TableCell align="right" padding='none'>{row.sellPrice}</TableCell>
                                                <TableCell align="right" padding='none'>{row.discount}</TableCell>
                                                <TableCell align="right" padding='none'>{row.discountSellPrice}</TableCell>
                                                <TableCell align="right" padding='none'>{row.finalPrice}</TableCell>
                                                <TableCell align="right">{row.expiryDate}</TableCell>
                                                <TableCell align="center"> <IconButton onClick={(e) => { e.stopPropagation(); navigate(`edit-product/${row.id}`) }}>
                                                    <EditIcon />
                                                </IconButton></TableCell>
                                            </TableRow>
                                        );
                                    })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </Box>
        </Container>
    );
}


export default Dashboard