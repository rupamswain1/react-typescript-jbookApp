import { useRef,useState } from "react";

import MonacoEditor,{EditorDidMount} from "@monaco-editor/react";
import prettier from 'prettier';
import parser from 'prettier/parser-babel'
import codeShift from 'jscodeshift';
import Highlighter from 'monaco-jsx-highlighter';

import bundler from '../../bundler';

import './codeEditor.style.scss';

interface CodeEditorProps{
    initialValue:string;
    setCode(value:string):void;
}



const CodeEditor:React.FC<CodeEditorProps>=({initialValue,setCode})=>{
    const editorRef=useRef<any>();

    const [input, setInput]=useState<string>('');
    const onClick=async ()=>{
         const output=await bundler(input)
         setCode(output);
         
      }

    const onEditorDidMount:EditorDidMount=(getValue, monacoEditor)=>{
        editorRef.current=monacoEditor;
        setInput(getValue())     
        monacoEditor.onDidChangeModelContent(()=>{
            setInput(getValue())
        });
        monacoEditor.getModel()?.updateOptions({tabSize:2});

        const highlighter=new Highlighter(
            //@ts-ignore
            window.monaco,
            codeShift,
            monacoEditor
        );
        highlighter.highLightOnDidChangeModelContent(
            ()=>{},
            ()=>{},
            undefined,
            ()=>{}
        );


    }

    const formatCode=()=>{
        const unformatted=editorRef.current.getModel().getValue();
        const formatted=prettier.format(unformatted,{
            parser:'babel',
            plugins:[parser],
            useTabs:false,
            semi:true,
            singleQuote:true,
        }).replace(/\n$/,'');
        editorRef.current.setValue(formatted);
        
    }
    return(
        <div className='codeEditor'>
         {/* {<button onClick={onClick}>Submit</button>} */}
        <button onClick={formatCode} className="codeEditor__button">Format</button>
        <MonacoEditor
                    editorDidMount={onEditorDidMount}
                    value={initialValue}
                    height="100%" 
                    theme='dark' 
                    language="javascript"
                    options={{wordWrap:'on',
                        minimap:{enabled:false},
                        showUnused:false,
                        folding:false,
                        lineNumbersMinChars:3,
                        fontSize:16,
                        scrollBeyondLastLine:false,
                        automaticLayout:true
                    }}
                    className='codeEditor__monacoEditor'
        />
       
        </div>
        )
};

export default CodeEditor;