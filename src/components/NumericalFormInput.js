import { Form, Col, Row } from 'react-bootstrap';


const NumericalFormInput = ({ label, initialValue, handleOnChange }) => {
    return (
        <Col>
            <Form.Group as={Row}>
                <Form.Label column sm={4}> {label} </Form.Label>
                <Col sm={8}>
                    <Form.Control                       
                        type="number"
                        min="0.00"
                        step="1"                
                        presicion={0}
                        onChange={event => handleOnChange(event)}
                        value={(initialValue)? initialValue:"0"}
                    />
                </Col>
            </Form.Group>
        </Col>
    );
}

export default NumericalFormInput