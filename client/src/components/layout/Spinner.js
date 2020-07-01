import React from 'react';
import spinner from './Spinner-1s-200px.gif';

const Spinner = () => {
  return (
    <>
      <img src={spinner} style={styles} alt='Loading ...' />
    </>
  );
};

const styles = {
  width: '200px',
  margin: 'auto',
  display: 'block',
};

export default Spinner;
