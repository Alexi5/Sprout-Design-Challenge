import React, {Component} from 'react';
import { planDataObj } from '../utils'
import {Link} from 'react-router';
import Navbar from './Nav'

class AllPlans extends Component {

  constructor(props){
      super(props);
      this.state = {
          plans: []
      };

      this.loadAllPlans = this.loadAllPlans.bind(this)
  }

  componentDidMount(){
      const data = [];
      let planObj = {};

      planDataObj && Object.values(planDataObj).map( (plan, i) => {
        let key = Object.keys(planDataObj)[i]
        let val = planDataObj[key]

        planObj[key] = val;
        data.push(planObj)
      })

      this.setState({plans: planObj});
  }

  loadAllPlans(plans){
    console.log(plans)
    return(
      <div className="all-plans-row">
      {
        plans && Object.values(plans).map( (plan, i) => {
          let planName = Object.keys(plans)[i]
          return (
            <div key={i} className="plan-list-col">
              <Link to={`/plans/${planName}`}>
                <div className="plan-col-head">
                  <h2>
                    {planName}
                  </h2>
                </div>
                <p>${plan.values.costPerMonth} PER USER/MONTH</p>
                <span>{plan.headline}</span>
              </Link>
              
              <button className="plan-list-button">
                <a href="https://app.sproutsocial.com/signup/start/deluxe_v5">Start My Free Trail</a>
              </button>

            </div>
          )  
        })
      }
      </div>
    )
  }

  render(){
    let availablePlans = this.state.plans
    return (
      <div>
        <div className="fixed-nav-allplans">
          <Navbar />
        </div>
        <div className="main-body-allplans">
          <div className="all-plans-container">
            {this.loadAllPlans(availablePlans)}
          </div>
        </div>
      </div>
    );
  }
}

export default AllPlans