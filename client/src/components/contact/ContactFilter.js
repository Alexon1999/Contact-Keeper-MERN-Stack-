import React, { useState, useContext, useRef, useEffect } from 'react';
import ContactContext from '../../context/contact/ContactContext';

const ContactFilter = () => {
  const contactContext = useContext(ContactContext);
  const inputText = useRef('');

  const { filterContacts, clearFilter, filtered } = contactContext;

  useEffect(() => {
    if (filtered === null) {
      inputText.current.value = '';
    }
  });

  const onFilter = (e) => {
    if (inputText.current.value !== '') {
      // filterContacts(inputText.current.value);//// pareil
      filterContacts(e.target.value);
    } else {
      clearFilter();
    }
  };

  return (
    <form>
      <input
        ref={inputText}
        type='text'
        placeholder='Filter Contacts...'
        onChange={onFilter}
      />
    </form>
  );
};

export default ContactFilter;
