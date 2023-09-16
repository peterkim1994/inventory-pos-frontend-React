import { Form, Col, Row } from 'react-bootstrap';
import { ProductAttribute } from '../../types/product/productAttribute'
import { FC } from 'react';
import { AttributeSelectionProps } from '../../types/product/attributeSelectionProps';
import * as React from 'react';

const AttributeSelector : FC<AttributeSelectionProps> = ({ attributes = [], attributeCategory, selectEventHandler, initialAttributeValueId }) => {

    const availableAttributes : ProductAttribute[] = attributes;
    
    return (
        <Col>
            <Form.Group as={Row} required>
                <Form.Label column sm={4}> 
                    <b>{attributeCategory}</b>                
                </Form.Label>
                <Col sm={8} style={{width:"100%"}}>
                    <Form.Control as="select"
                        name={attributeCategory}
                        id={`${attributeCategory}-selector`}
                        onChange={selectEventHandler}
                        required
                        defaultValue={initialAttributeValueId}
                        style={{width:"100%"}}
                    >
                     <option key={0}> - </option>
                        {
                            availableAttributes.map(a =>
                                <option key={a.id} value={a.id} id={a.value}>
                                    {a.value}
                                </option>
                            )
                        }
                    </Form.Control>
                </Col>
            </Form.Group>
        </Col>
    )
}

export default AttributeSelector