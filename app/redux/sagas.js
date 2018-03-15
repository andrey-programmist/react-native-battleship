import { select, takeLatest, put, take } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import { Alert } from 'react-native';
import { BATTLE_FIRE, NewGame } from './actions';
import { PositionToString } from '../utils/mappers';
import * as initialState from './initialState.json';
import * as extendedState from './extendedState.json';

const isCompleted = state => state
  .layout
  .every(ship => ship
    .positions
    .every(p => state.battlefield[PositionToString(p)]));

export function* gameCompleted() {
  while (true) {
    yield take(BATTLE_FIRE);
    const completed = yield select(isCompleted)
    if (completed) {
      Alert.alert('Игра окончена', 'Новая начнется через 3 сек');
      yield delay(3000);
      yield put(NewGame({ ...initialState, ...extendedState }));
    }
  }
}
