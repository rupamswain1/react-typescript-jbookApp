import React, { useState, useEffect, useRef } from 'react';
import MDEditor from '@uiw/react-md-editor';

import './markDownEditor.style.scss';
import { Cell } from '../../reduxState';

import { useActions } from '../../hooks/use-actions';
import ActionBar from '../actionbar/ActionBar';

interface MarkDownEditorProps {
  cell: Cell;
}

const MarkDownEditor: React.FC<MarkDownEditorProps> = ({
  cell: { content, id },
}) => {
  const [enableEditor, setEnableEditor] = useState<boolean>(false);
  const { updateCell } = useActions();
  const mdEditorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const listen = (event: MouseEvent) => {
      //Check if the click is inside the editor or not
      if (
        mdEditorRef.current &&
        event.target &&
        mdEditorRef.current.contains(event.target as Node)
      ) {
        return;
      }
      setEnableEditor(false);
    };

    window.addEventListener('click', listen, { capture: true });

    return () => {
      window.removeEventListener('click', listen, { capture: true });
    };
  }, []);

  return (
    <div className="markdown-container">
      <ActionBar id={id} />
      {enableEditor ? (
        <div ref={mdEditorRef} className="text-editor">

          <MDEditor
            value={content}
            onChange={(event) => updateCell(id, event || 'Enter Text Here!!')}
          />
        </div>
      ) : (
        <div
          onClick={() => {
            setEnableEditor(true);
          }}
          className="text-editor collapsed"
        >
          <MDEditor.Markdown source={content || 'Enter Text Here!!'} />
        </div>
      )}
    </div>
  );
};
export default MarkDownEditor;
