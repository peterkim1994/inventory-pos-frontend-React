import { useSelector, useDispatch } from 'react-redux';
import { useState, useRef } from 'react';
import InventorySearchPanel from '../../Inventory/InventorySearchPanel';
import InventoryTable from '../../Inventory/InventoryTable';
import {  RemoveProductPromotions, AddProductPromotions } from '../../../services/Promotions';
import { Modal, Button } from 'react-bootstrap';

const PromotionProductsModal = ({ promotion, handleClose }) => {
    
    const dispatch = useDispatch();
    const products = useSelector(state => state.inventoryReducer.products);
    const promosCurrentProducts = useSelector(state => state.promotionsReducer.promotionProducts);
    const [diplayedProducts, setDisplayedProducts] = useState(promosCurrentProducts); //products checked/selected
    const [btnLabel, setBtnLabel] = useState("Add products from Inventory");
    const [searchVisible, setSearchVisible] = useState(false);
    const [editedPromotion, setPromotion] = useState(promotion);
    const [show, setShow] = useState(true);

    const prevPromoItems = useRef(promotion.productIds);

    const removeProductPromos = () => {
        const removedList = prevPromoItems.current.filter((prod) => {
            return !editedPromotion.productIds.includes(prod);
        });
        if (removedList.length > 0)
            RemoveProductPromotions(dispatch, editedPromotion, removedList);
    }

    const addProductPromos = () => {
        const addedList = editedPromotion.productIds.filter((prod) => {
            return !prevPromoItems.current.includes(prod);
        });
        if (addedList.length > 0) {
            AddProductPromotions(dispatch, editedPromotion, addedList);
            console.log("added list");
            console.log(addedList);
        }
    }

    //function filters out products already included in promotion
    const showOtherProducts = (inventory) => {
        const otherProducts = inventory.filter((product) => {
            return !editedPromotion.productIds.includes(product.id);
        })
        setDisplayedProducts(otherProducts);
    }
  

    const toggleProductView = () => {
        if (btnLabel === "Add products from Inventory") {
            setBtnLabel("Finish Adding");
            //Not ideal but oh well
            addProductPromos();
            removeProductPromos();
            showOtherProducts(products);
            setSearchVisible(true);
        } else {
            setBtnLabel("Add products from Inventory");
            setDisplayedProducts(promosCurrentProducts);
            setSearchVisible(false);
        }
    }

    const closeModal = () => {
        setShow(false);
        handleClose();
    }

    const handleSubmit = () => {        
        closeModal();
    }

    const handleSelect = (event) => {
        const product = event;
        const selectedItemId = product.id;
        if (editedPromotion.productIds.includes(selectedItemId) === false) { // product is added to promotion if its not already inlcuded in it
            setPromotion({ ...editedPromotion, productIds: [...editedPromotion.productIds, selectedItemId] });
        } else {
            let updatedPromoProducts = editedPromotion.productIds.filter((productId) => productId !== selectedItemId);
            setPromotion({ ...editedPromotion, productIds: updatedPromoProducts });
        }
    }

    const renderBtnLabel = (id) => {
        if (editedPromotion.productIds.includes(id)) {
            return (searchVisible) ? "Undo" : "Remove";
        } else {
            return (searchVisible) ? "Add" : "Undo";
        }
    }
 
    const inventorySearchPanel = <div style={{width:"90%", position:"relative", right:"20px"}}><InventorySearchPanel setResults={showOtherProducts} /></div>;
    const selectBtn = (value) => { return (<Button type="button" value={value.id} onClick={() => handleSelect(value)} >{renderBtnLabel(value.id)} </Button>) };

    return (
        <div className="promotional-inventory-modals ">
            <Modal show={show} size="xl" dialogClassName="promotional-inventory-modal">
                <Modal.Header >
                    <div className="blockOrder">                
                        <Modal.Title>{promotion.promotionName}</Modal.Title>
                        {searchVisible && inventorySearchPanel}
                        <Button onClick={toggleProductView}>{btnLabel}</Button>
                    </div>
                </Modal.Header>
                <Modal.Body style={{ maxHeight: "600px", overflow: "scroll" , margin:"auto"}} >
                    <InventoryTable products={diplayedProducts} selectEnabled={true} handleSelect={handleSelect} actionBtn={selectBtn} />
                </Modal.Body>
                <Modal.Footer style={{ width: "auto", margin: "auto", height: "fit-content" }}>
                    <Button variant="secondary" onClick={closeModal}> Close </Button>
                    <Button variant="warning" onClick={handleSubmit}> Save </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default PromotionProductsModal