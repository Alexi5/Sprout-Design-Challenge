import React from 'react';
import {Link} from 'react-router'
import { connect } from 'react-redux'

import { planDataObj } from '../utils'
import Navbar from './Nav'


class SelectedPlan extends React.Component {

  constructor(props){
      super(props);

      this.state = {
        planName: '',
        selectedPlan: {}
      }
  }

  render(){
    let name, selectedPlan, planDetails;
    let keys=[], vals = [];

    planDataObj && Object.keys(planDataObj).map( (plan, i) =>{
      if(plan === "Premium"){
        name = plan;
        selectedPlan = planDataObj[name];
        planDetails = selectedPlan.details
      }
    })

    planDetails && Object.values(planDetails).map( (detail, i) => {
      let key = Object.keys(planDetails)[i]
      keys.push(key)
      vals.push(planDetails[key])
    })


    return (
      <div>
        <div className="fixed-nav-selectedPlan">
          <Navbar />
        </div>

        <div className="main-body">

          <div className="plan-container">        
            <div className="plan-header">
                 <h2>The plan that's right for you is...</h2>
                 <h1>{name}</h1>
                 <h3>${selectedPlan.values.costPerMonth} per user/month </h3>
            </div>
            <br/>

            <div className="plan-details">
              {
                keys && keys.map( (key, i) => {
                  return(
                    <div className="detail-row" key={i}>
                      <div className="details-key">{key} </div>
                    </div>
                  )
                })
              }
              {
                vals && vals.map( (val, i) => {
                  return(
                    <div className="detail-row" key={i}>
                      <div className="details-val">{val} </div>
                    </div>
                  )
                })
              }
            </div>  
            <br/>

            <div className="next-steps-info">
              <h2>All Plans Include a Free 30-Day Trail</h2>
              <p>Best-in-class social media management and engagement software. Change plans or cancel at anytime.</p>
            </div>

          </div>
          
        </div>
        <div className="next-steps">
          <button className="free-trial-button">
            <a href="https://app.sproutsocial.com/signup/start/deluxe_v5">Start My Free Trail</a>
          </button>
          <br/>
          <button className="compare-plans-button">
            <a href="http://sproutsocial.com/pricing">Compare Plans</a>
          </button>
        </div>

      </div>
    ) 
  }
}

const mapStateToProps = (state) => {
  return { };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return { };
};

export default connect(mapStateToProps, mapDispatchToProps)(SelectedPlan);

;
