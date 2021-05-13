import { Modal, Button, FormControl, Row, Col } from "react-bootstrap";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { ProductForm } from './ProductForm';
import { EditProduct } from '../services/Inventory';
import ModalHeader from "react-bootstrap/esm/ModalHeader";

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
      <Modal show={show} className="edit-product-modal">
        <Modal.Header>
          <Modal.Title className="modal-title">
            Edit Product
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ProductForm product={product} handleClose={handleClose} handleSubmit={editProduct} />
        </Modal.Body>
      </Modal>
    </div>
  )
}





export default EditProductModal