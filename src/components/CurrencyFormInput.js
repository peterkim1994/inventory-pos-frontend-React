import { Form, Col, Row } from 'react-bootstrap';


const CurrencyFormInput = ({ label, initialValue, handleOnChange }) => {
    return (
        <Col>
            <Form.Group as={Row}>
                <Form.Label column sm={4}> {label} </Form.Label>
                <Col sm={8}>
                    <Form.Control                       
                        type="number"
                        min="0.00"
                        step="0.001"
                        max="10000.00"
                        presicion={2}
                        onChange={event => handleOnChange(event)}
                        value={(initialValue)? initialValue:"0.00"}
                    />
                </Col>
            </Form.Group>
        </Col>
    );
}

export default CurrencyFormInput