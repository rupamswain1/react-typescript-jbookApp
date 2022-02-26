import React,{useState, useEffect, useRef} from 'react';
import * as esbuild from 'esbuild-wasm';
import { unpkgPathPlugin } from '../plugins/unpkg-path-plugin';
import { FetchPlugin } from '../plugins/fetch-plugin';
import CodeOutput from './CodeOutput';
const CodeInput:React.FC=()=>{

    const ref=useRef<any>();
    const iframe=useRef<any>();
    const [input, setInput]=useState<string>('');
    const [code,setCode]=useState<string>('');

    useEffect(()=>{
        startService();
    },[])

    const startService=async()=>{
        ref.current=await esbuild.startService({
            worker:true,
            wasmURL:'https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm'
        });
    };

    const onClick=async ()=>{
      if(!ref.current){
          return;
      }
      const result=await ref.current.build({
          entryPoints:['index.js'],
          bundle:true,
          write:false,
          plugins:[unpkgPathPlugin(),
            FetchPlugin(input)
        ],
          //this is to remove the process.env.node_env warning from the browser
          define:{
              'process.env.NODE_ENV':'"production"',
              global:'window'
          }
      })
      console.log(result);
      iframe.current.contentWindow.postMessage(result.outputFiles[0].text,'*');
        //setCode(result.outputFiles[0].text)
      
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
            <CodeOutput iframe={iframe}/>
        </div>
    )
}

export default CodeInput;