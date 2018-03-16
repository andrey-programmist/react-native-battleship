import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import BattleField from './BattleField';
import InfoBoard from './InfoBoard';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    height: '100%'
  }
});
const settingsShape = {
  dimensions: PropTypes.arrayOf(PropTypes.number).isRequired,
};
const Game = ({ settings }) => (
  <View style={styles.container}>
    <BattleField dimensions={settings.dimensions} />
    <InfoBoard />
  </View>
);

Game.propTypes = {
  settings: PropTypes.shape(settingsShape).isRequired,
};

const mapStateToProps = state => ({
  settings: state.settings
});

export default connect(mapStateToProps)(Game);
