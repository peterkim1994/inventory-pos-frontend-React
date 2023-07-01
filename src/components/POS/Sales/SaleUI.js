import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SaleProductList from './SaleProductList';
import { AddProductSales, StartSale, ClearSale, CancelSale } from '../services/Pos';
import SalePaymentUI from './SalePaymentUI';
import SaleInvoice from './Printables/SaleInvoice';

export const SaleUI = () => {

    const inventory = useSelector(state => state.inventoryReducer.products);
    const sale = useSelector(state => state.saleReducer.sale);
    const business = useSelector(state => state.saleReducer.bussinessDetails);
    const [removeSetting, setRemoveSetting] = useState(false);
    const [saleItems, setSaleItems] = useState([]);
    const barcodeRef = useRef();
    const dispatch = useDispatch();
    let currentSaleId;

    const [cancelBtn,disableCancelBtn] = useState(false);

    //cancel btn enabled when items are in sale
    useEffect(()=>{
        if(sale.products.length > 0 && !sale.finalised){
            disableCancelBtn(false);            
        }else{
            disableCancelBtn(true);
        }
    },[sale])

    const addProductToSale = (item) => {
        setSaleItems([...saleItems, item]);
        barcodeRef.current.value = "";
    }

    const clearSale = () => {
        ClearSale(dispatch)
        setSaleItems([]);
        disableRemoveBtns(false);
    }

    const cancelCurrentSale = () =>{
        console.log(`current sale id is ${currentSaleId} and ${sale.id}`);
        CancelSale(dispatch, sale);        
        setSaleItems([]);
        disableRemoveBtns(false);
    }

    const disableRemoveBtns = (setting) => {        
        setRemoveSetting(setting);
    }

    const removeProductItems = (item) => {
        let removed = false;
        const updatedSaleItems = saleItems.filter(pr => {
            if (pr.id === item.id && removed === false) {
                removed = true;
                return false;
            } else {
                return true;
            }
        });
        setSaleItems(updatedSaleItems);
    }
    
    //Optimise product retrieval via barcode later:
    //Should probably use a sorted list for finding the product with the associated barcode
    const scanBarcode = (event) => {
        event.preventDefault();
        const barcode = parseInt(barcodeRef.current.value);
        const product = inventory.find(pr => pr.barcode === barcode);
        if (product === undefined) {
            alert("that barcode doesnt match any corrosponding product " + barcode);
        } else {
            addProductToSale(product);
        }
    }

    const processInvoice = async () => {
        if (saleItems.length > 0) {
            try {
                const saleId = await StartSale(dispatch);
                console.log(`started new sale id: ${saleId}`);
                currentSaleId = saleId;
                await AddProductSales(dispatch, saleId, saleItems);
                disableRemoveBtns(true);
            } catch (err) {
                alert("weird err");
            }
        } else {
            alert("There are no products in this sale");
        }
    }

    const processSaleBtn = () => {
        return (
            <button className="btn btn-primary" onClick={processInvoice}>Process Sale</button>
        );
    }

    return (
        <div>        
            <div className="pos-page">
                <div className="sale-ui">
                    <div className="barcode-search">
                        <form className="sale-ui-barcode-entry" onSubmit={scanBarcode}>
                            <label for="barcodeNumber"> Barcode: </label>
                            <input ref={barcodeRef} type="number" name="barcodeNumber" disabled={removeSetting}/>
                        </form>
                    </div>
                    <div>
                        <SaleProductList products={saleItems} handleRemove={removeProductItems} removeBtnSetting={removeSetting} />
                    </div>
                </div>
                <div className="payment-ui blockOrder">
                    <SalePaymentUI sale={sale} processSaleComponent={processSaleBtn} clearSale={clearSale} />
                    <button className="btn btn-warning" 
                        id="cancel-sale-btn"
                        onClick={cancelCurrentSale}
                        hidden={cancelBtn}
                    > Cancel Sale </button>
                </div>
                <div className="printable" id="printed-receipt">
                    <img id="receipt-logo" src="../procamp_sign.png"/>
                    <SaleInvoice sale={sale} business={business} />
                </div>
            </div>
        </div>
    );
}
export default SaleUI