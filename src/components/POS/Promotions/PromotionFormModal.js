import PromotionForm from './PromotionForm';
import { DeletePromotion } from '../../../services/Promotions';
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

    const handleDelete = () => {
        let confirm = prompt("Are you sure you want to delete promotion: " + promotion.promotionName);
        if(confirm === "yes" || confirm === "Yes" ){
            DeletePromotion(dispatch,promotion);
            closeModal();
        }            
    }

    return (
        <div className="promotion-modal">
            <Button type="button" onClick={handleShow}> {label} </Button>
            <Modal show={show} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{promotion.promotionName}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <PromotionForm promotion={promotion} handleSubmit={submit} />       
                    <Button onClick={handleDelete} >Delete </Button>         
                </Modal.Body>                
            </Modal>
        </div>
    )
}

export default PromotionFormModal