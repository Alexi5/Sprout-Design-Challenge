import React from 'react'

//CONSTANTS
const FETCH_STEPS = 'FETCH_STEPS';
const FETCH_STEP = 'FETCH_STEP';
const UPDATE_STEP_NAME = 'UPDATE_STEP_NAME';
const UPDATE_STEP_DESCRIPTION = 'UPDATE_STEP_DESCRIPTION'

//ACTION CREATOR
export const fetchSteps = function (steps) {
    return {
        type: FETCH_STEPS,
        allSteps: steps
    };
};

export const fetchSingleStep = function (step) {
    return {
        type: FETCH_STEP,
        selectedStep: step.stepNumber
    };
};

export const updateStepName = (name) => {
  return {
    type: UPDATE_STEP_NAME,
    name
  }
};

export const updateStepDescription = (description) => {
  return {
    type: UPDATE_STEP_DESCRIPTION,
    description
  }
};

//REDUCER
const initialState = {
    allSteps:[],
    selectedStep: 1
}

//updates the store 
export default function (state = initialState, action) {
    let nextState = Object.assign({}, state)
    switch (action.type) {
        case FETCH_STEPS:
            nextState.allSteps = [...nextState.allSteps, ...action.allSteps];
            break;
        case FETCH_STEP:
            nextState.selectedStep = action.selectedStep;
            break;
        case UPDATE_STEP_NAME:
            nextState.displayName = action.name;
            break; 
        case UPDATE_STEP_DESCRIPTION:
            nextState.description = action.description;
            break; 
        default:
            return state;
    }
    return nextState;
}

