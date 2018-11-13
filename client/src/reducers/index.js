import {combineReducers} from 'redux';
import Deals from './reducer-deals';
import UserInfo from './reducer-user-info';
// import Layout from './reducer-layout';
import Photo from './reducer-photo';
import LoadCrypto from './reducer-load-cryptos';

const allReducers = combineReducers({
  matchedDeals: Deals,
  UserInfo,
  Layout,
  Photo,
  LoadCrypto
  
});

export default allReducers;