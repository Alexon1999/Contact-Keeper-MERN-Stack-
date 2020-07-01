import React, { useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';
import AlertContext from './AlertContext';
import AlertReducer from './AlertReducer';

import { SET_ALERT, REMOVE_ALERT } from '../types';

const AlertState = ({ children }) => {
  const initialState = []; // array of objects (contains msg , type)

  const [state, dispatch] = useReducer(AlertReducer, initialState);

  // + Set Alert
  const setAlert = (msg, type, timeout = 5000) => {
    const id = uuidv4();
    dispatch({
      type: SET_ALERT,
      payload: {
        msg,
        type,
        id,
      },
    });

    setTimer(dispatch, id, timeout);
  };

  return (
    <AlertContext.Provider value={{ alerts: state, setAlert }}>
      {children}
    </AlertContext.Provider>
  );
};

export default AlertState;

//*  ctrl + .   : extract things to new function
function setTimer(dispatch, id, timeout) {
  setTimeout(() => {
    dispatch({
      type: REMOVE_ALERT,
      payload: id,
    });
  }, timeout);
}
