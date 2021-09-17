import { Provider } from 'react-redux';

import { store } from '../state';
import CellList from './CellList';

const App = () => {
  return (
    <Provider store={store}>
      <div>
        <CellList />
      </div>
    </Provider>
  );
};

export default App;
