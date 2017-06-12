import PropTypes from 'prop-types';

const enhandcePropTypes = {
  Nullable: func => PropTypes.oneOfType([PropTypes.oneOf([null]), func]),
  AllowUndefined: func => PropTypes.oneOfType([PropTypes.oneOf([undefined]), func])
};
export default enhandcePropTypes;