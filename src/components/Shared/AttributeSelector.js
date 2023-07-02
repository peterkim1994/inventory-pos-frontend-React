import { Form, Col, Row } from 'react-bootstrap';

const AttributeSelector = ({ stateAttributes, attributeName, handleSelect, productAttribute }) => {
    const attributes = stateAttributes;

    const selectAttribute = (selectedValue) => {
        productAttribute = parseInt(selectedValue);
    }

    return (
        <Col>
            <Form.Group as={Row} required>
                <Form.Label column sm={4} > <b>{attributeName} </b></Form.Label>
                <Col sm={8} style={{width:"100%"}}>
                    <Form.Control as="select"
                        id={`${attributeName}-selector`}
                        onChange={handleSelect}
                        required
                        defaultValue={productAttribute}
                        style={{width:"100%"}}
                    >
                     <option key={0} value={-1}> - </option>
                        {
                            attributes.map(a =>
                                <option key={a.id} value={a.id}>
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