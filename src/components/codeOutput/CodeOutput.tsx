import React,{useRef,useEffect} from "react";
import { useTypedSelector } from '../../hooks/use-typed-selector';
import './codeOutput.style.scss'
interface outputProps{
    code:string,
    err:any
}
const html = `
    <html>
      <head>
        <style>html {background-color: white;}</style>
      </head>
      <body>
        <div id="root"></div>
        <script>
          const handleErr=(err)=>{
            const root = document.querySelector('#root');
            root.innerHTML = '<div style="color: red;"><h4>Runtime Error</h4>' + err + '</div>';
          }
          window.addEventListener('error',(event)=>{
            console.log('error listener')
            handleErr(event.error)
          });
          window.addEventListener('message', (event) => {
            try {
              eval(event.data);
            } catch (err) {
              handleErr(err);
            }
          }, false);
        </script>
      </body>
    </html>
  `;
const CodeOutput:React.FC<outputProps>=({code,err})=>{
   
    const iframe=useRef<any>();
    useEffect(() => {
        iframe.current.srcdoc = html;
        setTimeout(()=>{
          
          iframe.current.contentWindow.postMessage(code, '*');
        },100)
        
      }, [code]);
     console.log(code)
      return(
        <>
        {<div className="codeOutput-container">
          <iframe
            title="preview"
            ref={iframe}
            sandbox="allow-scripts"
            srcDoc={html}
            className="iframe"
          />
          {err && <div className="code-error">{err}</div>}          
        </div>}
        </>
    )
}

export default CodeOutput
