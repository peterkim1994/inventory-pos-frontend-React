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
    const defaultProduct = {
            manufactureCode: "",
            description: "",
            barcode: 0,
            brandId: 0,
            itemCategoryId: 0,
            colourId: 0,
            sizeId: 0,
            price: 0,
            qty: 0
    };  

    return <ProductForm product={defaultProduct} handleSubmit={updateProduct} />
}