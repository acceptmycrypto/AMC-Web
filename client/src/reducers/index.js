import {combineReducers} from 'redux';
import Deals from './reducer-deals';

import DealItem from './reducer-dealItem';
import TransactionInfo from './reducer-payment';
import Cryptos from './reducer-cryptos';
import UserInfo from './reducer-user-info';
import Layout from './reducer-layout';
import Photo from './reducer-photo';
import LoadCrypto from './reducer-load-cryptos';
import CryptoSelected from './reducer-sign-up';
import SignInModal from './reducer-sign-in';
import Vendor from './reducer-vendor';


const allReducers = combineReducers({
  matchedDeals: Deals,
  UserInfo,
  Layout,
  Photo,
  Cryptos,
  DealItem,
  LoadCrypto,
  CryptoSelected,
  SignInModal,
  TransactionInfo,
  Vendor
});

export default allReducers;