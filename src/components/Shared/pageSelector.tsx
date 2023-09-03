import { FC, useState } from "react"
import * as React from 'react';
import { PaginationProps } from "../../types/formProps/paginationProps";


export const PageSelector: FC<PaginationProps> = ({ pageNumber, numPages, pageSelectionHandler }) => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    
    const pageHandler = (page : number) =>{
        setCurrentPage(page);
        pageSelectionHandler(page);
    }
    
    return (<nav>
        <ul className="pageination page-number-list">
            <li className="page-item prev">
                <input type="button" 
                    value="<"
                    disabled={currentPage === 1} 
                    onClick={ () => pageHandler(currentPage - 1)} 
                />              
            </li>         
            {
               Array.from({ length: 10 }, (_, i) => (
                <li key={i} className="page-item">
                  <input 
                    type="button" 
                    value={String(i + 1)} 
                    onClick={() => pageHandler(i + 1)}
                  />
                </li>
              ))
            }
             <li className="page-item next">
             <input type="button" 
                    value=">"
                    disabled={currentPage >= numPages} 
                    onClick={ () => pageHandler(currentPage - 1)} 
                />                
            </li>         
        </ul>
    </nav>)
}