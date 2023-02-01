import { Box, Checkbox, TableCell, TableHead, TableRow, TableSortLabel } from "@mui/material";
import { visuallyHidden } from "@mui/utils";


const headCells = [
    {
        id: 'name',
        numeric: false,
        disablePadding: false,
        label: 'name',
    },
    {
        id: 'category',
        numeric: false,
        disablePadding: false,
        label: 'category',
    },
    {
        id: 'description',
        numeric: false,
        disablePadding: false,
        label: 'Description',
    },
    {
        id: 'costPrice',
        numeric: true,
        disablePadding: true,
        label: 'Cost Price',
    },
    {
        id: 'sellPrice',
        numeric: true,
        disablePadding: true,
        label: 'Sell Price',
    },
    {
        id: 'discount',
        numeric: true,
        disablePadding: true,
        label: 'Discount',
    },
    {
        id: 'discountSellPrice',
        numeric: true,
        disablePadding: true,
        label: 'Discount Sell Price',
    },
    {
        id: 'finalPrice',
        numeric: true,
        disablePadding: true,
        label: 'Final Price',
    },
    {
        id: 'expiryDate',
        numeric: true,
        disablePadding: false,
        label: 'Expiry Date',
    },
    {
        id: 'Edit',
        numeric: false,
        disablePadding: false,
        label: 'action',
    },
];


const TableHeader = (props) => {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
        props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };



    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        color="primary"
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{
                            'aria-label': 'select all desserts',
                        }}
                    />
                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false} 
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

export default TableHeader