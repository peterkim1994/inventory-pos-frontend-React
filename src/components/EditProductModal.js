import { Modal, Button } from "react-bootstrap";
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
    const success =  EditProduct(dispatch, editedProduct);    
    if(success)
      handleClose();
  }

  const printLabel = () =>{
    var myWindow = window.open("http://localhost:3000/printComponent", "MsgWindow", `width=${50}mm,height=${27}mm`);
    myWindow.document.write(productRef.current.innerHTML);  
   // let printContents = document.getElementById("printable-label");
   // printContents.appendChild(productRef.current);
    myWindow.print();   
   // myWindow.onafterprint = myWindow.close();
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
        <div ref={productRef}>
          <ProductLabel product={product}/>
        </div>
        <button onClick={printLabel}>print</button>        
      </Modal>
    </div>
  )
}


export default EditProductModal