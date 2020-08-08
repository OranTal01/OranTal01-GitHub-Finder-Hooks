import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Search = ({ setAlert, searchUser, clearUser, toggleClearBtn }) => {
  const [text, setText] = useState('');

  const handleChangeText = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimText = text.trim();
    if (!trimText) {
      setAlert('Please enter text', 'danger');
    } else {
      searchUser(text);
      setText('');
    }
  };

  const handleClearBtn = () => {
    clearUser();
  };

  return (
    <div>
      <form className='form' onSubmit={handleSubmit}>
        <input
          type='text'
          name='text'
          value={text}
          placeholder='Search User...'
          onChange={handleChangeText}
        />
        <button className='btn btn-dark btn-block'>Search</button>
      </form>
      {toggleClearBtn && (
        <button className='btn btn-light btn-block' onClick={handleClearBtn}>
          Clear
        </button>
      )}
    </div>
  );
};

Search.propTypes = {
  searchUser: PropTypes.func.isRequired,
  clearUser: PropTypes.func.isRequired,
  toggleClearBtn: PropTypes.bool.isRequired,
  setAlert: PropTypes.func.isRequired,
};

export default Search;
