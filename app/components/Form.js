import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link, Router, Route, browserHistory } from 'react-router';

import store from '../store.js';

import {getRecommendedPlan} from '../utils.js';
import {getAllPlans, getSinglePlan} from '../reducers/plans.js';

import Navbar from './Nav'
import Modal from 'react-modal';

let LogoImg = require('../assets/01_Logo/01_Lockup/01-sprout-social-logo-lockup-MAIN.png');


class PlanForm extends React.Component {

  constructor(props){

      super(props);

      this.state = {
        socialProfiles: '',
        audience: '',
        users: '',
        selectedPlan: '',
        modalIsOpen: false,
        dirty: false
      }

      this.handleChange=this.handleChange.bind(this)
      this.handleSubmit=this.handleSubmit.bind(this)
      this.openModal = this.openModal.bind(this);
      this.closeModal = this.closeModal.bind(this);
  }

  ComponentWillMount(){
    this.setState({selectedPlan: ''})
  }

  handleChange(field, event){
    this.setState({
        [field]: event.target.value, 
        dirty: true
    })
  }

  handleSubmit(event){
    event.preventDefault(); 
    let recommendedPlan = getRecommendedPlan()

    this.setState({
      selectedPlan: recommendedPlan
    })

    this.openModal()

    //reset local state
    this.setState({
      socialProfiles: '', 
      audience: '', 
      users: '',
      dirty: false
    })
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  render() {

    let socialProfiles = this.state.socialProfiles;
    let audience = this.state.audience;
    let users = this.state.users;
    let warning = '';

    if( (!socialProfiles || !audience || !users) && this.state.dirty) {
        warning = 'please fill in blank field'
    }

    return (
      <div id="main">
        <div className="fixed-nav-selectedPlan">
          <Navbar />
        </div>
        <br/>
        <div className="main-body">
          <div className="container">         
          {/*Form Header*/}
          <div className="header">
            <div className="col-md-6"> 
              <img src={LogoImg}/>
            </div>
          
            <div className="col-md-6">
              <h2>Find the Sprout Social plan that's right for you.</h2>
            </div>
          </div>

          {/*Form Inputs*/}
          <div className="form-container">
            {/* warning && <div className="alert alert-warning">{warning}</div> */}
            <form id="form" onSubmit={this.handleSubmit.bind(this)}>
              <div className="form-question-profiles">
                <label className="profiles-label" htmlFor="socialProfiles">
                  How many social profiles do you manage?</label>
                <div className="social-input">
                  <span>Social Profiles: </span>
                  <input  
                     className="input-box"
                     type="text" 
                     name="socialProfiles"
                     value={socialProfiles} 
                     onChange={e => this.handleChange('socialProfiles', e)} />
                </div>
              </div>

              <div className="form-question-audience">
                <label className="audience-label" htmlFor="audience">
                  How many followers do your social profiles have?</label>
                <div className="input">
                  <span>Fans/Followers: </span>
                  <input  
                   className="input-box"
                   type="text" 
                   name="audience"
                   value={audience}
                   onChange={e => this.handleChange('audience', e)} />
                </div>
              </div>

              <div className="form-question-users">
                <label className="users-label" htmlFor="users">
                  How many people are on your social media team?</label>
                <div className="input">
                  <span>Users: </span>
                  <input  
                   className="input-box"
                   type="text" 
                   name="users"
                   value={users}
                   onChange={e => this.handleChange('users', e)} />
                </div>
              </div>
              {/*Form Submit Button*/}
              <div className="footer">
                <button className="find-plan-link" onClick={this.handleSubmit}> 
                   Find My Plan >
                </button>
              </div>
            </form>
            
            <div className="modal-style">
              <Modal
                isOpen={this.state.modalIsOpen}
                onAfterOpen={this.afterOpenModal}
                onRequestClose={this.closeModal}
                style={modalStyle}
                contentLabel="modal-style"
              >

                <h2 style={modalStyle.headTwo}>RECOMMENDED PLAN</h2>
                <h1 style={modalStyle.headOne}>{this.state.selectedPlan}</h1>
                <div style={modalStyle.buttonContainer}>
                  <button style={modalStyle.button}>
                    <Link to={`/plans/${this.state.selectedPlan}`}>
                      More Details
                    </Link>
                  </button>
                  <button style={modalStyle.button} onClick={this.closeModal}>close</button>
                </div>
              </Modal>
            </div>

          </div>
          <br/>

        </div>
        </div>
      </div>
    )
  }
};

const modalStyle = {
  content : {
    top :'50%',
    left :'50%',
    right : 'auto',
    bottom :'auto',
    marginRight :'-50%',
    padding: '5%',
    transform :'translate(-50%, -50%)',
    alignItems: 'center' 
  },
  headTwo: {
    fontSize: '16px'
  },
  headOne: {
    fontWeight: 'bold',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  button: {
    flex: 0.5,
  }
};

const mapStateToProps = (state) => {
  return { 
    allPlans: state.plans.allPlans,
    selectedPlan: state.plans.selectedPlan
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return { 
    getAllPlans: function(){
      return dispatch(getAllPlans())
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PlanForm);



