import { Form, Col, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import {useEffect, useState} from 'react';

const AttributeSelector = ({stateAttributes, attributeName, handleSelect, productAttribute}) => {
    const attributes = stateAttributes;
    console.log(attributeName);
    console.log(productAttribute);

    console.log(stateAttributes);
    const selectAttribute =(selectedValue)=>{
        productAttribute = parseInt(selectedValue);
    }

    return (
        <Col>
            <Form.Group as={Row}>
                <Form.Label column sm={4} > {attributeName} </Form.Label>
                <Col sm={8}>
                    <Form.Control as="select"
                        id={`${attributeName}-selector`}
                        onChange = {handleSelect}
                //        onChange = {event => selectAttribute(event)} 
                   //         defaultvalue={productAttribute != 0 ? productAttribute: 0}
                    //    defaultvalue={"1"}
                     >
                    <option key={0} value={1} selected={true}> - </option>
                    {                        
                        attributes.map(a =>
                            <option 
                                key={a.id} 
                                value={a.id} 
                                selected={(a.id == productAttribute)? true : false }
                            >   
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