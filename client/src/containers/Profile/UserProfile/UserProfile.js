import React, { Component } from "react";
import "./UserProfile.css";
import { Link } from "react-router-dom";
import coinAddressValidator from "coin-address-validator";
import ProfileCard from "../../../components/Profile/ProfileCard";
import CryptoCard from "../../../components/Profile/CryptoCard";
import CryptoAddress from "../../../components/Profile/CryptoAddress";
import ProfileFeed from "../../../components/Profile/ProfileFeed";
// import Layout from "../../../components/Layout"
import Layout from "../../Layout";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { _updateCryptoTable, _verifyUser } from "../../../services/UserProfileService";
import { _loadProfile } from "../../../actions/userLoadActions";
import { _isLoggedIn } from "../../../actions/loggedInActions";
import { handleToggleChange, handleAddressFormChange, handleQRChange, updateCryptos } from "../../../actions/cryptoPortfolioActions";




class UserProfile extends Component {
  
  componentDidMount() {
    this.props._isLoggedIn(localStorage.getItem('token'));
    this.props._loadProfile(localStorage.getItem('token'));
  }


  render() {

    const { error, loading, user_info, user_crypto, transactions, userLoggedIn, crypto_view, address_form_shown, qr_shown, users_cryptos_id, current_crypto_name, handleToggleChange, handleAddressFormChange, handleQRChange, updateCryptos} = this.props;

    if (error) {
      return <div>Error! {error.message}</div>;
    }

    // if (loading) {
    //   return <div>Loading...</div>;
    // }

    if (userLoggedIn) {
      console.log("user logged in");
      
    }else{
        // localStorage.removeItem('token');
        this.props.history.push('/');
    }

    return (
      <div>
        <Layout >
        <div className="userProfile d-flex flex-row justify-content-between">
          <div className="d-flex flex-column width-30">
            {user_info != undefined && <ProfileCard user_info={user_info} />}

            {user_crypto != undefined &&
              <CryptoCard handleToggleChange={handleToggleChange} address_form_shown={address_form_shown} handleAddressFormChange={handleAddressFormChange} handleQRChange={handleQRChange} qr_shown={qr_shown} crypto_view={crypto_view} user_crypto={user_crypto}>

                {address_form_shown &&
                  <CryptoAddress updateCryptos={updateCryptos} crypto_id={users_cryptos_id} current_crypto_name={current_crypto_name} token={localStorage.getItem('token')} />
                }

              </CryptoCard>
            }

          </div>

          <div className="w-100 mx-5">
          { transactions != undefined && <ProfileFeed transactions={transactions} />}
            
          </div>

          {/* <div className="width-20 mr-3">       
            <FriendCard friends_array={this.state.friends_array} />
          </div> */}

        </div>
        </Layout >
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user_info: state.UserInfo.user_info,
  user_crypto: state.UserInfo.user_crypto,
  transactions: state.UserInfo.transactions,
  loading: state.UserInfo.loading,
  error: state.UserInfo.error,
  userLoggedIn: state.LoggedIn.userLoggedIn, 
  crypto_view: state.UserInfo.crypto_view,
  qr_shown: state.UserInfo.qr_shown,
  address_form_shown: state.UserInfo.address_form_shown,
  users_cryptos_id: state.UserInfo.users_cryptos_id,
  current_crypto_name: state.UserInfo.current_crypto_name
});

const matchDispatchToProps = dispatch =>{
  return bindActionCreators({_isLoggedIn, _loadProfile, handleToggleChange, handleAddressFormChange, handleQRChange, updateCryptos}, dispatch);
}


export default connect(mapStateToProps, matchDispatchToProps)(UserProfile);



