import { useEffect, useState } from 'react';
import { Form, Button, Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { GetProductAttributes, AddProduct } from '../services/Inventory';
import AttributeSelector from './AttributeSelector';
import CurrencyFormInput from './CurrencyFormInput';
import ProductForm from './ProductForm';

export const NewProduct = () => { 

    const dispatch = useDispatch();

    const updateProduct = (product) => {
        AddProduct(dispatch, product);
    }

    return <ProductForm product={null} handleSubmit={updateProduct} />
}