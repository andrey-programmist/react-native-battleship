import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Fire } from '../redux/actions';
import { PositionToString } from '../utils/mappers';
import { SHOTRESULT_HIT, SHOTRESULT_MISS, SHOTRESULT_WAITING } from '../utils/shotResults';
import { TouchableOpacity, View, Image, StyleSheet } from 'react-native';

const hitImg = require('../assets/Hit.png');
const missImg = require('../assets/Miss.png');

const styles = StyleSheet.create({
  cell: {
    backgroundColor: '#f8f8f8',
    borderWidth: 0.5,
    borderColor: '#cfcfcf'
  }
});
export const BattleCellPure = ({ shotResult, actions, position, width }) => {
  const cellStyle = [styles.cell, { width, height: width }];
  const cell = (r => {
    if (r === SHOTRESULT_WAITING) {
      return (
        <TouchableOpacity onPress={() => actions.Fire(position)}>
          <View style={cellStyle} />
        </TouchableOpacity>
      );
    } else if (r === SHOTRESULT_HIT) {
      return <Image style={cellStyle} source={hitImg} />;
    } else {
      return <Image style={cellStyle} source={missImg} />;
    }
  })(shotResult);
  return cell;
};

BattleCellPure.propTypes = {
  shotResult: PropTypes.string.isRequired,
  actions: PropTypes.objectOf(PropTypes.func).isRequired,
  position: PropTypes.arrayOf(PropTypes.number).isRequired,
  width: PropTypes.number.isRequired,
};

const mapStateToProps = (state, { position }) => {
  const bc = state.battlefield[PositionToString(position)]; // battle cell
  return {
    shotResult: (bc === undefined && SHOTRESULT_WAITING) ||
      (!bc && SHOTRESULT_MISS) ||
      SHOTRESULT_HIT,
  };
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ Fire }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(BattleCellPure);
