import React, { Component } from 'react';
import PropTypes from 'prop-types';
import util from '../lib/util';
const PlayerCell = props => {
  const { player } = props;
  return (
    <td className={util.className(['text-center', {
      active: player.name === 'N/A',
      danger: !player.gender && player.seedIndex === void 0,
      info: player.gender && player.seedIndex === void 0 && player.name !== 'N/A',
      warning: player.seedIndex !== void 0
    }])}>{player.name}{player.seedIndex !== void 0 && `(${player.seedIndex})`}</td>
  );
};
PlayerCell.propTypes = {
  player: PropTypes.object.isRequired
};
export default PlayerCell;