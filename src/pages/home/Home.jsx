import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import Users from '../../components/users/Users';
import Search from '../../components/search/Search';
import Notifications from '../../components/notifications/Notifications';

const Home = ({
  users,
  loading,
  toggleClearBtn,
  alert,
  searchUser,
  clearUser,
  closeNotification,
}) => {
  return (
    <Fragment>
      <Notifications alert={alert} closeNotification={closeNotification} />
      <Search
        searchUser={searchUser}
        toggleClearBtn={toggleClearBtn}
        clearUser={clearUser}
      />
      <Users users={users} loading={loading} />
    </Fragment>
  );
};

Home.propTypes = {
  users: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  toggleClearBtn: PropTypes.bool.isRequired,
  alert: PropTypes.object.isRequired,
};

export default Home;
