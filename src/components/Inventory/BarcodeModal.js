import { useSelector } from "react-redux"
import ProductLabel from "../Printables/ProductLabel"
import { PrintBarcode } from "../../services/PrintService"
import { useRef, useState } from "react"

const BarcodeModal = ({product, afterPrint}) =>{

    //const product = useSelector(state=>state.inventoryReducer.products.filter(p=>p.id==productId));
    const productRef = useRef();
    const [size,setSize] = useState(70);

    const goSmall = () =>{
        setSize(20);
    }

    const goMedium = ()=>{
        setSize(70);
    }

    const printBarcode = () => {
        PrintBarcode(size==20 ? "s":"m", productRef.current.innerHTML);
    }

    return(
        <div ref={productRef}>
            <ProductLabel product={product} size={size} />
            <button className="btn btn-primary" onClick={printBarcode}>Print</button>
            <button className="btn btn-secondary" onClick={goSmall}>small</button>
            <button className="btn btn-secondary" onClick={goMedium}>Medium</button>
        </div>
    )
}