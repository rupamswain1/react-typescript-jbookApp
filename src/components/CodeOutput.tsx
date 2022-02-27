import React from "react";

interface outputProps{
    iframe:any;
}

const CodeOutput:React.FC<outputProps>=({iframe})=>{
    const html=`
        <html>
            <head></head>
            <body>
                <div id="root"></div>
                <script>
                    window.addEventListener('message',(event)=>{
                       try{
                           eval(event.data)
                       }catch(err){
                           const root=document.querySelector('#root');
                           root.innerHTML='<div style="color:red;"><h4>Error :'+err+'</h4></div>'
                       }
                        ;
                    },false)
                </script>
            </body>
        </html>
    `
    return(
        <div>
            <iframe title="preview" sandbox="allow-scripts" srcDoc={html} ref={iframe}></iframe>
        </div>
    )
}

export default CodeOutput
