import { useState, useEffect, useRef } from 'react';
import MDEditor from '@uiw/react-md-editor';

import './styles/text-editor.css';

const TextEditor: React.FC = () => {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState('# Header');
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
      <div ref={editorRef}>
        <MDEditor
          className='text-editor'
          value={value}
          onChange={v => setValue(v || '')}
        />
      </div>
    );

  return (
    <div className='card' onClick={() => setEditing(true)}>
      <div className='card-content'>
        <MDEditor.Markdown className='text-editor' source={value} />
      </div>
    </div>
  );
};

export default TextEditor;
