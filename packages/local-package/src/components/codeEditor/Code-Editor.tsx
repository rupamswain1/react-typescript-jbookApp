import { useRef, useEffect } from 'react';

import MonacoEditor, { EditorDidMount } from '@monaco-editor/react';
import prettier from 'prettier';
import parser from 'prettier/parser-babel';
import codeShift from 'jscodeshift';
import Highlighter from 'monaco-jsx-highlighter';

import { useActions } from '../../hooks/use-actions';
import { useCumilativeCode } from '../../hooks/use-CumilativeCode';

import './codeEditor.style.scss';
import { Cell } from '../../reduxState';

interface CodeEditorProps {
  initialValue: string;
  cell: Cell;
}

const CodeEditor: React.FC<CodeEditorProps> = ({
  initialValue,
  cell: { id, content },
}) => {
  const editorRef = useRef<any>();
  const cumilativeCode = useCumilativeCode(id)

  const { updateCell, createBundle } = useActions();
  useEffect(() => {

    const bundleTimer = setTimeout(async () => {
      createBundle(id, cumilativeCode)
    }, 750);

    return () => {
      clearTimeout(bundleTimer);
    };
  }, [cumilativeCode, id, createBundle]);

  const onEditorDidMount: EditorDidMount = (getValue, monacoEditor) => {
    editorRef.current = monacoEditor;

    monacoEditor.onDidChangeModelContent(() => {
      updateCell(id, getValue());
    });
    monacoEditor.getModel()?.updateOptions({ tabSize: 2 });

    const highlighter = new Highlighter(
      //@ts-ignore
      window.monaco,
      codeShift,
      monacoEditor
    );
    highlighter.highLightOnDidChangeModelContent(
      () => { },
      () => { },
      undefined,
      () => { }
    );
  };

  const formatCode = () => {

    const unformatted = editorRef.current.getModel().getValue();
    const formatted = prettier
      .format(unformatted, {
        parser: 'babel',
        plugins: [parser],
        useTabs: false,
        semi: true,
        singleQuote: true,
      })
      .replace(/\n$/, '');

    editorRef.current.setValue(formatted);

  };
  return (
    <div className="codeEditor">
      {/* {<button onClick={onClick}>Submit</button>} */}
      <button onClick={formatCode} className="codeEditor__button">
        Format
      </button>
      <MonacoEditor
        editorDidMount={onEditorDidMount}
        value={content ? content : initialValue}
        height="100%"
        theme="dark"
        language="javascript"
        options={{
          wordWrap: 'on',
          minimap: { enabled: false },
          showUnused: false,
          folding: false,
          lineNumbersMinChars: 3,
          fontSize: 16,
          scrollBeyondLastLine: false,
          automaticLayout: true,
        }}
        className="codeEditor__monacoEditor"
      />
    </div>
  );
};

export default CodeEditor;
