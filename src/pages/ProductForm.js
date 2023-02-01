import { Box, Button, Container, Grid, Paper, TextField, Typography } from '@mui/material'
import { TextareaAutosize } from '@mui/base';
import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

const isText = /^[a-zA-Z ]+$/i;
const isNumber = /^\d+$/;

const ProductForm = () => {

    const { id } = useParams()
    const variant = 'outlined'
    const margin = "normal";
    const catagaries = ['Industry', 'Functionality', 'Demographics', 'Performance', 'Customer Preferences', 'Customer Needs']
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        id: (Math.floor(Math.random() * Date.now())).toString(),
        name: '',
        category: '',
        description: '',
        expiryDate: new Date().toLocaleDateString('fr-CA'),
        costPrice: '',
        sellPrice: '',
        discount: '',
        discountSellPrice: '',
        finalPrice: ''

    })
    const productData = useSelector((state) => state.productData);

    useEffect(() => {
        if (window.location.pathname.includes('edit') && id) {
            const editData = productData.find(_ => _.id === id)
            if (editData) {
                setFormData(editData)
            }else{
                navigate('/')
            }
        }
        // eslint-disable-next-line
    }, [id, productData])


    const [formValidation, setFormValidation] = useState({
        name: '', category: '', description: '', expiryDate: new Date(), costPrice: '', sellPrice: '', discount: '',
    })

    const checkFormValidation = (e) => {
        const { name, value, required } = e.target
        let error = ''
        let validate = { name: 'text', category: 'select', costPrice: 'number', sellPrice: 'number', discount: 'number' }
        if (required && !value) return error = "This field is required"
        if (required && value) {
            switch (validate[name]) {
                case "text":
                    if (value && !isText.test(value))
                        error = "This field accepts text only.";
                    break;

                case "number":
                    if (value && !isNumber.test(value))
                        error = "This field accepts numbers only.";
                    break;
                case "select":
                    if (!value) error = "Please select a value.";
                    break;
                default:
                    break;
            }
            return error
        }
    }
    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value
        })
        setFormValidation({
            ...formValidation,
            [name]: checkFormValidation(e)
        })
    }

    useEffect(() => {
        if (formData.costPrice && formData.sellPrice) {
            let DiscountedSellPrice = formData.sellPrice - (formData.sellPrice * formData.discount / 100)
            let finalPrice = +DiscountedSellPrice + +formData.costPrice
            setFormData({ ...formData, discountSellPrice: DiscountedSellPrice, finalPrice: finalPrice })
        }

        return () => {

        }
        // eslint-disable-next-line
    }, [formData.costPrice, formData.sellPrice, formData.discount])


    const handleSubmit = () => {
        if (window.location.pathname.includes('edit') && id) {
            dispatch({ type: "EDIT_PRODUCT", payload: formData });
        } else {

            dispatch({ type: "ADD_PRODUCT", payload: formData });
        }
        navigate('/')
    }

    const isError = useCallback(() => {
        const { name, category, description, costPrice, sellPrice, discount } = formData;
        const fields = { name, category, description, costPrice, sellPrice, discount };
        return Object.keys(fields).some(name => formData[name] === '' || formValidation[name] !== '');
    }, [formData, formValidation])
    return (
        <Container>

            <Box sx={{ maxWidth: 600, width: '100%', margin: '0 auto 0 auto', }}>

                <Paper sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                    <Typography
                        sx={{ flex: '1 1 100%' }}
                        variant="h6"
                        id="tableTitle"
                        component="div"
                    >
                        {window.location.pathname.includes('add') ? `Add Producat` : 'Edit Product'}
                    </Typography>
                    <Grid item xs={12} >
                        <TextField
                            variant={variant}
                            margin={margin}
                            fullWidth
                            label="Name"
                            name="name"
                            placeholder="Product Name"
                            value={formData.name}
                            onChange={handleChange}
                            error={!!formValidation.name}
                            helperText={formValidation.name}
                            required={true}
                        />
                    </Grid>
                    <Grid item xs={12} >
                        <TextField
                            variant={variant}
                            margin={margin}
                            fullWidth
                            select
                            label="Category"
                            name="category"
                            SelectProps={{
                                native: true
                            }}
                            value={formData.category}
                            onChange={handleChange}
                            error={!!formValidation?.category}
                            helperText={formValidation?.category}
                            required={true}
                        >
                            <option value=""> </option>
                            {catagaries.map((item, i) => (<option key={i} value={item}>{item}</option>))}
                        </TextField>
                    </Grid>
                    <Grid item xs={12} >
                        <TextareaAutosize
                            maxRows={10}
                            minRows={4}
                            aria-label="Description"
                            placeholder="Product Description"
                            value={formData.description}
                            name='description'
                            onChange={handleChange}
                            helperText={formValidation?.description}
                            className='textaria'
                            required={true}
                            style={!!formValidation?.description ? { borderColor: '#d32f2f', marginBottom: 0 } : {}}
                        />
                        {!!formValidation?.description && <Typography
                            className='textaria-validation'
                            variant="span"
                            id="tableTitle"
                            component="div"
                        >
                            {formValidation?.description}
                        </Typography>}
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant={variant}
                            margin={margin}
                            fullWidth
                            InputLabelProps={{
                                shrink: true
                            }}
                            label="Expiry Date"
                            name="expiryDate"
                            type="date"
                            defaultValue={formData.expiryDate}
                            onChange={handleChange}
                            required={true}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant={variant}
                            margin={margin}
                            fullWidth
                            label="Cost Price"
                            name="costPrice"
                            placeholder="Cost Price"
                            value={formData.costPrice}
                            onChange={handleChange}
                            error={!!formValidation?.costPrice}
                            helperText={formValidation?.costPrice}
                            required={true}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant={variant}
                            margin={margin}
                            fullWidth
                            label="Sell Price"
                            name="sellPrice"
                            placeholder="Sell Price"
                            value={formData.sellPrice}
                            onChange={handleChange}
                            error={!!formValidation?.sellPrice}
                            helperText={formValidation?.sellPrice}
                            required={true}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant={variant}
                            margin={margin}
                            fullWidth
                            label="Discount(%)"
                            name="discount"
                            placeholder="Discount(%)"
                            value={formData.discount}
                            onChange={handleChange}
                            error={!!formValidation?.discount}
                            helperText={formValidation?.discount}
                            required={true}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant={variant}
                            margin={margin}
                            fullWidth
                            label="Discount Sell Price"
                            name="discountSellPrice"
                            placeholder="Discount Sell Price"
                            disabled
                            value={formData.discountSellPrice}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant={variant}
                            margin={margin}
                            fullWidth
                            label="Final Price"
                            name="finalPrice"
                            placeholder="Final Price"
                            disabled
                            value={formData.finalPrice}
                        />
                    </Grid>
                    <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                        <Button
                            variant="contained"
                            sx={{ mt: 3, ml: 1 }}
                            disabled={isError()}
                            color="primary"
                            onClick={!isError() ? handleSubmit : () => null}
                        >
                            Next
                        </Button>
                    </Box>
                </Paper>
            </Box>
        </Container>
    )
}

export default ProductForm