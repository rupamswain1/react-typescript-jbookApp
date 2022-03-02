import React from 'react'
import {ResizableBox} from 'react-resizable';

import './resizable.style.scss';

interface ResizableProps{
    direction:'vertical'|'horizontal';
}

const Resizable:React.FC<ResizableProps>=({direction,children})=>{
  return <ResizableBox 
            width={Infinity} 
            height={300}
            resizeHandles={['s']}
        >
            {children}
         </ResizableBox>
}


export default Resizable