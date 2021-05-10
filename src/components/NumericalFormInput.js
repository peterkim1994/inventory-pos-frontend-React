import { Form, Col, Row} from 'react-bootstrap';


const NumericalFormInput = ({label, handleOnChange}) =>{
    return(
        <Col>
            <Form.Group as={Row}>
                <Form.Label column sm={4}> {label} </Form.Label>
                <Col sm={8}>
                    <Form.Control type="number" onChange={event=> handleOnChange(event)} />
                </Col>
            </Form.Group>
        </Col>
    );
}

export default NumericalFormInput
/*

    return(
        <Col>
            <Form.Group as={Row}>
                <Form.Label column sm={4}> Price </Form.Label>
                <Col sm={8}>
                    <Form.Control type="number" onChange={(event)=> price = (parseInt(event.target.value))} />
                </Col>
            </Form.Group>
        </Col>
    );

*/