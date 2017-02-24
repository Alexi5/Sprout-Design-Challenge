import React from 'react'

//CONSTANTS
const FETCH_PROCESS = 'FETCH_PROCESS';
const FETCH_PROCESSES = 'FETCH_PROCESSES';
const UPDATE_PROCESS_NAME = 'UPDATE_PROCESS_NAME';
const UPDATE_PROCESS_DESCRIPTION = 'UPDATE_PROCESS_DESCRIPTION'

//ACTION CREATORS
//fetches single process for the store
export const fetchProcess = process => {
  return {
    type: FETCH_PROCESS,
    singleProcess: process
  };
};

//fetch all processes for an processes route
// export const fetchProcesses = function (processes) {
//     return {
//         type: FETCH_PROCESSES,
//         allProcesses: processes
//     };
// };

export const updateProcessName = (name) => {
  return {
    type: UPDATE_PROCESS_NAME,
    name
  }
};

export const updateProcessDescription = (description) => {
  return {
    type: UPDATE_PROCESS_DESCRIPTION,
    description
  }
};

//REDUCER
const initialState = {
    allProcesses: [],
    singleProcess: {},
}

//updates the store 
export default function (state = initialState, action) {
    let nextState = Object.assign({}, state)
    switch (action.type) {
        case FETCH_PROCESSES:
            return [...state.allProcesses, action.allProcesses];
        case FETCH_PROCESS:
            return action.singleProcess;
        case UPDATE_PROCESS_NAME:
            nextState.displayName = action.name;
            break; 
        case UPDATE_PROCESS_DESCRIPTION:
            nextState.description = action.description;
            break; 
        default:
            return state;
    }

    return nextState;
}

