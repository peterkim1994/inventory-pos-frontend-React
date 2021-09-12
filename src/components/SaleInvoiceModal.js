import SaleInvoice from "./SaleInvoice";
import { Modal, Button } from 'react-bootstrap';
import { useState } from 'react';

const SaleInvoiceModal = (invoice) => {

    const [show, setShow] = useState(false);

    const handleShow = () => {
        setShow(true);
    };

    const closeModal = () => {
        setShow(false);
    }

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
                    </Modal.Body>
                </Modal>
            }
        </div>
    );
}
export default SaleInvoiceModal