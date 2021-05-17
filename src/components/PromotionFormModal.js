import PromotionForm from './PromotionForm';
import { EditPromotion } from '../services/Promotions';
import { Modal, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useState } from 'react';


const PromotionFormModal = ({ promotion, label, handleSubmit }) => {

    const dispatch = useDispatch();
    const [show, setShow] = useState(false);
    const handleShow = () => {
        setShow(true);
    };

    const submit = (editedPromotion) => {
        handleSubmit(editedPromotion);
        setShow(false);
    }

    const closeModal =()=>{       
        setShow(false);
    }

    return (
        <div class="promotion-modal">
            <Button type="button" onClick={handleShow}> {label} </Button>
            <Modal show={show} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{promotion.promotionName}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <PromotionForm promotion={promotion} handleSubmit={submit} />       
                    <Button >Delete </Button>         
                </Modal.Body>
                
            </Modal>
        </div>
    )
//    <Button variant="warning" onClick={closeModal}>Close</Button>
}

export default PromotionFormModal