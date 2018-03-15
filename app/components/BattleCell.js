import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Fire } from '../redux/actions';
import { PositionToString } from '../utils/mappers';
import { SHOTRESULT_HIT, SHOTRESULT_MISS, SHOTRESULT_WAITING } from '../utils/shotResults';
import { TouchableOpacity, View, Text, Image, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  cell: {
    backgroundColor: '#f8f8f8',
    borderWidth: 0.5,
    borderColor: '#cfcfcf'
  }
});
export const BattleCellPure = ({ shotResult, actions, position, width }) => {
  const widthStyle = { width, height: width };
  const cellStyle = [styles.cell, widthStyle];
  const cell = (r => {
    if (r === SHOTRESULT_WAITING) {
      return (
        <TouchableOpacity onPress={() => actions.Fire(position)}>
          <View style={cellStyle} />
        </TouchableOpacity>
      );
    } else if (r === SHOTRESULT_HIT) {
      return <Image style={cellStyle} source={require('../assets/Hit.png')} />;
    } else {
      return <Image style={cellStyle} source={require('../assets/Miss.png')} />;
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
