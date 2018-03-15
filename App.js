/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  Text,
  View,
  Alert
} from 'react-native';

import Push from 'appcenter-push';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import createSaga from 'redux-saga';

import Game from './app/components/Game';

import reducer from './app/redux/reducers';

import * as initialState from './app/redux/initialState.json';
import * as extendedState from './app/redux/extendedState.json';

import { gameCompleted } from './app/redux/sagas';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

const saga = createSaga();
const store = createStore(reducer, { ...initialState, ...extendedState }, applyMiddleware(saga));
Push.setListener({
  onPushNotificationReceived({ message, title }) {
    Alert.alert(title, message);
  }
});
saga.run(gameCompleted)

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Game />
      </Provider>
    );
  }
}
