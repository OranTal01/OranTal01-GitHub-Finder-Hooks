import React, { Fragment } from 'react';

import spinner from '../../assets/spinner.gif';

import './spinner.scss';

const Spinner = (_) => {
  return (
    <Fragment>
      <img className='spinner' src={spinner} alt='Loading...' />
    </Fragment>
  );
};

export default Spinner;
