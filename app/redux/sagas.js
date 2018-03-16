import { select, put, take } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import { Alert } from 'react-native';
import { BATTLE_FIRE, NewGame } from './actions';
import { PositionToString } from '../utils/mappers';
import getInitialState from '../utils/mockState';

const isCompleted = state => state // (?) may be moved to utils
  .layout
  .every(ship => ship
    .positions
    .every(p => state.battlefield[PositionToString(p)]));

export function* gameCompleted() { // subscribe to BATTLE_FIRE action in order to define game state
  while (true) {
    yield take(BATTLE_FIRE);
    const completed = yield select(isCompleted)
    if (completed) {
      Alert.alert('Игра окончена', 'Новая начнется через 3 сек'); // you can push task to macrotasks queue via setTimeout if operation is huge
      yield delay(3000);
      yield put(NewGame(getInitialState()));
    }
  }
}
