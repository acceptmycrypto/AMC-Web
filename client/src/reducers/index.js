import {combineReducers} from 'redux';
import Deals from './reducer-deals';
import Layout from './reducer-layout';
import Photo from './reducer-photo';
import Cryptos from './reducer-cryptos';

const allReducers = combineReducers({
  matchedDeals: Deals,
  Layout,
  Photo,
  Cryptos
});

export default allReducers;