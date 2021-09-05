import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SaleProductList from './SaleProductList';
import { AddProductSales, StartSale, ClearSale } from '../services/Pos';
import SalePaymentUI from './SalePaymentUI';
import SaleInvoice from './SaleInvoice';

export const SaleUI = () => {

    const inventory = useSelector(state => state.inventoryReducer.products);
    const sale = useSelector(state => state.saleReducer.sale);
    const business = useSelector(state => state.saleReducer.bussinessDetails);
    const [removeSetting, setRemoveSetting] = useState(false);
    const [saleItems, setSaleItems] = useState([]);
    const barcodeRef = useRef();
    const dispatch = useDispatch();

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
        setSaleItems([]);
        ClearSale(dispatch);
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
                await AddProductSales(dispatch, saleId, saleItems);
                disableRemoveBtns(true);
            } catch (err) {

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
                <div className="payment-ui">
                    <SalePaymentUI sale={sale} processSaleComponent={processSaleBtn} clearSale={clearSale} />
                    <button className="btn btn-warning" 
                    id="cancel-sale-btn"
                    onClick={clearSale}
                    disabled={cancelBtn}
                    > Cancel Sale </button>
                </div>
                <div className="printable" id="printed-receipt">
                    <SaleInvoice sale={sale} business={business} />
                </div>
            </div>

        </div>
    );
}
// <iframe id="printed-receipt" style={{ height: "0px", width: "0px", position: "absolute" }}></iframe>
export default SaleUI