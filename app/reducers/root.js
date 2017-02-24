import React from 'react';
import { combineReducers } from 'redux'
import processes from './process';
import steps from './step';
import users from './user';

export default combineReducers({processes, steps, users});