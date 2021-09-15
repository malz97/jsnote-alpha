import { Dispatch } from 'redux';

import bundler from '../../bundler';
import { ActionType } from '../action-types';
import { CellTypes } from '../cell';
import {
  Action,
  Direction,
  UpdateCellAction,
  MoveCellAction,
  DeleteCellAction,
  InsertCellAfterAction,
} from '../actions';

export const moveCell = (id: string, direction: Direction): MoveCellAction => {
  return {
    type: ActionType.MOVE_CELL,
    payload: {
      id,
      direction,
    },
  };
};

export const updateCell = (id: string, content: string): UpdateCellAction => {
  return {
    type: ActionType.UPDATE_CELL,
    payload: {
      id,
      content,
    },
  };
};

export const insertCellAfter = (
  id: string | null,
  cellType: CellTypes
): InsertCellAfterAction => {
  return {
    type: ActionType.INSERT_CELL_AFTER,
    payload: {
      id,
      cellType,
    },
  };
};

export const deleteCell = (id: string): DeleteCellAction => {
  return {
    type: ActionType.DELETE_CELL,
    payload: id,
  };
};

export const createBundle = (id: string, input: string) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.BUNDLE_START,
      payload: {
        id,
      },
    });

    const result = await bundler(input);

    dispatch({
      type: ActionType.BUNDLE_COMPLETE,
      payload: {
        id,
        bundle: {
          code: result.bundledCode,
          err: result.status,
        },
      },
    });
  };
};
