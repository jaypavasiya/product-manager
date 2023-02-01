import React, { lazy } from 'react'
import { Route, Routes } from 'react-router-dom'

const Dashboard = lazy(() => import('./pages/Dashboard'));
const ProductForm = lazy(() => import('./pages/ProductForm'));

const Router = () => {
    return (
        <Routes>
            <Route path={`/`} element={<Dashboard />} />
            <Route path={`/add-product`} element={<ProductForm />} />
            <Route path={`/edit-product/:id`} element={<ProductForm />} />
        </Routes>
    )
}

export default Router