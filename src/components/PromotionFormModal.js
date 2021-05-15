import PromotionForm from './PromotionForm';
import { EditPromotion } from '../services/Promotions';
import { Modal, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useState } from 'react';


const PromotionFormModal = ({ promotion, handleClose }) => {

    const dispatch = useDispatch();
    const [show, setShow] = useState(false);
    const handleShow = () => {
        setShow(true);
    };
 
    const editPromotion = (editedPromotion) => {
        EditPromotion(dispatch, editedPromotion);
        setShow(false);
    }


    return (
        <div>
        <Button type="button" onClick={handleShow}> Edits </Button>
            <Modal show={show}>
            <Modal.Header>
            <Modal.Title>{promotion.promotionName}</Modal.Title>
            </Modal.Header>
                <Modal.Body>
                <PromotionForm promotion={promotion} handleSubmit={editPromotion} />
                <Button onClick={handleClose}>Close</Button>
                </Modal.Body>
            </Modal>
        </div>
    )

}

export default PromotionFormModal