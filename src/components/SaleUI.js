import { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SaleProductList from './SaleProductList';
import { AddProductSales, StartSale } from '../services/Pos';
import SalePaymentUI from './SalePaymentUI';
import SaleInvoice from './SaleInvoice';

export const SaleUI = ({ handle }) => {

    const inventory = useSelector(state => state.inventoryReducer.products);
    const total = useSelector(state => state.saleReducer.sale.total);

    const [saleItems, setSaleItems] = useState([]);
    const barcodeRef = useRef();

    const dispatch = useDispatch();

    const sale = useSelector(state => state.saleReducer.sale);

    const addProductToSale = (item) => {
        setSaleItems([...saleItems, item]);
        barcodeRef.current.value = "";
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
                alert(saleId);
                await AddProductSales(dispatch, saleId, saleItems);                
            } catch (err) {

            }
        }
    }

    return (
        <div className="pos-page">
            <div className="sale-ui">
                <div className="">
                    <form className="sale-ui-barcode-entry" onSubmit={scanBarcode}>
                        <label for="barcodeNumber"> Barcode: </label>
                        <input ref={barcodeRef} type="number" name="barcodeNumber" />
                    </form>
                </div>
                <div>
                    <SaleProductList products={saleItems} handleRemove={removeProductItems} />
                </div>
                <div className="">
                    <button className="btn btn-primary" onClick={processInvoice}>Process Sale</button>
                    { /*  <button className="btn btn-warning">Hold Sale</button>
                    <button className="btn btn-secondary">Cancel Sale</button> */}
                </div>
            </div>
            <div className="payment-ui">
                <SalePaymentUI total={total} />
            </div>
        </div>
    )

}

export default SaleUI