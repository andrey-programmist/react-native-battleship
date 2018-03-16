import { UPDATE_LAYOUT, UPDATE_SHIPTYPES, BATTLE_FIRE, NEW_GAME } from './actions';
import { PositionToString } from '../utils/mappers';

const checkBattleCell = (ships, position) =>
  ships
    .some(({ positions }) => positions
      .some(p => p[0] === position[0] && p[1] === position[1]));

const rootReducer = (state = {}, action) => {
  let posKey;
  let isCellHited;
  let scoreboard;

  switch (action.type) {
    case UPDATE_SHIPTYPES:
      return {
        ...state,
        shipTypes: action.payload,
      };
    case UPDATE_LAYOUT:
      return {
        ...state,
        layout: action.payload,
      };
    case BATTLE_FIRE:
      posKey = PositionToString(action.position);
      if (state.battlefield[posKey] !== undefined) {
        return state;
      }
      isCellHited = checkBattleCell(state.layout, action.position);
      if (isCellHited) {
        scoreboard = {
          left: { ...state.scoreboard.left, scores: state.scoreboard.left.scores + 1 },
          right: state.scoreboard.right,
        };
      }
      return {
        ...state,
        battlefield: {
          ...state.battlefield,
          [posKey]: isCellHited,
        },
        scoreboard: (isCellHited && scoreboard) || state.scoreboard,
      };

    case NEW_GAME:
      return { ...state, ...action.payload };

    default:
      return state;
  }
};

export default rootReducer;
