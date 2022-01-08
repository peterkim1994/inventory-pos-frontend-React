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

    const voidProductSale = async (productSale) =>{
       let invoice =  await VoidProductSale(productSale);
    }

    const allC =() =>{ 
       let allCash = invoice.payments.filter(p=>p.paymentMethodId !== 1).length === 0;   
       console.log("hel");
       console.log(allCash);
       console.log( invoice.products);
       if(localStorage.getItem("superAdminLogedOn") === 'true'){
        console.log("helss");
         return allCash;        
       }
       return false;
    };

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
                        {allC() === true && invoice.products.map(p=>                            
                            {
                            if(p.canceled === false)  
                                return(                              
                                    <div key={`ps-m-${p.id}${invoice.invoiceNumber}`}>
                                        <span>{p.product}</span>   
                                        <button onClick={() => voidProductSale(p)}>  void </button>                                
                                    </div>)
                            }
                        )}
                    </Modal.Body>
                </Modal>
            }
        </div>
    );
}
export default SaleInvoiceModal