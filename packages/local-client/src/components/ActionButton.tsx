import { useActions } from '../hooks/useActions';
import { Direction } from '../state';

interface ActionButtonProps {
  action: string;
  id: string;
}

const ActionButton: React.FC<ActionButtonProps> = ({ action, id }) => {
  const { moveCell, deleteCell } = useActions();
  const onClick =
    action === 'delete'
      ? () => deleteCell(id)
      : () => moveCell(id, action as Direction);

  return (
    <button onClick={onClick} className='button is-primary is-small'>
      <span className='icon'>
        <i
          className={`fas fa-${
            action === 'delete' ? 'times' : `arrow-${action}`
          }`}
        />
      </span>
    </button>
  );
};

export default ActionButton;
