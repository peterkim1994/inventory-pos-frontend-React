import { useEffect, useState } from 'react';
import { Form, Button, Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { GetProductAttributes, AddProduct } from '../services/Inventory';
import AttributeSelector from './AttributeSelector';
import NumericalFormInput from './NumericalFormInput';
import ProductForm from './ProductForm';

export const NewProduct = () => { 

    const dispatch = useDispatch();
    
    const updateProduct = (product) => {
        AddProduct(dispatch, product);
    }

    return <ProductForm product={null} handleSubmit={updateProduct} />
}
//     const dispatch = useDispatch();
//     const brands = useSelector(state => state.inventoryReducer.brands);
//     const colours = useSelector(state => state.inventoryReducer.colours);
//     const sizes = useSelector(state => state.inventoryReducer.sizes);
//     const categories = useSelector(state => state.inventoryReducer.categories);
//     let manufactureCode = "";
//     let productDescription = "";
//     let productBarcode = 0;
//     let brand = 1;
//     let category = 1;
//     let colour = 1;
//     let size = 1;
//     let price = 1;
//     let qty = 1;

//     const addNewProduct = () => {
//         const product = {
//             manufacturerCode: manufactureCode,
//             description: productDescription,
//             barcode: productBarcode,
//             brandId: brand,
//             ItemCategoryId: category,
//             colourId: colour,
//             sizeId: size,
//             Price: price,
//             Qty: qty
//         }
//         console.log("new product");
//         console.log(product);
//         AddProduct(dispatch, product);
//     }

//     const selectBrand = (event) => {
//         console.log("brand selcted");
//         console.log(event.target.value);
//         const brandId = parseInt(event.target.value);
//         brand = brandId;
//     }
//     const selectSize = (event) => {
//         const sizeId = parseInt(event.target.value);
//         size = sizeId;
//     }

//     const selectCategory = (event) => {
//         const categoryId = parseInt(event.target.value);
//         category = categoryId;
//     }

//     const selectColour = (event) => {
//         const colourId = parseInt(event.target.value);
//         colour = colourId;
//     }

//     useEffect(() => {
//         GetProductAttributes(dispatch);
//     }, []);

//     return (
//         <Form >
//             <Form.Group as={Row} controlId="manufacture">
//                 <Form.Label column sm={4} >Manufacturer Code </Form.Label>
//                 <Col sm={8}>
//                     <Form.Control column type="text" onChange={(event) => manufactureCode = (event.target.value)} />
//                 </Col>
//             </Form.Group>
//             <Form.Group as={Row} controlId="exampleForm.ControlTextarea1">
//                 <Form.Label column sm={4}> Desciption</Form.Label>
//                 <Col sm={8}>
//                     <Form.Control as="textarea" rows={2} onChange={(event) => productDescription = (event.target.value)} />
//                 </Col>
//             </Form.Group>           
//             <Form.Group as={Row} controlId="exampleForm.ControlTextarea1">
//                 <Form.Label column sm={4} >Barcode Number</Form.Label>
//                 <Col sm={8}>
//                     <Form.Control type="number" onChange={(event) => productBarcode = (parseInt(event.target.value))} />
//                 </Col>                
//             </Form.Group>
//             <Form.Row>
//                 <AttributeSelector stateAttributes={brands} attributeName="Brand" handleOnChange={selectBrand} />
//                 <AttributeSelector stateAttributes={categories} attributeName="Category" handleOnChange={selectCategory} />
//             </Form.Row>
//             <Form.Row>
//                 <AttributeSelector stateAttributes={colours} attributeName="Colour" handleOnChange={selectColour} />
//                 <AttributeSelector stateAttributes={sizes} attributeName="Size" handleOnChange={selectSize} />
//             </Form.Row>
//             <Form.Row>
//                 <NumericalFormInput label="Price" handleOnChange={(event)=> price = parseInt(event.target.value)} />
//                 <NumericalFormInput label="Quantity" handleOnChange={(event) => qty = parseInt(event.target.value)} />
//             </Form.Row>
//             <Button variant="primary" onClick={addNewProduct}>Add New Product</Button>
//             <p className="error-message" id="addProductApiResponse"></p>
//         </Form>
//     );
// }