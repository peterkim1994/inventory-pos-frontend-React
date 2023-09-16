import { ChangeEvent, FC, useEffect, useRef, useState } from 'react';
import {  useSelector } from 'react-redux';
import { Form, Col } from 'react-bootstrap';
import AttributeSelector from '../Shared/AttributeSelector';
import { ProductAttribute } from '../../types/product/productAttribute';
import { Product } from '../../types/product/product';
import { SearchQuery, defaultSearchCriteria } from '../../types/product/SearchQuery';
import { SearchInventory } from '../../services/inventory';
import * as React from 'react';

const InventorySearchPanel : FC<{ searchResultHandler: (results: Product[]) => void }> = ( {searchResultHandler} ) => {

    const isMounted = useRef(false);
    const brands : ProductAttribute[] = useSelector<any>(state => state.inventoryReducer.brands) as ProductAttribute[];
    const colours : ProductAttribute[] = useSelector<any>(state => state.inventoryReducer.colours) as ProductAttribute[];
    const sizes : ProductAttribute[] = useSelector<any>(state => state.inventoryReducer.sizes) as ProductAttribute[];
    const categories : ProductAttribute[] = useSelector<any>(state => state.inventoryReducer.categories) as ProductAttribute[];
    
    const searchBarRef = useRef<HTMLInputElement>();

    const [searchQuery, setSearchQuery] = useState<SearchQuery>(defaultSearchCriteria);

    const handleAttributeSelection = (event : ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLInputElement>) : void =>  {
        event.preventDefault();
        setSearchQuery({
            ...searchQuery,
            [event.target.name] : event.target.value !== '-' ? event.target.value : null
        });
    }

    const searchInventory  = async (event? : React.MouseEvent<HTMLButtonElement>) => {
        event && event.preventDefault();
        searchQuery.searchString = searchBarRef.current.value;
        let results = await SearchInventory(searchQuery);
        searchResultHandler(results);
    }

    useEffect(() =>{
        if(!isMounted.current){
            setSearchQuery(defaultSearchCriteria);
            isMounted.current = true;
        }
        else{
            searchInventory();
        }

    },[searchQuery])

    return (
        <div className="inventory-search-panel">
            <Form>                
                <Form.Row>                                
                        <AttributeSelector
                            attributes={brands}
                            attributeCategory={"brand"}
                            selectEventHandler={handleAttributeSelection}                            
                        />
                        <AttributeSelector
                            attributes={categories}
                            attributeCategory={"category"}
                            selectEventHandler={handleAttributeSelection}
                        />
                        <AttributeSelector
                            attributes={colours}
                            attributeCategory={"colour"}
                            selectEventHandler={handleAttributeSelection}
                        />
                        <AttributeSelector
                            attributes={sizes}
                            attributeCategory={"size"}
                            selectEventHandler={handleAttributeSelection}
                        />
                        <Col sm={2}>
                            <div className="inventory-search-bar">
                                <input className="form-control" name="searchString" placeholder="search description" ref={searchBarRef}/>                                
                                <button className="btn btn-primary" onClick={(event) => searchInventory(event)}> search</button>
                            </div>
                        </Col>
                        <Col sm={1} style={{"display":"none"}}>                                              
                        </Col>
                </Form.Row>
            </Form>
        </div>
    );
}

export default InventorySearchPanel