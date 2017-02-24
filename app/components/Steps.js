import React, {Component} from 'react';
import { connect } from 'react-redux';
import {fetchSingleStep} from '../reducers/step'


class Steps extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSteps: true  //for toggle between trigger and steps
    }
  }

  //returns number of dependencies
  getDependentSteps(step){
    let dependentSteps = [];

    if(step.requiredPreviousSteps.length > 0){
      step.requiredPreviousSteps.map( dependent => { 
        this.props.allSteps.map( step => {
            if(step.stepName === dependent){
              dependentSteps.push(step.stepNumber)
            }
        })
      })
    }
    return dependentSteps
  }

  //checks for any list dependencies
  checkForDependencies(step){
    if(step.requiredPreviousSteps.length) 
      return(<p className="sideList">depends on steps: {this.getDependentSteps(step)} </p> ) 
    else 
      return null 
  }

  //checks for assigned users of each step
  checkForAssignedUsers(step){
    let users = step.role.users;
    if(users.length)
      return (<p className="sideList"> assigned to {step.role.users.join(", ")}</p>)
    else 
      return null
  }

  //displays the list
  displayListItem(step){
    return(
      <div>
        <li className="step-list-item" key={step.stepNumber} onClick={e => this.props.fetchSingleStep(step)}>
          <p>{step.displayName}</p>
          {this.checkForDependencies(step)}
          {this.checkForAssignedUsers(step)}
        </li>
      </div>
    )
  }

  render() {
    return (
      <div className="col-md-3">
    
        <div className="toggle">
          <div className="toggleItem">TRIGGERS</div>
          <div className="toggleItem">STEPS</div>
        </div>

        <div className="list-container">
          <ol>
            { 
              this.props.allSteps && this.props.allSteps.map( (step, id) => {
                return (
                  <div key={id}>
                    {this.displayListItem(step)}
                    <hr/>
                  </div>
                )
              })
            }
          </ol> 
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    allSteps: state.steps.allSteps,
    users: state.users.allUsers
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchSingleStep: function(step){
      dispatch(fetchSingleStep(step));
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Steps);

