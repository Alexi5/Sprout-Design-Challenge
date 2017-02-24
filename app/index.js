//library dependencies
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import {Provider} from 'react-redux';
import axios from 'axios';

//store
import store from './store';

//components
import { Main } from './components/Main';

//reducers to fetch json data
import {fetchProcess} from './reducers/process'
import {fetchSteps} from './reducers/step'
import {fetchUsers} from './reducers/user'

//loads fetched data when page loads
const onMainEnter = function () {
  Promise.all([
      axios.get('/data/process.json'),
      axios.get('/data/steps.json'),
      axios.get('/data/users.json')
  ])
  .then(res => res.map(r => r.data))
  .then(([singleProcess, allSteps, allUsers]) => {
      store.dispatch(fetchProcess(singleProcess));
      store.dispatch(fetchSteps(allSteps));
      store.dispatch(fetchUsers(allUsers));
  })
};

//renders the main app with fetched data -- connected to static html file
ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path='/' component={Main} onEnter={onMainEnter}>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
);