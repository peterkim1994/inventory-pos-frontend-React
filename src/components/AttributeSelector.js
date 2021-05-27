import { Form, Col, Row } from 'react-bootstrap';


const AttributeSelector = ({ stateAttributes, attributeName, handleSelect, productAttribute }) => {
    const attributes = stateAttributes;

    const selectAttribute = (selectedValue) => {
        productAttribute = parseInt(selectedValue);
    }

    return (
        <Col>
            <Form.Group as={Row} required>
                <Form.Label column sm={4} > {attributeName} </Form.Label>
                <Col sm={8}>
                    <Form.Control as="select"
                        id={`${attributeName}-selector`}
                        onChange={handleSelect}
                        required
                        defaultValue={productAttribute}
                    >
                        <option key={0} > - </option>
                        {
                            attributes.map(a =>
                                <option
                                    key={a.id}
                                    value={a.id}
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