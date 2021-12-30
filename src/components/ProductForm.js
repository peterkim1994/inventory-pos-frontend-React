import { Form, Button, Row, Col } from "react-bootstrap";
import React, { useState, useRef } from "react";

import { useSelector } from 'react-redux';
import AttributeSelector from './AttributeSelector';
import NumericalFormInput from './NumericalFormInput';
import CurrencyFormInput from './CurrencyFormInput';

export const ProductForm = ({ product, handleClose, handleSubmit }) => {
    const brands = useSelector(state => state.inventoryReducer.brands);
    const colours = useSelector(state => state.inventoryReducer.colours);
    const sizes = useSelector(state => state.inventoryReducer.sizes);
    const categories = useSelector(state => state.inventoryReducer.categories);

    const [validated, setValidated] = useState(false);

    const inputValidationResponse = useRef();

    const [updatedProduct, updateProduct] = useState(product);

    const submitForm = (event) => {
        //const form = event.currentTarget;
        event.preventDefault();
        if (!updatedProduct.itemCategoryId  ||
            !updatedProduct.brandId ||
            !updatedProduct.colourId||
            !updatedProduct.sizeId
        ) {
            inputValidationResponse.current.innerHTML = "You must make a selection for all product options";
        } else {
            handleSubmit(updatedProduct);
        }
    }

    return (
        <Form onSubmit={submitForm} >
            <Form.Group as={Row} controlId="manufacture">
                <Form.Label column sm={4} >Manufacturer Code </Form.Label>
                <Col sm={8}>
                    <Form.Control
                        type="text"                      
                        value={updatedProduct.manufactureCode === null ? "" : updatedProduct.manufactureCode}
                        onChange={(event) => updateProduct({ ...updatedProduct, manufactureCode: event.target.value })}
                    />
                </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="exampleForm.ControlTextarea1">
                <Form.Label column sm={4}> Description</Form.Label>
                <Col sm={8}>
                    <Form.Control
                        as="textarea"
                        required
                        rows={2}
                        value={updatedProduct && updatedProduct.description === null ? "" : updatedProduct.description}
                        onChange={event => updateProduct({ ...updatedProduct, description: event.target.value })}
                    />
                </Col>
            </Form.Group>
            <Form.Group as={Row} >
                <Form.Label column sm={4} >Barcode Number</Form.Label>
                <Col sm={8}>
                    <Form.Control
                        type="number"                        
                        onChange={(event) => updateProduct({ ...updatedProduct, barcode: parseInt(event.target.value) })}
                        value={updatedProduct.barcode === null ? "" : updatedProduct.barcode}
                    />
                </Col>
            </Form.Group>
            <Form.Row>
                <AttributeSelector
                    stateAttributes={brands}
                    attributeName="Brand"
                    productAttribute={product.brandId}
                    handleSelect={
                        event => updateProduct({ ...updatedProduct, brandId: parseInt(event.target.value) })
                    }
                />
                <AttributeSelector
                    stateAttributes={categories}
                    attributeName="Category"
                    productAttribute={product.itemCategoryId}
                    handleSelect={event =>
                        updateProduct({ ...updatedProduct, itemCategoryId: parseInt(event.target.value) })
                    }
                />
            </Form.Row>
            <Form.Row>
                <AttributeSelector
                    stateAttributes={colours}
                    attributeName="Colour"
                    productAttribute={product.colourId}
                    handleSelect={
                        event => updateProduct({ ...updatedProduct, colourId: parseInt(event.target.value) })
                    }
                />
                <AttributeSelector
                    stateAttributes={sizes}
                    attributeName="Size"
                    productAttribute={product.sizeId}
                    handleSelect={
                        event => updateProduct({ ...updatedProduct, sizeId: parseInt(event.target.value) })
                    }
                />
            </Form.Row>
            <Form.Row>
                <CurrencyFormInput label="Price" initialValue={updatedProduct.price} handleOnChange={(event) => updateProduct({ ...updatedProduct, price: (parseFloat(event.target.value)) })} />
                <NumericalFormInput label="Quantity" initialValue={updatedProduct.qty} handleOnChange={(event) => updateProduct({ ...updatedProduct, qty: parseInt(event.target.value) })} />
            </Form.Row>
            <div className="form-buttons-container">
                <Button variant="primary" className="product-form-button"
                    type="button" onClick={submitForm}> Save </Button>
                {product.id && <Button variant="warning" className="product-form-button" onClick={handleClose}> close </Button>}
                <p ref={inputValidationResponse} className="error-message" id="addProductApiResponse">{}</p>
            </div>
        </Form>
    );
}

export default ProductForm