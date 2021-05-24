import { Form, Button, Row, Label, Col } from 'react-bootstrap';
import CurrencyFormInput from './CurrencyFormInput';
import NumericalFormInput from './NumericalFormInput';
import { useState } from 'react';


const PromotionForm = ({ promotion, handleSubmit }) => {
    const [promo, setPromo] = useState(promotion);
    // const setPromo = handleChange;

    const updatePromotion = ()=> {handleSubmit(promo)};

    const minDate = new Date().toISOString().slice(0, 10);

    return (
        <Form hasvalidation>
            <Form.Group as={Row}>
                <Form.Label column sm={4} >Promotion Name</Form.Label>
                <Col sm={8}>
                    <Form.Control type="text" value={promo.promotionName} onChange={event => setPromo({ ...promo, promotionName: event.target.value })} />
                </Col>
            </Form.Group>
            <NumericalFormInput
                label={"Quantity"}
                initialValue={promo.quantity}
                minVal = "1.00"
                handleOnChange={event => setPromo({ ...promo, quantity: parseInt(event.target.value) })}
            />       
            <CurrencyFormInput
                label={"Promotional Price"}
                initialValue={promo.promotionPrice}
                handleOnChange={event => setPromo({ ...promo, promotionPrice: parseFloat(event.target.value) })}
            />
            <Form.Group as={Row}>
                <Form.Label column sm={4}> Start Date </Form.Label>
                <Col sm={8}>
                    <input className="form-control" type="date"  min={minDate} value={promo.start} onChange={event =>                   
                        setPromo({ ...promo, start: event.target.value })} />
                </Col>
            </Form.Group>
            <Form.Group as={Row}>
                <Form.Label column sm={4}> End Date </Form.Label>
                <Col sm={8}>
                    <input className="form-control" type="date" min={minDate} value={promo.end} onChange={event =>
                         setPromo({ ...promo, end: event.target.value })} />
                </Col>
            </Form.Group>
            <Button type="button" onClick={updatePromotion}> Save </Button>
        </Form>
    )
}

export default PromotionForm