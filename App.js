import React, { Component } from 'react';
import { Alert } from 'react-native';
import Push from 'appcenter-push';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import createSaga from 'redux-saga';

import Game from './app/components/Game';
import reducer from './app/redux/reducers';
import getInitialState from './app/utils/mockState';
import { gameCompleted } from './app/redux/sagas';

const saga = createSaga();
const store = createStore(reducer, getInitialState(), applyMiddleware(saga));
Push.setListener({
  onPushNotificationReceived({ message, title }) {
    Alert.alert(title, message);
  }
});
saga.run(gameCompleted);

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Game />
      </Provider>
    );
  }
}
