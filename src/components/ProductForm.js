import { Form, Modal, Button, FormControl, Row, Col } from "react-bootstrap";
import React, { useEffect,useState } from "react";
import { useDispatch } from "react-redux";
import {  useSelector } from 'react-redux';
import AttributeSelector from './AttributeSelector';
import NumericalFormInput from './NumericalFormInput';
import { GetProductAttributes } from '../services/Inventory';


export const ProductForm = ({ product, handleClose, handleSubmit }) => {    
    // const dispatch = useDispatch();

    // useEffect(()=>{
    //     GetProductAttributes(dispatch);
    // },[]);

    const brands = useSelector(state => state.inventoryReducer.brands);
    const colours = useSelector(state => state.inventoryReducer.colours);
    const sizes = useSelector(state => state.inventoryReducer.sizes);
    const categories = useSelector(state => state.inventoryReducer.categories);
    console.log("product form product: ");
    console.log(product);
 
    if (product === null) {
        product = {
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
    }

    const [newProduct,setNewProduct] = useState(product);

    return (       
        <Form >
            <Form.Group as={Row} controlId="manufacture">
                <Form.Label column sm={4} >Manufacturer Code </Form.Label>
                <Col sm={8}>
                    <Form.Control 
                        type="text"
                        value={newProduct.manufactureCode===null ?  "": newProduct.manufactureCode} 
                        onChange={(event) => setNewProduct({...newProduct, manufactureCode : event.target.value})}
                    />
                </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="exampleForm.ControlTextarea1">
                <Form.Label column sm={4}> Desciption</Form.Label>
                <Col sm={8}>
                    <Form.Control    
                        as="textarea" 
                        rows={2} 
                        value = {newProduct && newProduct.description===null ? "" : newProduct.description }
                        onChange={event => setNewProduct({...newProduct, description : event.target.value })}
                    />
                </Col>
            </Form.Group>
            <Form.Group as={Row} >
                <Form.Label column sm={4} >Barcode Number</Form.Label>
                <Col sm={8}>
                    <Form.Control
                        type="number" 
                        onChange={(event) => setNewProduct({...newProduct, barcode : parseInt(event.target.value)})}
                        value = { newProduct.barcode === null? "": newProduct.barcode }
                    />
                </Col>
            </Form.Group>
            <Form.Row>
                <AttributeSelector 
                    stateAttributes={brands} 
                    attributeName="Brand" 
                    productAttribute={product.brandId}
                    handleSelect={
                        event=> setNewProduct({...newProduct, brandId: parseInt(event.target.value)})
                    }   
                />
                <AttributeSelector 
                    stateAttributes={categories}
                    attributeName="Category" 
                    productAttribute={product.itemCategoryId}
                    handleSelect={event=>
                         setNewProduct({...newProduct, itemCategoryId: parseInt(event.target.value)})
                    } 
                  />
            </Form.Row>
            <Form.Row>
                <AttributeSelector 
                    stateAttributes={colours} 
                    attributeName="Colour"
                    productAttribute={product.colourId}
                    handleSelect={
                        event=>setNewProduct({...newProduct, colourId: parseInt(event.target.value)})
                    }
                 />
                <AttributeSelector 
                    stateAttributes={sizes} 
                    attributeName="Size" 
                    productAttribute={product.sizeId} 
                    handleSelect={
                        event=>setNewProduct({...newProduct, sizeId: parseInt(event.target.value)})
                    }
                />
            </Form.Row>
            <Form.Row>
                <NumericalFormInput label="Price" handleOnChange={(event) => setNewProduct({...newProduct, price : parseInt(event.target.value)})} />
                <NumericalFormInput label="Quantity" handleOnChange={(event) => setNewProduct({...newProduct, qty : parseInt(event.target.value)})} />
            </Form.Row>
            <div className = "form-buttons-container">
                <Button variant="primary" className="product-form-button" onClick={(event)=>{
                    event.preventDefault();
                    handleSubmit(newProduct);                    
                }}> Save </Button>   
                {product.id && <Button variant="warning" className="product-form-button" onClick={handleClose}> close </Button> }        
                <p className="error-message" id="addProductApiResponse"></p>
            </div>
        </Form>
    );
}

export default ProductForm