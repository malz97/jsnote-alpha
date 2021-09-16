import { useTypedSelector } from './useTypedSelector';

export const useCumulativeCode = (cellId: string) => {
  return useTypedSelector(state => {
    const { order, data } = state.cells;

    const orderedCodeCells = order
      .map(id => data[id])
      .filter(c => c.type === 'code');

    const showFunction = `
        import _React from 'react';
        import _ReactDOM from 'react-dom';

        var show = (value) => {
          const root = document.querySelector('#root');
          if (typeof value === 'object') root.innerHTML = JSON.stringify(value);
          if (typeof value === 'object' && value.$$typeof && value.props) _ReactDOM.render(value, root);
          if (typeof value !== 'object') root.innerHTML = value;
        };
      `;

    const showFunctionNoOp = `var show = () => {}`;

    const cumulativeCode = [];
    for (const c of orderedCodeCells) {
      if (c.id === cellId) {
        cumulativeCode.push(showFunction);
        cumulativeCode.push(c.content);
        break;
      } else {
        cumulativeCode.push(showFunctionNoOp);
        cumulativeCode.push(c.content);
      }
    }

    return cumulativeCode.join('\n');
  });
};
