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
 //   document.body.innerHTML = printContents;
 //   window.print();
  //  document.body.innerHTML = originalContents;
    var myWindow = window.open("", "MsgWindow", `width=${width}mm,height=${height}mm`);
    myWindow.document.write(element);   
    myWindow.print();
}