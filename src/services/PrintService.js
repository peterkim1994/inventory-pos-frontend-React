const medium = {
    name: "medium",
    fontSize : "10",
    width : "30",
    height : "70"
}

const toLabel = (product) =>{
    let labelInfo = `${product.price} - ${product.brandValue} - ${product.itemCategoryValye}\n
    - ${product.colourValue} ${product.sizeValue}`;
}

export default PrintLabel = (width, length, fontSize, product, size) =>{

    var printContents = document.getElementById(divId).innerHTML;
    var originalContents = document.body.innerHTML;
    var myWindow = window.open("", "MsgWindow", `width=${width}mm,height=${height}mm`);
    myWindow.document.write(element);   
    myWindow.print();
}

export const SetBulkPrintProducts = async(dispatch, products ) =>{
    try {    
        dispatch(ActionCreators.SetBulkPrintProducts(products));
    } catch (err) {
        console.log("start sale service err");
        console.log(err);
    }
}

export const PrintBarcode = (size, content, qty = 1) =>{
    let width = 300;
    let height = 600;
    if(size == "s"){
        height = 270;
    }
    if(size == "")
    var myWindow = window.open("http://localhost:3000/printComponent", "MsgWindow", `width=${width}mm,height=${height}mm`);
    myWindow.document.write(content);//productRef.current.innerHTML);   
   // let printContents = document.getElementById("printable-label");
   // printContents.appendChild(productRef.current);
    myWindow.print();   
    myWindow.onafterprint = myWindow.close();
}

