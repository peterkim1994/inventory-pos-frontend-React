import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import InventorySearchPanel from './InventorySearchPanel';
import InventoryTable from './InventoryTable';
import { GetPromotionsProducts } from '../services/Promotions';
import { Modal, Button } from 'react-bootstrap';

const PromotionProductsModal = ({ promotion, handleClose }) => {
    const dispatch = useDispatch();
    const products = useSelector(state => state.inventoryReducer.products);
    const [allProducts, setAllProducts] = useState(products);//initial state set to all products
    const promosCurrentProducts = useSelector(state => state.promotionsReducer.promotionProducts);
    const [promotionsProducts, setPromotionsProductions] = useState(promosCurrentProducts); //products checked/selected

    console.log(promosCurrentProducts);

    useEffect(() => {
        GetPromotionsProducts(dispatch, promotion);
    }, []);

    //alert(promotion.id);
    console.log("promo producs");
    console.log(promotionsProducts);

    const [editedPromotion, setPromotion] = useState(promotion);
    const [show, setShow] = useState(true);

    const closeModal = () => {
        handleClose();
    }

    const HandleSubmit = (promo) => {

    }

    const handleSelect = (event) => {
        const selectedItemId = parseInt(event.target.value);
        if (event.target.checked) {
            if (!editedPromotion.products.includes(selectedItemId))
                setPromotion({ ...editedPromotion, products: [...editedPromotion.products, selectedItemId] });
        } else {
            let editedPromoProducts = promotionsProducts.filter((item) => item.id !== selectedItemId);
            setPromotion({ ...editedPromotion, products: editedPromoProducts });
        }
    }

    return (
        <div className="promotional-inventory-modals ">
            <Modal show={true} size="lg" dialogClassName="promotional-inventory-modal">
                <Modal.Header >
                    <Modal.Title>{promotion.promotionName}</Modal.Title>
                    <InventorySearchPanel setResults={setAllProducts} />
                </Modal.Header>
                <Modal.Body style={{ maxHeight: "460px", overflow: "scroll" }} >             
                    <InventoryTable products={promotionsProducts} selectEnabled={true} handleSelect={handleSelect} />
                </Modal.Body>
                <Modal.Footer style={{ width: "auto", margin: "auto", height: "fit-content" }}>
                    <Button variant="secondary" onClick={handleClose}> Close </Button>
                    <Button variant="warning" onClick={handleClose}> Save </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}


export default PromotionProductsModal

