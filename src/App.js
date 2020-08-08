import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import axios from 'axios';

import Navbar from './components/navbar/Navbar.jsx';
import About from './pages/about/About.jsx';
import Home from './pages/home/Home.jsx';
import UserDetails from './components/user-details/UserDetails.jsx';

import './App.css';
const App = (_) => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [toggleClearBtn, setToggleClearBtn] = useState(false);
  const [alert, setAlert] = useState({});

  useEffect(() => {
    getUsers();
  }, []);

  // get random github users
  const getUsers = async () => {
    setLoading(true);

    try {
      const res = await axios.get(
        `https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
      );
      setUsers(res.data);
      setLoading(false);
    } catch (error) {
      throw new Error('Something wont wrong with fetch users github users');
    }
  };

  //set alert
  const showAlert = (msg, type) => {
    setAlert({ msg, type });
    setTimeout(() => {
      setAlert({});
    }, 5000);
  };

  // search github user
  const searchUser = async (text) => {
    setLoading(true);
    setToggleClearBtn(true);
    try {
      const res = await axios.get(
        `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
      );
      setUsers(res.data.items);
    } catch (error) {
      throw new Error('Something wont wrong with search user');
    }
    setLoading(false);
  };

  //get github user details
  const getUserDetails = async (userName) => {
    setLoading(true);

    try {
      const res = await axios.get(
        `https://api.github.com/users/${userName}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
      );
      setUser(res.data);
    } catch (error) {
      throw new Error('Something wont wrong with get user bio');
    }
    setLoading(false);
  };

  //get github user repos
  const getUserRepos = async (userName) => {
    setLoading(true);

    try {
      const res = await axios.get(
        `https://api.github.com/users/${userName}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
      );
      setRepos(res.data);
    } catch (error) {
      throw new Error('Something wont wrong with get user repos');
    }
    setLoading(false);
  };

  // get random github users
  const clearUser = () => {
    getUsers();
    setToggleClearBtn(false);
  };

  const closeNotification = () => {
    setAlert({});
  };

  return (
    <div>
      <Router>
        <Navbar title={'GitHub Finder'} icon={'fab fa-github'} />
        <div className='container'>
          <Switch>
            <Route
              exact
              path='/'
              render={(props) => (
                <Home
                  users={users}
                  loading={loading}
                  toggleClearBtn={toggleClearBtn}
                  alert={alert}
                  closeNotification={closeNotification}
                  searchUser={searchUser}
                  clearUser={clearUser}
                  setAlert={showAlert}
                  {...props}
                />
              )}
            />
            <Route
              exact
              path='/user/:login'
              render={(props) => (
                <UserDetails
                  user={user}
                  loading={loading}
                  repos={repos}
                  {...props}
                  searchUser={getUserDetails}
                  getUserRepos={getUserRepos}
                />
              )}
            />
            <Route exact path='/about' component={About} />
          </Switch>
        </div>
      </Router>
    </div>
  );
};

export default App;
