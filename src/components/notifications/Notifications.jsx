import React from 'react';
import PropTypes from 'prop-types';

import './notifications.scss';

const Notifications = (props) => {
  const { alert } = props;
  return (
    <div>
      {(alert.msg || alert.type) && (
        <div className={`alert alert-${alert.type}`}>
          <div className='notification-container'>
            <i className='fas fa-info-circle'>{alert.msg}</i>
            <i
              className='fas fa-times close-btn'
              onClick={() => props.closeNotification()}
            ></i>
          </div>
        </div>
      )}
    </div>
  );
};

Notifications.propTypes = {
  alert: PropTypes.object.isRequired,
};

export default Notifications;
