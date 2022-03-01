import React,{useRef,useEffect} from "react";

interface outputProps{
    code:string;
}
const html = `
    <html>
      <head></head>
      <body>
        <div id="root"></div>
        <script>
          window.addEventListener('message', (event) => {
            try {
              eval(event.data);
            } catch (err) {
              const root = document.querySelector('#root');
              root.innerHTML = '<div style="color: red;"><h4>Runtime Error</h4>' + err + '</div>';
              console.error(err);
            }
          }, false);
        </script>
      </body>
    </html>
  `;
const CodeOutput:React.FC<outputProps>=({code})=>{

    const iframe=useRef<any>();
    useEffect(() => {
        iframe.current.srcdoc = html;
        setTimeout(()=>{
          iframe.current.contentWindow.postMessage(code, '*');
        },100)
        
      }, [code]);
    
    
  
    return(
        <div>
             <iframe
      title="preview"
      ref={iframe}
      sandbox="allow-scripts"
      srcDoc={html}
    />
        </div>
    )
}

export default CodeOutput
