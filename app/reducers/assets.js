import React from 'react'

//CONSTANTS
const SEND_LOGOS = 'SEND_LOGOS';
const SEND_ICONS = 'SEND_ICONS';

//ACTION CREATOR
export const fetchLogos = function (logos) {
    return {
        type: SEND_LOGOS,
        logos: logos
    };
};

export const fetchIcons = function (icons) {
    return {
        type: SEND_ICONS,
        icons: icons
    };
};

//REDUCER
const initialState = {
    logos: [],
    icons: []
}

//updates the store 
export default function (state = initialState, action) {
    let nextState = Object.assign({}, state)
    switch (action.type) {
        case SEND_LOGOS:
            nextState.logos = action.logos;
            break;
        case SEND_ICONS:
            nextState.icons = action.icons;
            break;
        default:
            return state;
    }
    return nextState;
}

