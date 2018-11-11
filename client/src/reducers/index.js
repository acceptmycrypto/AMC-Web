import {combineReducers} from 'redux';
import Deals from './reducer-deals';
import Layout from './reducer-layout';

const allReducers = combineReducers({
  matchedDeals: Deals,
  Layout
});

export default allReducers;