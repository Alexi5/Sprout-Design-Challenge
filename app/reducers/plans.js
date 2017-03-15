import React from 'react'
import { planDataObj } from '../utils';

//CONSTANTS
const SET_ALL_PLANS = 'SET_ALL_PLANS';
const SET_SINGLE_PLAN = 'SET_SINGLE_PLAN';

//ACTION CREATORS
export const setAllPlans = (plans) => {
    return {
        type: SET_ALL_PLANS,
        allPlans: plans
    };
};

export const setSinglePlan = (plan) => {
    return {
        type: SET_SINGLE_PLAN,
        singlePlan: plan
    };
};

//REDUCER
const initialState = {

};

//updates the store 
export default function (state = initialState, action) {
    const nextState = Object.assign({}, state)

    switch (action.type) {
        case SET_ALL_PLANS:
            nextState.allPlans = action.plans;
            break;
        case SET_SINGLE_PLAN:
            nextState.singlePlan = action.plan;
            break;
        default:
            return state;
    }
    return nextState;
}

export const getAllPlans = (planDataObj) => {
    return dispatch => {
        dispatch(setAllPlans(planDataObj))
    }
}

export const getSinglePlan = (plan) => {
    return dispatch => {
        dispatch(setSinglePlan(plan))
    }
}

// export const sendRecommendedPlan = (plan) => {
//   (dispatch) => {
//      dispatch(setRecommendedPlan(plan)) 
//   }; 
// }



