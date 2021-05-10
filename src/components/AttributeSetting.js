import { Form, Col, Row, Button, Modal, InputGroup } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AddColour, AddBrand, AddItemCategory, AddSize } from '../services/Inventory';
import { EditColour, EditBrand } from '../services/Inventory';
import AttributeSelector from './AttributeSelector';

const AttributeSetting = ({ attributeName, attributes }) => {

    const [show, setShow] = useState(false);
    const closeModal = () => setShow(false);
    const showModal = () => setShow(true);
    const [attribute, setAttribute] = useState({ id: 0, value: "" });
    const [newAttribute, setNewAttribute] = useState({value: "" });

    const dispatch = useDispatch();

    let addAttribute;
    let editAttribute;

    if (attributeName == "Brand") {
        addAttribute = AddBrand;
        editAttribute = EditBrand;
    } else if (attributeName == "Colour") {
        addAttribute = AddColour;
        editAttribute = EditColour;
    } else if (attributeName == "Category") {
        addAttribute = AddItemCategory;
    } else {
        addAttribute = AddSize;
    }

    console.log(addAttribute);

    const handleAdd = () => {
        addAttribute(dispatch, newAttribute);
    }

    const handleEdit = () => {
        editAttribute(dispatch, attribute);
    }

    var pompom;

    return (
        <div style={{ width: "100%", padding: "10px" }}>
            <Form>
                <Form.Row>
                    <Col sm={4}>
                        <AttributeSelector
                            attributeName={attributeName}
                            stateAttributes={attributes}
                            //       productAttribute = {null}
                            handleSelect={(event) => {
                                const attributeValue = event.target.options[event.target.selectedIndex].text;
                                const attributeId = parseInt(event.target.value);
                                setAttribute({ id: attributeId, value: attributeValue });
                                console.log(event.target.text);
                                pompom = event.target;
                            }

                            }
                        />
                    </Col>
                    <Col sm={4}>
                        <InputGroup>
                            <input type="text" value={attribute.value} disabled={show} onChange={event => setAttribute({ ...attribute, value: event.target.value })} />
                            <Button onClick={handleEdit} >Update</Button>
                        </InputGroup>
                    </Col>
                    <Col sm={4}>
                        <InputGroup>
                            <input type="text" value={newAttribute.value} disabled={show} onChange={event => setNewAttribute({value:event.target.value})} />
                            <Button onClick={handleAdd}>
                                {`Add ${attributeName}`}
                            </Button>
                        </InputGroup>
                    </Col>
                </Form.Row>
            </Form>
        </div>
    )
}

export default AttributeSetting