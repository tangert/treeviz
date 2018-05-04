import Visualization from './../features/visualization/Reducer';
import Filters from './../features/filters/Reducer';

import { combineReducers } from 'redux';

const rootReducer = combineReducers({ Visualization, Filters });

export default rootReducer;
