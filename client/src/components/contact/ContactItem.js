import React from 'react';
import PropTypes from 'prop-types';
import ContactContext from '../../context/contact/ContactContext';
import { useContext } from 'react';

const ContactItem = ({ contact }) => {
  const { _id, name, email, phone, type } = contact;

  const contactContext = useContext(ContactContext);

  const { deleteContact, setCurrent, clearCurrent } = contactContext;

  const onDelete = () => {
    deleteContact(_id);
    clearCurrent();
  };

  const onEdit = () => {
    setCurrent(contact);
  };

  return (
    <div className='card bg-light'>
      <h3 className='text-primary text-left'>
        {name}{' '}
        <span
          style={{ float: 'right' }}
          className={
            'badge ' +
            (type === 'professional' ? 'badge-success' : 'badge-primary')
          }>
          {/* {`${[...type].shift().toUpperCase() + type.substr(1)}`} */}
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </span>
      </h3>

      <ul className='list'>
        {email && (
          <li>
            <i className='fas fa-envelope-open'></i> {email}
          </li>
        )}
        {phone && (
          <li>
            <i className='fas fa-phone'></i> {phone}
          </li>
        )}
      </ul>

      <p>
        <button
          className='btn btn-dark btn-sm'
          // onClick={() => setCurrent(contact)}
          onClick={onEdit}>
          Edit
        </button>
        <button
          className='btn btn-danger btn-sm'
          // onClick={() => deleteContact(id)}
          onClick={onDelete}>
          Delete
        </button>
      </p>
    </div>
  );
};

ContactItem.prototype = {
  contact: PropTypes.object.isRequired,
};

export default ContactItem;
