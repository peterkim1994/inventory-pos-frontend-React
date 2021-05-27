import { useDispatch } from 'react-redux';
import { AddProduct } from '../services/Inventory';

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