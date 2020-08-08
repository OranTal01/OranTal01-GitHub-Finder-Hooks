import React from 'react';
import PropTypes from 'prop-types';

import Spinner from '../spinner/Spinner';

import './users.scss';

import User from '../user/User';

const Users = ({ users, loading }) => {
  if (loading) return <Spinner />;

  return (
    <div>
      <div className='users-continuer'>
        {users.map((user) => (
          <User key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
};

Users.propTypes = {
  users: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default Users;
