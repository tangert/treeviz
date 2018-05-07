import Visualization from './../features/visualization/Reducer';
import Filters from './../features/filters/Reducer';
import Input from './../features/input/Reducer';

import { combineReducers } from 'redux';

const rootReducer = combineReducers({ Visualization, Filters, Input });

export default rootReducer;
