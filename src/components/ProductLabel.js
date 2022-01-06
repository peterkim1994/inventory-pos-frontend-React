import { useEffect, useRef } from 'react';
import { MedLabel, LabelFont } from '../util/LabelDimensions';

const ProductLabel = ({ product, size, productId, isSmallLabel }) => {

    if(product == null){        
        let url_string = window.location.href;
        let url = new URL(url_string);
        productId = url.searchParams.get("productId");
    }

    let labelTag = <span>
                        {product.brandValue}&nbsp;{product.itemCategoryValue}&nbsp;
                        {product.colourValue}&nbsp;{product.sizeValue}&nbsp;${product.price}
                    </span>;

    if(isSmallLabel && isSmallLabel === true){
        labelTag = <span> ${product.price} </span>
    }

    let labelText = `[${product.brandValue}][${product.itemCategoryValue}][${product.colourValue}][${product.sizeValue}] \$${product.price}`;

  

    const barcodeRef = useRef();
    useEffect(() => {
        let barcodeHeight = (labelText.length > 45) ? 25 : 38;
        var JsBarcode = require('jsbarcode');
        JsBarcode(".barcode").options({height:35, width:1.8, fontSize:9, textPosition:"top", marginTop:9, marginBottom:1, marginRight:5, marginLeft:4} ).init()
    }, []);

    return (        
        <div id={`product-label-${product.id}`} className="product-label" style={{ ...MedLabel}}>       
                <svg className="barcode"                    
                    jsbarcode-value={product.barcode.toString()}
                    jsbarcode-textmargin="0"    
                    jsbarcode-fontoptions="light"
                    JsBarcode-fontSize="8"
                    >
                </svg>               
                <div style={{...LabelFont}}>
                  {labelText} 
                </div>               
        </div>
    );
}

export default ProductLabel