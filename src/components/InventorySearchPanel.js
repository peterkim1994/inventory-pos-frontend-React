import {useState} from 'react';
import {useSelector} from 'react-redux';
import { Button, Modal, Form } from 'react-bootstrap';

const InventorySearchPanel = () =>{

    const items = useSelector(state=> state.inventory)
    const[searchedProducts, setSearchedProducts] = useState()

    return(
        <div>
            <h3>Search</h3>
        </div>
    )
}

export default InventorySearchPanel