import React from 'react';
import { combineReducers } from 'redux'
import assets from './assets';
import plans from './plans';

export default combineReducers({assets, plans});