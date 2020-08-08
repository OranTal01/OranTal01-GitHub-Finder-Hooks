import React from 'react';
import PropTypes from 'prop-types';

import Repo from '../repo/Repo';

const UserRepos = ({ repos }) => {
  return (
    <div>
      {repos.map((repo) => (
        <Repo key={repo.id} repo={repo} />
      ))}
    </div>
  );
};

UserRepos.propTypes = {
  repos: PropTypes.array.isRequired,
};

export default UserRepos;
