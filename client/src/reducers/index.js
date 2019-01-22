import {combineReducers} from 'redux';
import Deals from './reducer-deals';
import Search from './reducer-searchbar';
import Category from './reducer-category';
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
import CreateDeal from './reducer-create-deal';
import Reviews from './reducer-reviews';
import UploadedImages from './reducer-images';
import Homepage from './reducer-homepage';


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
  Settings,
  Category,
  CreateDeal,
  Reviews,
  UploadedImages,
  Homepage
});

export default allReducers;