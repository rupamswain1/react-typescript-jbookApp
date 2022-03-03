import React,{useState,useEffect,useRef} from 'react'
import MDEditor from '@uiw/react-md-editor';

import './markDownEditor.style.scss';

export const MarkDownEditor = () => {

    const [enableEditor, setEnableEditor]=useState<boolean>(false);
    const [value,setValue]=useState<string>('# Enter Text Here! Click Here!!');
    const mdEditorRef=useRef<HTMLDivElement|null>(null);
    useEffect(()=>{
        const listen=(event:MouseEvent)=>{
            //Check if the click is inside the editor or not    
            if(mdEditorRef.current && event.target && mdEditorRef.current.contains(event.target as Node)){
                return;                
            }
            setEnableEditor(false);
        }

        window.addEventListener('click',listen,{capture:true});

        return(()=>{
            window.removeEventListener('click',listen,{capture:true})
        })
    },[])

    return (
        <div>
            {
                enableEditor
                ?
                    <div ref={mdEditorRef} className='text-editor'>
                        <MDEditor value={value} onChange={(event)=>setValue(event || '')}/>
                    </div>
                :
                    <div onClick={()=>{setEnableEditor(true)}} className='text-editor collapsed'>
                        <MDEditor.Markdown source={value}/>
                    </div>
            }
        </div>
    )
}
