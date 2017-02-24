import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Collapse} from 'react-bootstrap';

import { updateStepName, updateStepDescription } from '../reducers/step';
import { updateUserList } from '../reducers/user'

class StepDetail extends Component {
  constructor(props) {
      super(props);
      this.state = {
        isEditing: false,
        showProcessDetails: true,
        displayName: '',
        description: '',
        addedUser: '',
        allUsers: ''
      }

      this.toggleEditing = this.toggleEditing.bind(this)
      this.editAssignedUsers = this.editAssignedUsers.bind(this)
      this.toggleEditing = this.toggleEditing.bind(this)
      this.renderStepInput = this.renderStepInput.bind(this)
      this.setStepName = this.setStepName.bind(this)
      this.setStepDescription = this.setStepDescription.bind(this)
  }

  displayFieldChoices(fields){
    return(
      <div>
        {
          fields && fields.map((field, id) => {
            return (
              <div key={id}>
                {(field.displayName)}
              </div>
            )
          })   
        }
      </div>
    )
  }

  displayDependencies(dependencies){
    return(
      <div>
        {
          dependencies && dependencies.map((dependencie, id) => {
            return (
              <div key={id}> {dependencies} </div>
            )
          })   
        }
      </div>
    )
  }

  displayAssignedUsers(users){
    return(
      <div>
        {
          users.map((user) => {
            return (
              <div key={user.userID}>
               {user.username}
              </div>
            )
          })   
        }
      </div>
    )
  }

  toggleEditing(edit){
    this.setState({isEditing: edit})
  }

  //updating assigned users
  editAssignedUsers(users){
    if(this.state.isEditing){
      return(
        <div>
          <div className="process-input">
            <input 
              type="text" 
              className="form-control"
              label='enter user'
              onChange={e => this.editUsers(e)}
            />
          </div>
          <button onClick={e => this.setUsersList(e)}>Save</button>
        </div>
      )
    }
    else {
      if(users.length === 0){
        return(
          <div className="process-input">
            <p style={{fontStyle: 'italic'}}>Currently No Assigned Users. Available assignees: </p>
            <span onClick={() => this.toggleEditing(true)}>{this.displayAssignedUsers([...this.props.users])}</span>
          </div>
        ) 
      }
      else{
        return(
          <div className="process-input">
            <span onClick={() => this.toggleEditing(true)}>{this.displayAssignedUsers(users)}</span>
          </div>
        ) 
      }
    }
  }

  editUsers(e) {
    this.setState({ addedUser: e.target.value });
  }

  setUsersList(e){
    e.preventDefault(); 
    let newUser = {};
    newUser.username = this.state.addedUser;
    
    let usersList = Object.assign({}, this.props.users, newUser);
    
    this.props.updateUserList(newUser)
    this.setState({ isEditing: false })
  }

  /// updating displayName and description
  renderStepInput(field, step){
    if(field === 'displayName'){
      if(this.state.isEditing){
        return(
          <div>
            <div className="process-input">
              <input 
                type="text" 
                name={field}
                className="form-control"
                defaultValue={step.displayName}
                onChange={e => this.editStep(field, e)}
              />
              <label htmlFor='name' style={{color: '#808080'}}>{step.stepName}</label>
            </div>
            <button onClick={e => this.setStepName(e)}>Save</button>
          </div>
        ) 
      }
      else {
        return(
          <div className="process-input">
            <h3 onClick={() => this.toggleEditing(true)}>{step.displayName}</h3>
            <span>{step.stepName}</span>
          </div>
        ) 
      }
    }
    else {
      if(this.state.isEditing){
        return(
          <div>
            <div className="process-input">
              <input 
                type="text" 
                name={field}
                className="form-control"
                defaultValue={step.description}
                onChange={e => this.editStep(field, e)}
              />
              <p style={{color: '#808080'}}>This will be shown to the user when they are assigned this step as a task</p>
            </div>
            <button onClick={e => this.setStepDescription(e)}>Save</button>
          </div>
        ) 
      }
      else{
        return(
          <div className="process-input">
            <h4 onClick={() => this.toggleEditing(true)}>Instructions</h4>
            <span>{step.description}</span>
          </div>
        )  
      }
    }
  }

   //handles input change into the text boxes
  editStep(field, e) {
    this.setState({
      [field]: e.target.value 
    });
  }

  // edit the step name 
  setStepName(e){
    e.preventDefault(); 
    this.props.updateStepName(this.state.displayName)
    this.setState({ isEditing: false })
  }

  //sets the process description
  setStepDescription(e){
    e.preventDefault(); 
    this.props.updateStepDescription(this.state.description )
    this.setState({ isEditing: false })
  }

  render() {

    //TO DO: include warning / check and conditions for empty input boxes

    if (this.props.allSteps.length && this.props.selectedStep) {
      
      let step = this.props.allSteps[this.props.selectedStep - 1];
      let assignedUsers = step.role.users

      return (
        <div className="step-details">  
          {/*Step name and descriptoin - can edit*/}
            <div className="step-input">
              {this.renderStepInput('displayName', step)}
            </div>
            <br/>

            <div className="step-input">
              {this.renderStepInput('description', step)}
            </div>
            <br/>
          
          {/*Other info */}
            <h3 style={{color: '#808080'}}>Configuration Settings</h3>
            <div className="step-view">
              <label>Dependencies</label>
              <span>{this.displayDependencies(step.requiredPreviousSteps)}</span>
            </div>
            <br/>

            <div className="step-view">
              <label>Conditions</label>
              <span>{step.category}</span>
            </div>
            <br/>

            <div className="step-view">
              <label>Fields</label>
              <span>{this.displayFieldChoices(step.fields)}</span>
            </div>
            <br/>

            <div className="step-input">
              <label>Assigned Users</label>
              {this.editAssignedUsers(assignedUsers)}
            </div>
            <br/>
            <br/>
        </div>
      )
    }
    else return (<div>No Steps</div>)
  }
}

const mapStateToProps = (state) => {
    return {
        allSteps: state.steps.allSteps,
        selectedStep: state.steps.selectedStep,
        users: state.users.allUsers
    };
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateStepName(value) {
      dispatch(updateStepName(value));
    },
    updateStepDescription(value) {
      dispatch(updateStepDescription(value));
    },
    updateUserList(user) {
      let newUser = {}
      dispatch(updateUserList(user))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StepDetail);

