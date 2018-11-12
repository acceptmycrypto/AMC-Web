import {combineReducers} from 'redux';
import Deals from './reducer-deals';
import UserInfo from './reducer-user-info';

const allReducers = combineReducers({
  matchedDeals: Deals,
  userInfo: UserInfo
});

export default allReducers;