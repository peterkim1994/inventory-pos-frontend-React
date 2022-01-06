export const MedLabel = {  
    minWidth:"51mm",
    maxWidth:"51mm",
    maxHeight:"25mm", 
    minHeight:"25mm",  
}

export const GetBulkMedLabelDimensions = (numLabels) =>{
  return  { 
        minWidth:"51mm",
        maxWidth:"51mm",
        maxHeight:`${numLabels * 25}mm`, 
        minHeight:`${numLabels * 25}mm`,
        overflowWrap:"break-word",
    }
}

export const LabelFont = {
    fontWeight: "bolder",
    fontFamily: "Arial, Helvetica, sans-serif",
    overflowWrap:"break-word",
    fontSize:"14.5px",
}