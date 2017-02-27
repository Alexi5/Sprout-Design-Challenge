import React, {Component} from 'react';
import {connect} from 'react-redux';
import StepDetail from './StepDetail'

import { updateProcessName, updateProcessDescription } from '../reducers/process';

class Process extends Component {
  constructor(props) {
    super(props);
    this.state = {
        isEditing: false,
        showProcessDetails: true,
        displayName: '',
        description: ''
    }
    this.toggleEditing = this.toggleEditing.bind(this)
    this.renderProcessInput = this.renderProcessInput.bind(this)
    this.setProcessName = this.setProcessName.bind(this)
    this.setProcessDescription = this.setProcessDescription.bind(this)
  }

  //helper to check if box is in edit mode
  toggleEditing(edit){
    this.setState({isEditing: edit})
  }

  //renders the input box change / static input 
  renderProcessInput(field, selectedProcess){
    if(field === 'displayName'){
      if(this.state.isEditing){
        return(
          <div>
            <div className="process-input">
              <label htmlFor='displayName' style={{color: '#808080'}}>Edit Name</label>
              <input 
                type="text" 
                name={field}
                className="form-control"
                defaultValue={selectedProcess.displayName}
                onChange={e => this.editProcess(field, e)}
              />
            </div>
            <button onClick={e => this.setProcessName(e)}>Save</button>
          </div>
        ) 
      }
      else {
        return(
          <div className="process-input">
            <div onClick={() => this.toggleEditing(true)}>Edit Name</div>
            <h5>{selectedProcess.displayName}</h5>
          </div>
        ) 
      }
    }
    else {
      if(this.state.isEditing){
        return(
          <div>
            <div className="process-input">
            <label htmlFor='displayDescription' style={{color: '#808080'}}>Edit Description</label>
              <input 
                type="text" 
                name={field}
                className="form-control"
                defaultValue={selectedProcess.description}
                onChange={e => this.editProcess(field, e)}
              />
            </div>
            <button onClick={e => this.setProcessDescription(e)}>Save</button>
          </div>
        ) 
      }
      else{
        return(
          <div className="process-input">
            <div onClick={() => this.toggleEditing(true)}>Edit Description</div>
            <h5>{selectedProcess.description}</h5>
          </div>
        )  
      }
    }
  }

  //handles input change into the text boxes
  editProcess(field, e) {
    this.setState({
      [field]: e.target.value 
    });
  }

  //sets the new process name
  setProcessName(e){
    e.preventDefault(); 
    this.props.updateProcessName(this.state.displayName)
    this.setState({ isEditing: false })
  }

  //sets the process description
  setProcessDescription(e){
    e.preventDefault(); 
    this.props.updateProcessDescription(this.state.description )
    this.setState({ isEditing: false })
  }

  render() {
    //TO DO: include warning / check and conditions for empty input boxes

    let selectedProcess = this.props.process
    let numberSteps = this.props.allSteps.length;

    if(this.props.process) {

      return (
        <div>
          <div className="process-details">
            <p>click field heading to edit field</p>
            <br/>
            <div className="process-input">
              {this.renderProcessInput('displayName', selectedProcess)}
            </div>
            <br/>

            <div className="process-input">
              {this.renderProcessInput('description', selectedProcess)}
            </div>
            <br/>

            <div className="process-view">
              <label style={{color: '#808080'}}>Owner/Creator</label>
              <span>{selectedProcess.owner}</span>
            </div>
            <br/>

            <div className="process-view">
              <label style={{color: '#808080'}}>Category</label>
              <span>{selectedProcess.category}</span>
            </div>
            <br/>

            <div className="process-view">
              <label style={{color: '#808080'}}>Number of Steps</label>
              <span>{numberSteps}</span>
            </div>
            <hr/>          
          </div>

          <div style={{background: '#fff', padding: 20}}>
            <StepDetail />
          </div>
        </div>
      )
    }
    else return (<div>Loading...</div>);
  }
}

const mapStateToProps = (state) => {
  return {
    process: state.processes,
    allSteps: state.steps.allSteps
  };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    updateProcessName(value) {
      dispatch(updateProcessName(value));
    },
    updateProcessDescription(value) {
      dispatch(updateProcessDescription(value));
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Process);
