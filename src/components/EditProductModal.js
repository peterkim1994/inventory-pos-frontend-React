import { Modal, Button, FormControl} from "react-bootstrap";
import React, {useState} from "react";
import {useDispatch} from "react-redux";
import { useEffect } from "react";



const EditProductModal =(product )=>{

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
      <div>
        <Button onClick={handleShow} className='btn btn-success' > Edit </Button>
        <ProductModal  product = {product} handleOnSubmit={handleClose} show={ show } handleClose={ handleClose } />
      </div>
    )
}

export const ProductModal = ({product, handleOnSubmit, handleOnClose, show}) => {
    return(
      <Modal show={show} onHide={handleOnSubmit}>

      
      </Modal>
    );
}

export default EditProductModal