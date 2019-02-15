import React, { Component } from "react";
import "./UserProfile.css";
import { Link } from "react-router-dom";
import coinAddressValidator from "coin-address-validator";
import ProfileCard from "../../../components/Profile/ProfileCard";
import CryptoCard from "../../../components/Profile/CryptoCard";
import CryptoAddress from "../../../components/Profile/CryptoAddress";
import ProfileFeed from "../ProfileFeed";
import CryptoRankings from "../../CryptosRanking";
// import Layout from "../../../components/Layout"
import Layout from "../../Layout";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { _updateCryptoTable, _verifyUser } from "../../../services/UserProfileService";
import { _loadProfile } from "../../../actions/userLoadActions";
import { _isLoggedIn } from "../../../actions/loggedInActions";
import { handleToggleChange, handleAddressFormChange, handleQRChange, updateCryptos, _handleInitiateWithdraw } from "../../../actions/cryptoPortfolioActions";
import { resetDealitemState } from "../../../actions/dealItemActions";
import Modal from "react-awesome-modal";

class UserProfile extends Component {

  componentDidMount = async () => {
    // await console.log(this.props.userLoggedIn);
    await this.props._isLoggedIn(localStorage.getItem('token'));

    // await console.log(this.props.userLoggedIn);

    if (await this.props.userLoggedIn) {
      await this.props._loadProfile(localStorage.getItem('token'));
    }else{
        // localStorage.removeItem('token');
        await this.props.history.push('/');
    }
  }

  handleInitiateWithdraw = (crypto_id) => {
    this.props._handleInitiateWithdraw(localStorage.getItem('token'), crypto_id);

    //modal here
  }

  render() {

    const { error, loading, user_info, user_crypto, transactions, confirmed, pending, tx_history_view, userLoggedIn, crypto_view, address_form_shown, qr_shown, users_cryptos_id, current_crypto_name, handleToggleChange, handleAddressFormChange, handleQRChange, updateCryptos} = this.props;

    if (error) {
      return <div>Error! {error.message}</div>;
    }

    // if (loading) {
    //   return <div>Loading...</div>;
    // }

    //reset dealItem state when user hit deals route
    this.props.resetDealitemState();

    return (
      <div className="pt-5">
        <Layout >
        <div className="userProfile d-flex flex-row justify-content-between">
          <div className="d-flex flex-column w-25 ml-2">
            {user_info != undefined && user_info.length > 0 && <ProfileCard user_info={user_info} />}

            {user_crypto != undefined &&
              <CryptoCard handleToggleChange={handleToggleChange} address_form_shown={address_form_shown} handleAddressFormChange={handleAddressFormChange} handleQRChange={handleQRChange} qr_shown={qr_shown} crypto_view={crypto_view} user_crypto={user_crypto} initiateWithdraw={this.handleInitiateWithdraw}>

                {address_form_shown &&
                  <CryptoAddress updateCryptos={updateCryptos} crypto_id={users_cryptos_id} current_crypto_name={current_crypto_name} token={localStorage.getItem('token')} />
                }

              </CryptoCard>
            }

          </div>

          <div className="w-50 mr-4 ml-5">
          { transactions != undefined && <ProfileFeed classname="w-50" />}

          </div>

          {/* <div className="width-20 mr-3">
            <FriendCard friends_array={this.state.friends_array} />
          </div> */}

          <CryptoRankings/>

          <Modal
            visible={true}
            effect="fadeInUp"
            // onClickAway={() => {
            //   closeModalAfterDealCreated();
            //   this.directToDealItemPage();
            // }}
          >
            <div className="deal-created-modal">
              {/* {this.dealCreatedModal()} */}
            </div>
          </Modal>
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
  confirmed: state.UserInfo.confirmed,
  pending: state.UserInfo.pending,
  tx_history_view: state.UserInfo.tx_history_view,
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
  return bindActionCreators({_isLoggedIn, _loadProfile, handleToggleChange, handleAddressFormChange, handleQRChange, updateCryptos, resetDealitemState, _handleInitiateWithdraw}, dispatch);
}


export default connect(mapStateToProps, matchDispatchToProps)(UserProfile);



