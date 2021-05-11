import InventoryTable from './InventoryTable';
import InventorySearchPanel from './InventorySearchPanel';
import React, { useState, useRef } from 'react';
import ProductFilter from '../assets/ProductFilter';
import AttributeSelector from './AttributeSelector';
import { Button, Form, Row, InputGroup } from 'react-bootstrap';
import { useSelector } from 'react-redux';


export default function InventoryBody({ products }) {
    const brands = useSelector(state => state.inventoryReducer.brands);
    const colours = useSelector(state => state.inventoryReducer.colours);
    const sizes = useSelector(state => state.inventoryReducer.sizes);
    const categories = useSelector(state => state.inventoryReducer.categories);



    const [filteredProducts, setFilteredProducts] = useState(products);//initial state set to all products
    console.log("filtered products ");
    console.log(products);
    console.log(filteredProducts);
    const productFilter = new ProductFilter();
    const [productFilterObj, setProductFilter] = useState(productFilter);

    const searchPanelRef = useRef();

    const performFilter = () => {
        const filteredResults = products.filter((product) => { return productFilterObj.filterProducts(product) });
        console.log("perfrom filter in inventory boidy");
        console.log(filteredResults);
        console.log(productFilterObj);
        setFilteredProducts(filteredResults);
    }

    return (
        <div>
            <div>
                <Form>               
                    <Form.Row>
                    <InputGroup>
                            <AttributeSelector
                                stateAttributes={brands}
                                attributeName={"Brand"}
                                handleSelect={event => productFilterObj.brandParam = parseInt(event.target.value)}
                            />
                            <AttributeSelector
                                stateAttributes={categories}
                                attributeName={"Category"}
                                handleSelect={event => productFilterObj.categoryParam = parseInt(event.target.value)}
                            />
                            <AttributeSelector
                                stateAttributes={colours}
                                attributeName={"Colour"}
                                handleSelect={event => productFilterObj.colourParam = parseInt(event.target.value)}
                            />                           
                            <AttributeSelector
                                stateAttributes={sizes}
                                attributeName={"Size"}
                                handleSelect={event => productFilterObj.sizeParam = parseInt(event.target.value)}
                            />
                            <Button className="btn-primary" onClick={performFilter}>Filter</Button>
                            </InputGroup>
                    </Form.Row> 
                </Form>
            </div>
            <InventoryTable products={filteredProducts} />
        </div>
    );
}