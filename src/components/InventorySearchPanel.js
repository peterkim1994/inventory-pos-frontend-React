import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, InputGroup, Form, Col } from 'react-bootstrap';
import ProductFilter from '../util/ProductFilter';
import AttributeSelector from './AttributeSelector';

const InventorySearchPanel = ({ setResults }) => {
    const brands = useSelector(state => state.inventoryReducer.brands);
    const colours = useSelector(state => state.inventoryReducer.colours);
    const sizes = useSelector(state => state.inventoryReducer.sizes);
    const categories = useSelector(state => state.inventoryReducer.categories);
    const products = useSelector(state => state.inventoryReducer.products);
    const [search,setSearch] = useState("");
    const productFilter = new ProductFilter();
    const [productFilterObj, setProductFilter] = useState(productFilter);

    useEffect(() => {
     //   performFilter();
       // filterSearch();
       let filteredResults = products.filter((product) => { return productFilterObj.filterProducts(product) });
       if(search !== ""){
            filteredResults = products.filter(product => product.description.toLowerCase().includes(search.toLowerCase()));
       }
       setResults(filteredResults);
    }, [products]);

    const performFilter = (event) => {
        event.preventDefault();
        const filteredResults = products.filter((product) => { return productFilterObj.filterProducts(product) });
        console.log("set results being called");
        setResults(filteredResults);
    }

    const filterSearch = (event) => {
        event.preventDefault();
        const filteredResults = products.filter(product => product.description.toLowerCase().includes(search.toLowerCase()));
        setResults(filteredResults);
    }

    return (
        <div className="inventory-search-panel">
            <Form className="inventory-search-panel">
                <div className="inventory-search-bar">
                    <input className="form-control" placeholder="search description" onChange={(event)=>setSearch(event.target.value)}/>
                    <button className="btn btn-primary" onClick={(event) => filterSearch(event)}> search</button>
                </div>
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
                            <button className="btn btn-primary" onClick={(event) => performFilter(event)}>Filter</button>
                        </Col>
                    </InputGroup>
                </Form.Row>
            </Form>
        </div>
    )
}

export default InventorySearchPanel