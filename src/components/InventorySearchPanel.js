import {useState} from 'react';
import {useSelector} from 'react-redux';

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