import MonacoEditor,{EditorDidMount} from "@monaco-editor/react";

interface CodeEditorProps{
    initialValue:string;
    onChange(value:string):void;
}



const CodeEditor:React.FC<CodeEditorProps>=({initialValue,onChange})=>{
    const onEditorDidMount:EditorDidMount=(getValue:()=>string, monacoEditor: any)=>{
        monacoEditor.onDidChangeModelContent(()=>{
            onChange(getValue())
        })
    }
    return <MonacoEditor
                editorDidMount={onEditorDidMount}
                value={initialValue}
                height="200rem" 
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
                />
};

export default CodeEditor;