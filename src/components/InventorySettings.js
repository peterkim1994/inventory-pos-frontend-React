import { useSelector } from 'react-redux';
import AttributeSetting from './AttributeSetting';


const InventorySettings = () => {

    const brands = useSelector(state => state.inventoryReducer.brands);
    const colours = useSelector(state => state.inventoryReducer.colours);
    const sizes = useSelector(state => state.inventoryReducer.sizes);
    const categories = useSelector(state => state.inventoryReducer.categories);

    return (
        <div className="inventorySettings">
            <AttributeSetting attributes={brands} attributeName={"Brand"} />
            <AttributeSetting attributes={colours} attributeName={"Colour"} />
            <AttributeSetting attributes={categories} attributeName={"Category"} />
            <AttributeSetting attributes={sizes} attributeName={"Size"} />
        </div>
    );
}

export default InventorySettings