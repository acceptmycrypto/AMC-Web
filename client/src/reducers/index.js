import {combineReducers} from 'redux';
import Deals from './reducer-deals';
import UserInfo from './reducer-user-info';
import Layout from './reducer-layout';
import Photo from './reducer-photo';
import LoadCrypto from './reducer-load-cryptos';
import CryptoSelected from './reducer-sign-up';
import SignInModal from './reducer-sign-in';

const allReducers = combineReducers({
  matchedDeals: Deals,
  UserInfo,
  Layout,
  Photo,
  LoadCrypto,
  CryptoSelected,
  SignInModal
  
});

export default allReducers;