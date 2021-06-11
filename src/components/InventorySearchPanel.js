import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, InputGroup, Form, Col} from 'react-bootstrap';
import ProductFilter from '../assets/ProductFilter';
import AttributeSelector from './AttributeSelector';

const InventorySearchPanel = ({ setResults }) => {
    const brands = useSelector(state => state.inventoryReducer.brands);
    const colours = useSelector(state => state.inventoryReducer.colours);
    const sizes = useSelector(state => state.inventoryReducer.sizes);
    const categories = useSelector(state => state.inventoryReducer.categories);
    const products = useSelector(state => state.inventoryReducer.products);

    const productFilter = new ProductFilter();
    const [productFilterObj, setProductFilter] = useState(productFilter);

    useEffect(()=>{
        performFilter();
    },[products]);

    const performFilter = () => {
        const filteredResults = products.filter((product) => { return productFilterObj.filterProducts(product) });
        console.log("set results being called");
        setResults(filteredResults);
    }

    return (
        <div className="inventory-search-panel">
            <Form className="inventory-search-panel">
                <Form.Row>
                    <InputGroup className="inventory-search-panel">
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
                  
                    <Col>
                        <Button variant="primary" onClick={performFilter}>Filter</Button>
                    </Col>
                    </InputGroup>
                </Form.Row>
            </Form>
        </div>
    )
}

export default InventorySearchPanel