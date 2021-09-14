import ActionButton from './ActionButton';
import './styles/action-bar.css';

interface ActionBarProps {
  id: string;
}

const ActionBar: React.FC<ActionBarProps> = ({ id }) => {
  return (
    <div className='action-bar'>
      <ActionButton action='up' id={id} />
      <ActionButton action='down' id={id} />
      <ActionButton action='delete' id={id} />
    </div>
  );
};

export default ActionBar;
