import {combineReducers} from 'redux';
import Deals from './reducer-deals';
import DealItem from './reducer-dealItem';
import Layout from './reducer-layout';
import Photo from './reducer-photo';
import Cryptos from './reducer-cryptos';

const allReducers = combineReducers({
  matchedDeals: Deals,
  Layout,
  Photo,
  Cryptos,
  DealItem
});

export default allReducers;