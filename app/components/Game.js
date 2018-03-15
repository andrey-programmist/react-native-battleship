import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import BattleField from './BattleField';
import InfoBoard from './InfoBoard';

const Game = ({ settings }) => (
  <View>
    <BattleField dimensions={settings.dimensions} />
    <InfoBoard />
  </View>
);

const settingsShape = {
  dimensions: PropTypes.arrayOf(PropTypes.number).isRequired,
};
Game.propTypes = {
  settings: PropTypes.shape(settingsShape).isRequired,
};

const mapStateToProps = state => ({ settings: state.settings });

export default connect(mapStateToProps)(Game);