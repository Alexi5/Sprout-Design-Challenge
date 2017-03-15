//library dependencies
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import {Provider} from 'react-redux';
import axios from 'axios';

//store
import store from './store';

//components
import Form from './components/Form';
import AllPlans from './components/AllPlans';
import DeluxePlanDetails from './components/DeluxePlanDetails';
import TeamPlanDetails from './components/TeamPlanDetails';
import PremiumPlanDetails from './components/PremiumPlanDetails';
import EnterprisePlanDetails from './components/EnterprisePlanDetails';

//reducers
import {fetchLogos, fetchIcons} from './reducers/assets'
import {getAllPlans, getSinglePlan} from './reducers/plans';
import { planDataObj } from './utils'

const onMainEnter = function () {
  store.dispatch(getAllPlans(planDataObj))
};

const onPlanEnter = function (nextRouterState) {
  const plan = nextRouterState.params.plan;
  store.dispatch(getSinglePlan(plan));
};

//renders the main app with fetched data -- connected to static html file
ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path='/' component={Form} onEnter={onMainEnter}></Route>
      <Route path='/plans' component={AllPlans}></Route>
        {/*<Route path='/plans/:planName' component={PlanDetail}> </Route>*/}
      <Route path='/plans/Deluxe' component={DeluxePlanDetails}> </Route>
      <Route path='/plans/Team' component={TeamPlanDetails}> </Route>
      <Route path='/plans/Premium' component={PremiumPlanDetails}> </Route>
      <Route path='/plans/Enterprise' component={EnterprisePlanDetails}> </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
);


