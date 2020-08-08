import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import axios from 'axios';

import Navbar from './components/navbar/Navbar.jsx';
import About from './pages/about/About.jsx';
import Home from './pages/home/Home.jsx';
import UserDetails from './components/user-details/UserDetails.jsx';

import './App.css';
export class App extends Component {
  state = {
    users: [],
    user: {},
    repos: [],
    loading: false,
    toggleClearBtn: false,
    alert: {},
  };

  componentDidMount() {
    this.getUsers();
  }

  // get random github users
  getUsers = async () => {
    this.setState({ loading: true });
    try {
      const res = await axios.get(
        `https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
      );
      this.setState({ users: res.data });
      this.setState({ loading: false });
    } catch (error) {
      throw new Error('Something wont wrong with fetch users github users');
    }
  };

  // search github user
  searchUser = async (text) => {
    if (!text) {
      this.setState({ alert: { msg: 'Please enter text', type: 'danger' } });
      setTimeout(() => {
        this.setState({ alert: {} });
      }, 5000);
    } else {
      this.setState({ loading: true });
      this.setState({ toggleClearBtn: true });

      const res = await axios.get(
        `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
      );
      this.setState({ users: res.data.items });
      this.setState({ loading: false });
    }
  };

  //get github user details
  getUserDetails = async (userName) => {
    this.setState({ loading: true });

    try {
      const res = await axios.get(
        `https://api.github.com/users/${userName}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
      );

      this.setState({ user: res.data });
    } catch (error) {
      throw new Error('Something wont wrong with get user bio');
    }
    this.setState({ loading: false });
  };

  //get github user repos
  getUserRepos = async (userName) => {
    this.setState({ loading: true });

    try {
      const res = await axios.get(
        `https://api.github.com/users/${userName}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
      );
      this.setState({ repos: res.data });
    } catch (error) {
      throw new Error('Something wont wrong with get user repos');
    }

    this.setState({ loading: false });
  };

  // get random github users
  clearUser = () => {
    this.getUsers();
    this.setState({ toggleClearBtn: false });
  };

  closeNotification = () => {
    this.setState({ alert: {} });
  };

  render() {
    const { users, user, loading, toggleClearBtn, alert, repos } = this.state;
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
                    closeNotification={this.closeNotification}
                    searchUser={this.searchUser}
                    clearUser={this.clearUser}
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
                    searchUser={this.getUserDetails}
                    getUserRepos={this.getUserRepos}
                  />
                )}
              />
              <Route exact path='/about' component={About} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
