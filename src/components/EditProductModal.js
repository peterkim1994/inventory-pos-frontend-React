import { Modal, Button, ModalFooter } from "react-bootstrap";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { ProductForm } from './ProductForm';
import { EditProduct } from '../services/Inventory';
import ProductLabel from "./ProductLabel";
import { useRef } from "react";

const EditProductModal = ({ product }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const dispatch = useDispatch();
  const productRef = useRef();

  const editProduct = (editedProduct) => {
    const success = EditProduct(dispatch, editedProduct);
    if (success)
      handleClose();
  }

  const printLabel = () => {
    var myWindow = window.open("http://localhost:3000/printComponent", "MsgWindow", `width=${900}mm,height=${600}mm`);
    myWindow.document.write(productRef.current.innerHTML);
    myWindow.document.body.style.marginTop = 0;
    myWindow.print();
    //   myWindow.onafterprint = myWindow.close();
  }

  return (
    <div>
      <Button onClick={handleShow} className='btn btn-success' > Edit </Button>
      <Modal show={show} className="edit-product-modal" onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="modal-title">
            Edit Product
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {show && <ProductForm product={product} handleClose={handleClose} handleSubmit={editProduct} />}
        </Modal.Body>
        <ModalFooter>
          <div className="flexOrders" style={{margin:"auto"}}>
            <div ref={productRef} >
              <ProductLabel product={product} />
            </div>
           
          </div>       
          <button className="btn btn-primary" onClick={printLabel}>print</button>
        </ModalFooter>
      </Modal>
    </div>
  )
}

export default EditProductModal