import React,{useState, useEffect, useRef} from 'react';
import * as esbuild from 'esbuild-wasm';


const CodeInput:React.FC=()=>{

    const ref=useRef<any>();

    const [input, setInput]=useState<string>('');
    const [code,setCode]=useState<string>('');

    useEffect(()=>{
        startService();
    },[])

    const startService=async()=>{
        ref.current=await esbuild.startService({
            worker:true,
            wasmURL:'/esbuild.wasm'
        });
    };

    const onClick=async ()=>{
      if(!ref.current){
          return;
      }
      const result= await ref.current.transform(input,
            {
                loader:'jsx',
                target:'es2015'
            }
        );
        setCode(result.code)
      
    }

    return(
        <div>
            <textarea
                placeholder='Enter code here'
                value={input}
                onChange={(e)=>setInput(e.target.value)}
            ></textarea>
            <div>
                <button onClick={onClick}>Submit</button>
            </div>
            <pre>
                {code}
            </pre>
        </div>
    )
}

export default CodeInput;