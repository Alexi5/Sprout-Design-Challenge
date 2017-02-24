import React from 'react'

//CONSTANTS
const FETCH_USERS = 'FETCH_USERS';
const UPDATE_USER_LIST = 'UPDATE_USER_LIST';

//ACTION CREATORS
//fetches all users for the store
export const fetchUsers = function (users) {
  return {
    type: FETCH_USERS,
    allUsers: users
  };
};

export const updateUserList = (user) => {
  return {
    type: UPDATE_USER_LIST,
    user
  }
};

//REDUCER
const initialState = {
  allUsers:[],
}

//updates the store 
export default function (state = initialState, action) {
  let nextState = Object.assign({}, state)
    switch (action.type) {
      case FETCH_USERS:
        nextState.allUsers = [...nextState.allUsers, ...action.allUsers];
        break;
      case UPDATE_USER_LIST:
        nextState.allUsers = [...nextState.allUsers, action.user];
        break; 
      default:
        return state;
    }
  return nextState;
}