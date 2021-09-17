import { useState, useEffect, useRef } from 'react';
import MDEditor from '@uiw/react-md-editor';

import { useActions } from '../hooks/useActions';
import { Cell } from '../state';
import './styles/text-editor.css';

interface TextEditorProps {
  cell: Cell;
}

const TextEditor: React.FC<TextEditorProps> = ({ cell }) => {
  const { updateCell } = useActions();
  const [editing, setEditing] = useState(false);
  const editorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (
        editorRef.current &&
        event.target &&
        editorRef.current.contains(event.target as Node)
      ) {
        return;
      }
      setEditing(false);
    };
    document.addEventListener('click', listener, { capture: true });

    return () => {
      document.removeEventListener('click', listener, { capture: true });
    };
  }, []);

  if (editing)
    return (
      <div className='text-editor' ref={editorRef}>
        <MDEditor
          value={cell.content}
          onChange={v => updateCell(cell.id, v || '')}
        />
      </div>
    );

  return (
    <div className='text-editor card' onClick={() => setEditing(true)}>
      <div className='card-content'>
        <MDEditor.Markdown source={cell.content || 'Click to edit'} />
      </div>
    </div>
  );
};

export default TextEditor;
