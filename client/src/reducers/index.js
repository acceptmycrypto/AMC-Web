import {combineReducers} from 'redux';
import Deals from './reducer-deals';
import UserInfo from './reducer-user-info';
import Layout from './reducer-layout';
import Photo from './reducer-photo';

const allReducers = combineReducers({
  matchedDeals: Deals,
  userInfo: UserInfo,
  Layout,
  Photo
  
});

export default allReducers;