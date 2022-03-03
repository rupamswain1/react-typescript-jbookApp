import React, {useEffect, useState} from 'react'
import {ResizableBox, ResizableBoxProps} from 'react-resizable';


import './resizable.style.scss';

interface ResizableProps{
    direction:'vertical'|'horizontal';
}

const Resizable:React.FC<ResizableProps>=({direction,children})=>{
    const[innerHeight, setInnerHeight]=useState<number>(window.innerHeight);
    const [innerWidth, setInnerWidth]=useState<number>(window.innerWidth);
    const [width,setWidth]=useState<number>(window.innerWidth*0.75);

    useEffect(()=>{
        let timer:any;
        const listen=()=>{
            if(timer){
                clearTimeout(timer);
            }
            timer=setTimeout(()=>{
                setInnerWidth(window.innerWidth);
                setInnerHeight(window.innerHeight);
                if(window.innerWidth*0.75<width){
                    setWidth(window.innerWidth*0.75)
                }
            },100)
        }
        window.addEventListener('resize',listen)

        return ()=>{
            window.removeEventListener('resize',listen)
        }
    },[width])
    
    let resizableProps:ResizableBoxProps;
    if(direction==='vertical'){
        resizableProps={
            minConstraints:[Infinity,24],
            maxConstraints:[Infinity,innerHeight*0.9],
            width:Infinity ,
            height:300,
            resizeHandles:['s'],
        };
    }
    else{ //For direction as horizontal
        resizableProps={
            className:'horizontal-resizer',
            minConstraints:[innerWidth*0.2,Infinity],
            maxConstraints:[innerWidth*0.75,Infinity],
            width,
            height:Infinity,
            resizeHandles:['e'],
            onResizeStop:(event,data)=>{
                setWidth(data.size.width);
            }
        };
    }
  return(
    <ResizableBox {...resizableProps}>
         {children}
    </ResizableBox>
  ) 
}


export default Resizable