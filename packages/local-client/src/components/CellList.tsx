import { Fragment, useEffect } from 'react';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { useActions } from '../hooks/useActions';

import './styles/cell-list.css';
import CellListItem from './CellListItem';
import AddCell from './AddCell';

const CellList: React.FC = () => {
  const { fetchCells } = useActions();

  const cells = useTypedSelector(({ cells: { order, data } }) =>
    order.map(id => data[id])
  );

  useEffect(() => {
    fetchCells();
  }, []);

  const renderedCells = cells.map(cell => (
    <Fragment key={cell.id}>
      <CellListItem cell={cell} />
      <AddCell previousCellId={cell.id} />
    </Fragment>
  ));

  return (
    <div className='cell-list'>
      <AddCell forceVisible={cells.length === 0} previousCellId={null} />
      {renderedCells}
    </div>
  );
};

export default CellList;
