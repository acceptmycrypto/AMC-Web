import {combineReducers} from 'redux';
import Deals from './reducer-deals';

const allReducers = combineReducers({
  matchedDeals: Deals
});

export default allReducers;