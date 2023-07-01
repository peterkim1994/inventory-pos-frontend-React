import { useEffect } from "react"

const PrintComponent = ()=>{
    useEffect(()=>{
        window.print();
    },[])
    return (
        <div>
           
        </div>
    )
}

export default PrintComponent