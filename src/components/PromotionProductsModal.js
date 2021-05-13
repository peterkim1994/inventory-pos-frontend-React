import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import InventorySearchPanel from './InventorySearchPanel';
import InventoryTable from './InventoryTable';
import PromotionForm from './PromotionForm';
import { EditPromotion } from '../services/Promotions';
import { Modal, Button } from 'react-bootstrap';

const PromotionProductsModal = ({ promotion, handleClose }) => {

    const products = useSelector(state => state.inventoryReducer.products);
    const [relevantProducts, setRelevantProducts] = useState(products);//initial state set to all products
    const [selectedProducts, setSelectedProducts] = useState([]); //products checked/selected

    const [promo, setPromotion] = useState(promotion);
    const [show, setShow] = useState(true);

    const closeModal = () => {
        setShow(false);
        handleClose();
    }

    //  alert("promo modal has mounted " +promotion.id);

    const dispatch = useDispatch();

    const AddNewPromotion = (promo) => {
        EditPromotion(dispatch, promo);
    }

    const handleSelect = (event) => {
        const selectedItemId = parseInt(event.target.value);
        if (event.target.checked) {
            const selectedProductId = selectedItemId;
            setPromotion({ ...promotion, products: [...promotion.products, selectedProductId] });
        } else {
            let editedPromoProducts = selectedProducts.filter((item) => item.id !== selectedItemId);
            setPromotion({ ...promotion, products: editedPromoProducts });
        }
    }

    return (
        <div className="promotional-inventory-modal">
            <Modal show={show} size="lg"  dialogClassName="promotional-inventory-modal">
                <Modal.Header >
                    <Modal.Title>{promotion.promotionName}</Modal.Title>     
                    <InventorySearchPanel setResults={setRelevantProducts} />               
                </Modal.Header>
                <Modal.Body style={{maxHeight:"460px", overflow:"scroll"}} >                         
                    <InventoryTable products={relevantProducts} selectEnabled={true} handleSelect={handleSelect} />             
                </Modal.Body>
                <Modal.Footer style={{width:"auto", margin:"auto" }}>
                    <Button variant="secondary" onClick={handleClose}> Close </Button>
                    <Button variant="warning" onClick={handleClose}> Save </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
//      

export default PromotionProductsModal