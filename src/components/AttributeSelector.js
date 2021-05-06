import { Form, Col, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import {useEffect, useState} from 'react';

const AttributeSelector = ({stateAttributes, attributeName, handleOnChange}) => {
   
    const [attributes, setAttibutes] = useState(stateAttributes);       
    console.log(attributeName);
    console.log(attributes);
    useEffect(()=> {
        setAttibutes(stateAttributes);
    },[stateAttributes])
    
    return (
        <Col>
            <Form.Group as={Row} controlId="exampleForm.ControlSelect1">
                <Form.Label column sm={4} > {attributeName} </Form.Label>
                <Col sm={8}>
                    <Form.Control as="select"
                        onChange = {event => handleOnChange(event)} 
                        defaultValue={attributes[1] && attributes[1].id}
                    //    defaultvalue={"1"}
                     >
                    <option key={0} value={1}> - </option>
                    {                        
                        attributes.map(n =>
                            <option key={n.id} value={n.id}>{n.value}</option>
                        )
                    }
                    </Form.Control> 
                </Col>
            </Form.Group>
        </Col>
    )
}

export default AttributeSelector