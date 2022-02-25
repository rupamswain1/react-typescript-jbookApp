import React from "react";

interface outputProps{
    code:string;
}

const CodeOutput:React.FC<outputProps>=({code})=>{
    const html=`
    <script>
        ${code}
    </script>
    `
    return(
        <div>
            <iframe sandbox="allow-scripts" srcDoc={html}></iframe>
        </div>
    )
}

export default CodeOutput