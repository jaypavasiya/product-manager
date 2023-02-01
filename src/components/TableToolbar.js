import { Box, IconButton, InputBase, Toolbar, Tooltip, Typography } from "@mui/material";
import { alpha } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';


const TableToolbar = (props) => {
    const { numSelected, selected, setSelected, handaleSearchChange, search } = props;
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const deleteData = () => {
        if (numSelected > 0) {
            dispatch({ type: "DELETE_PRODUCT", payload: selected });
            setSelected([])
        }
    }


    const submitSearch = () => {
        if (search !== '') {
            dispatch({ type: "SEARCH_PRODUCT", payload: search });
        }
    }
    return (
        <Toolbar
            sx={{
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },
                ...(numSelected > 0 && {
                    bgcolor: (theme) =>
                        alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                }),
            }}
        >

            {numSelected > 0 ? (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    color="inherit"
                    variant="subtitle1"
                    component="div"
                >
                    {numSelected} selected
                </Typography>
            ) : (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    variant="h6"
                    id="tableTitle"
                    component="div"
                >
                    Producat Data
                </Typography>
            )}
            <Box
                component="div"
                sx={{ border: '1px solid #efe7e7', borderRadius: 2, p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
            >
                <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    onChange={handaleSearchChange}
                    value={search}
                    placeholder="Search"
                    inputProps={{ 'aria-label': 'search' }}
                />
                <IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={() => submitSearch()}>
                    <SearchIcon />
                </IconButton>
            </Box>
            {numSelected > 0 ? (
                <Tooltip title="Delete Product">
                    <IconButton onClick={() => deleteData()}>
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            ) : <Tooltip title="Add Product">
                <IconButton onClick={() => navigate('add-product')}>
                    <AddIcon />
                </IconButton>
            </Tooltip>}
        </Toolbar>
    );
}

export default TableToolbar