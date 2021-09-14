import { Cell } from '../state';
import CodeCell from './CodeCell';
import TextEditor from './TextEditor';

interface CellListItemProps {
  cell: Cell;
}

const CellListItem: React.FC<CellListItemProps> = ({ cell }) => {
  let child: JSX.Element =
    cell.type === 'code' ? (
      <CodeCell cell={cell} />
    ) : (
      <TextEditor cell={cell} />
    );
  return (
    <div>
      <h3>{child}</h3>
    </div>
  );
};

export default CellListItem;
