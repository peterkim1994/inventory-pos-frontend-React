import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

const ProductLabel = ({ product, size, productId }) => {

    if(product == null){        
        let url_string = window.location.href;
        let url = new URL(url_string);
        productId = url.searchParams.get("productId");
   //     product = useSelector(state=>state.inventoryReducer.products.find(product=>product.id == productId));
    }

    console.log(product);
    const barcodeRef = useRef();
    useEffect(() => {
        var JsBarcode = require('jsbarcode');
        JsBarcode(".barcode").options({height:size?size:20,width:1.7} ).init()
    }, []);
//style={{display:"flex",flexDirection:"column",justifyContent:"center",alignContent:"center",margin:"0"}}
    return (        
        <div id={`product-label-${product.id}`} className="product-label" style={{position:"relative"}}>
        <br/>
            <span>{product.brandValue}&nbsp;{product.itemCategoryValye}&nbsp;
                {product.colourValue}&nbsp;{product.sizeValue}&nbsp;${product.price}</span>         
                <svg className="barcode"                    
                    jsbarcode-value={product.barcode.toString()}
                    jsbarcode-textmargin="0"
                    jsbarcode-fontoptions="bold">
                </svg>
           
        </div>
    );
}
export default ProductLabel