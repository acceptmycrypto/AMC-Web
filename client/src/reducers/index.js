import {combineReducers} from 'redux';
import Deals from './reducer-deals';
import Search from './reducer-searchbar';
import DealItem from './reducer-dealItem';
import TransactionInfo from './reducer-payment';
import Cryptos from './reducer-cryptos';
import UserInfo from './reducer-user-info';
import LoggedIn from './reducer-logged-in';
import Photo from './reducer-photo';
import LoadCrypto from './reducer-load-cryptos';
import CryptoSelected from './reducer-sign-up';
import SignInModal from './reducer-sign-in';
import Settings from './reducer-settings';


const allReducers = combineReducers({
  matchedDeals: Deals,
  UserInfo,
  LoggedIn,
  Photo,
  Cryptos,
  DealItem,
  LoadCrypto,
  CryptoSelected,
  SignInModal,
  TransactionInfo,
  Search,
  Settings
});

export default allReducers;