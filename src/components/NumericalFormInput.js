import { Form, Col, Row, Input } from 'react-bootstrap';


const NumericalFormInput = ({ label, initialValue, handleOnChange, minVal }) => {
    return (
        <Col>
            <Form.Group as={Row} hasvalidation>
                <Form.Label column sm={4}> {label} </Form.Label>
                <Col sm={8}>
                    <input
                        type="number"
                        className="form-control" 
                        min={minVal ? minVal : 0.00}                        
                        step={1}
                        presicion={0}
                        onChange={event => handleOnChange(event)}
                        value={(initialValue) ? initialValue : "0"}
                    />

                </Col>
            </Form.Group>
        </Col>
    );
}

export default NumericalFormInput

                    // <Form.Control
                    //     type="number"
                    //     min={minVal ? minVal : "0.00"}
                    //     step="1"
                    //     presicion={0}
                    //     onChange={event => handleOnChange(event)}
                    //     value={(initialValue) ? initialValue : "0"}
                    // />