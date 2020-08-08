import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const User = ({ user: { login, avatar_url } }) => {
  return (
    <div className='card text-center'>
      <img
        src={avatar_url}
        alt='github user avatar'
        className='round-img'
        style={{ width: '60px' }}
      />
      <h3>{login}</h3>

      <div>
        <Link to={`/user/${login}`} className='btn btn-dark btn-sm my-1'>
          More
        </Link>
      </div>
    </div>
  );
};

User.protoTypes = {
  user: PropTypes.object.isRequired,
};

export default User;
