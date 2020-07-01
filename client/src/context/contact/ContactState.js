import React, { useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

import ContactContext from './ContactContext';
import contactReducer from './ContactReducer';
import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER,
  CLEAR_CURRENT,
  CONTACT_ERROR,
  GET_CONTACTS,
  CLEAR_CONTACTS,
} from '../types';

const ContactState = ({ children }) => {
  // + all data will be filled by a request to back-and server
  const initialState = {
    // contacts: [
    //   // {
    //   //   id: 1,
    //   //   name: 'jil Johnson',
    //   //   email: 'jmail@gmail.com',
    //   //   phone: '1131-45166',
    //   //   type: 'personal',
    //   // },
    //   // {
    //   //   id: 2,
    //   //   name: 'Watson',
    //   //   email: 'watson@gmail.com',
    //   //   phone: '1131-45166',
    //   //   type: 'professional',
    //   // },
    //   // {
    //   //   id: 3,
    //   //   name: 'David curry',
    //   //   email: 'david@gmail.com',
    //   //   phone: '1131-45166',
    //   //   type: 'personal',
    //   // },
    // ],

    contacts: null,
    current: null,
    filtered: null,
    error: null,
    loading: true,
  };

  const [state, dispatch] = useReducer(contactReducer, initialState);

  // + Get Contacts
  const getContacts = async () => {
    try {
      const res = await axios.get('/api/contacts');

      dispatch({ type: GET_CONTACTS, payload: res.data });
    } catch (err) {
      dispatch({ type: CONTACT_ERROR, payload: err.response.data.msg });
    }
  };

  // + Add contact
  const addContact = async (contact) => {
    // contact.id = uuidv4();
    // dispatch({ type: ADD_CONTACT, payload: contact });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const res = await axios.post('/api/contacts', contact, config);

      console.log(res.data._id);

      dispatch({ type: ADD_CONTACT, payload: res.data });
    } catch (err) {
      dispatch({ type: CONTACT_ERROR, payload: err.response.data.errors });
    }
  };

  //+ Delete contact
  const deleteContact = async (id) => {
    try {
      const res = await axios.delete(`/api/contacts/${id}`);

      dispatch({ type: DELETE_CONTACT, payload: id });
    } catch (err) {
      dispatch({ type: CONTACT_ERROR, payload: err.response.data.msg });
    }
  };

  // + Update contact
  const updateContact = async (contact) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const res = await axios.put(
        `/api/contacts/${contact._id}`,
        contact,
        config
      );

      dispatch({
        type: UPDATE_CONTACT,
        payload: res.data,
      });
    } catch (err) {
      dispatch({ type: CONTACT_ERROR, payload: err.response.data.msg });
    }

    dispatch({
      type: UPDATE_CONTACT,
      payload: contact,
    });
  };

  // + Clear Contacts
  const clearContacts = () => {
    dispatch({ type: CLEAR_CONTACTS });
  };

  // + Set Current Contact
  const setCurrent = (currentContact) => {
    dispatch({ type: SET_CURRENT, payload: currentContact });
  };

  // + Clear Current contact
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };

  // + Filter Contacts
  const filterContacts = (text) => {
    dispatch({
      type: FILTER_CONTACTS,
      payload: text,
    });
  };

  // + Clear Filter
  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER });
  };

  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts, //* state : on utilise pas initialstate , on veut le state vient de state par reducer
        error: state.error,
        current: state.current,
        filtered: state.filtered,
        loading: state.loading,
        getContacts,
        addContact,
        deleteContact,
        updateContact,
        setCurrent,
        clearCurrent,
        filterContacts,
        clearFilter,
        clearContacts,
      }}>
      {children}
    </ContactContext.Provider>
  );
};

export default ContactState;
