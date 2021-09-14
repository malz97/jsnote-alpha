import { useState, useEffect } from 'react';

import { Cell } from '../state';
import { useActions } from '../hooks/useActions';
import bundle from '../bundler';
import CodeEditor from './CodeEditor';
import Preview from './Preview';
import Resizable from './Resizable';

interface CodeCellProps {
  cell: Cell;
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
  const { updateCell } = useActions();
  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const timer = setTimeout(async () => {
      const { bundledCode, status } = await bundle(cell.content);
      setCode(bundledCode);
      setError(status);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [cell.content]);

  return (
    <Resizable direction='vertical'>
      <div style={{ height: '100%', display: 'flex', flexDirection: 'row' }}>
        <Resizable direction='horizontal'>
          <CodeEditor
            onChange={value => updateCell(cell.id, value)}
            initialValue={cell.content}
          />
        </Resizable>
        <Preview code={code} bundlingStatus={error} />
      </div>
    </Resizable>
  );
};

export default CodeCell;
