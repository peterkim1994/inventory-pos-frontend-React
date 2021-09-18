import { Modal, Button, FormControl, Row, Col } from "react-bootstrap";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { ProductForm } from './ProductForm';
import { EditProduct } from '../services/Inventory';


const EditProductModal = ({ product }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const dispatch = useDispatch();


  const editProduct = (editedProduct) => {    
    const success =  EditProduct(dispatch, editedProduct);    
    if(success)
      handleClose();
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
      </Modal>
    </div>
  )
}


export default EditProductModal