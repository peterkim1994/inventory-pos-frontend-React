import SaleInvoice from "./SaleInvoice";
import { Modal, Button } from 'react-bootstrap';
import { useState } from 'react';
import { VoidProductSale } from "../services/Transactions";
const SaleInvoiceModal = ( {invoice} ) => {

    const [show, setShow] = useState(false);

    const handleShow = () => {
        setShow(true);
    };

    const closeModal = () => {
        setShow(false);
    }
    console.log("invoice");
    console.log(invoice);
    const voidProductSale = async (productSale) =>{
       let invoice =  await VoidProductSale(productSale);
    }

    const allC = invoice.payments.filter(p=>p.paymentMethodId !== 1).length === 0;

    return (
        <div className="invoice-modal">
            <Button type="button" onClick={handleShow}> invoice </Button>   
            {show &&
                <Modal show={show} onHide={closeModal} >
                    <Modal.Header closeButton>
                        <Modal.Title> Invoice: {invoice.invoiceNumber}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <SaleInvoice sale={invoice} />
                        {allC && invoice.products.map(p=>                                 
                             <div key={`ps-m-${p.id}`}>
                                <span>{p.product}</span>   
                                <button onClick={() => voidProductSale(p)}>  void </button>                                
                             </div>                                
                        )}
                    </Modal.Body>
                </Modal>
            }
        </div>
    );
}
export default SaleInvoiceModal