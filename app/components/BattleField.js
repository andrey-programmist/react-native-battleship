import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, Dimensions } from 'react-native';
import BattleCell from './BattleCell';
import { PositionToString } from '../utils/mappers';

const borderWidth = 7;
const styles = StyleSheet.create({
  container: {
    borderColor: '#ffb100',
    borderWidth: borderWidth,
    flexDirection: 'row',
    flexWrap: 'wrap'
  }
});
const BattleField = ({ dimensions }) => {
  const cells = [];
  const unit = (Dimensions.get('screen').width - 2 * borderWidth) / dimensions[0];
  for (let y = 0; y < dimensions[1]; y += 1) {
    for (let x = 0; x < dimensions[0]; x += 1) {
      const pos = [x, y];
      cells.push(<BattleCell width={unit} key={PositionToString(pos)} position={pos} />);
    }
  }
  return (
    <View style={styles.container}>{cells}</View>
  );
};
BattleField.propTypes = {
  dimensions: PropTypes.arrayOf(PropTypes.number).isRequired,
};
export default BattleField;
