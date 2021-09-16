import { useEffect } from 'react';

import './styles/code-cell.css';
import { Cell } from '../state';
import { useActions } from '../hooks/useActions';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { useCumulativeCode } from '../hooks/useCumulativeCode';
import CodeEditor from './CodeEditor';
import Preview from './Preview';
import Resizable from './Resizable';

interface CodeCellProps {
  cell: Cell;
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
  const { updateCell, createBundle } = useActions();

  const bundle = useTypedSelector(({ bundles }) => bundles[cell.id]);
  const cumulativeCode = useCumulativeCode(cell.id);

  useEffect(() => {
    if (!bundle) {
      createBundle(cell.id, cumulativeCode);
      return;
    }

    const timer = setTimeout(async () => {
      createBundle(cell.id, cumulativeCode);
    }, 750);

    return () => {
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cumulativeCode, cell.id, createBundle]);

  const progressBar: JSX.Element = (
    <div className='progress-cover'>
      <progress className='progress is-small is-primary' max='100'>
        Loading
      </progress>
    </div>
  );

  const preview: JSX.Element =
    !bundle || bundle.loading ? (
      progressBar
    ) : (
      <Preview code={bundle.code} bundlingStatus={bundle.error} />
    );

  return (
    <Resizable direction='vertical'>
      <div
        style={{
          height: 'calc(100% - 10px)',
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        <Resizable direction='horizontal'>
          <CodeEditor
            onChange={value => updateCell(cell.id, value)}
            initialValue={cell.content}
          />
        </Resizable>
        <div className='progress-wrapper'>{preview}</div>
      </div>
    </Resizable>
  );
};

export default CodeCell;
