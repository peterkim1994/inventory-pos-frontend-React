import { Modal, Button, FormControl, Row, Col } from "react-bootstrap";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { ProductForm } from './ProductForm';
import {EditProduct} from '../services/Inventory';

const EditProductModal = ({ product }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const dispatch = useDispatch();

  const editProduct =(editedProduct) =>{
     EditProduct(dispatch, editedProduct);
  }

  return (
    <div>
      <Button onClick={handleShow} className='btn btn-success' > Edit </Button>
      <Modal show={show}>
          <ProductForm product={product} handleClose={handleClose} handleSubmit={editProduct} />
      </Modal>
    </div>
  )
}





export default EditProductModal