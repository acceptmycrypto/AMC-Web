import React, { Component } from "react";
import "./CryptocurrencySettings.css";
import { _loadCryptoSettings } from "../../../services/SettingsService";
import { Menu } from 'semantic-ui-react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Select from "react-select";
import { _loadProfile } from "../../../actions/userLoadActions";
import { handleCryptoSettingsMenuItemClick, _cryptoOptionsLeft, _addCryptos } from "../../../actions/settingsActions";
import { handleDropdownChange } from "../../../actions/signUpActions";

class CryptocurrencySettings extends Component {


    componentDidMount() {

        this.props._loadProfile(localStorage.getItem("token"));

        this.props._cryptoOptionsLeft(localStorage.getItem("token"));
    }

    addCryptos = async () => {
        const token = await localStorage.getItem('token');
        if (this.props.selectedCryptos != null) {
            await this.props._addCryptos(token, this.props.selectedCryptos);
            await setTimeout(() => { this.props._loadProfile(localStorage.getItem("token")); }, 200);
        } else {
            document.querySelector('#addCryptoResponse').innerHTML = "Select Cryptos from the dropdown above"
        }
    }


    render() {


        const { user_crypto, activeCryptoSettingsItem, handleCryptoSettingsMenuItemClick, cryptoLeft, handleDropdownChange, selectedCryptos } = this.props;

        let ownObj = [];
        let interestedObj = [];

        for (let i in user_crypto) {
            if (user_crypto[i].crypto_address == null) {
                interestedObj.push(user_crypto[i])
            }
            else {
                ownObj.push(user_crypto[i]);
            }
        }

        return (
            <div className="d-flex flex-direction-row">

                <div className="w-100 mx-0 text-center">

                    <h1 className="text-center lightBlueText py-3">Cryptocurrencies</h1>
                    <hr></hr>

                    <div className="d-flex flex-row">
                        <div className="w-25 mt-3 text-left">
                            <Menu pointing secondary vertical>
                                {interestedObj.length > 0
                                    ? <Menu.Item
                                        name='Crypto I am Are Interested In'
                                        active={activeCryptoSettingsItem === 'Crypto I am Are Interested In'}
                                        onClick={handleCryptoSettingsMenuItemClick} />
                                    : null
                                }
                                {ownObj.length > 0
                                    ? <Menu.Item
                                        name="Crypto I Own"
                                        active={activeCryptoSettingsItem === "Crypto I Own"}
                                        onClick={handleCryptoSettingsMenuItemClick}
                                    />
                                    : null
                                }
                                <Menu.Item
                                    name='Update Crypto Portfolio'
                                    active={activeCryptoSettingsItem === 'Update Crypto Portfolio'}
                                    onClick={handleCryptoSettingsMenuItemClick}
                                />
                            </Menu>

                        </div>

                        <div className="text-left w-75 mt-4 margin-L-15">

                            {activeCryptoSettingsItem == "Crypto I am Are Interested In" &&
                                <div>
                                    <h3 className="mb-3 text-left">Cryptocurrencies I am Are Interested In</h3>
                                    <div className="d-flex flex-row justify-content-start ml-5">
                                        {interestedObj.length > 0
                                            ? interestedObj.map((crypto, i) =>
                                                <div key={"interestedObj " + i} className="mr-5">
                                                    <div className="mx-1 my-2 cryptos">
                                                        <a className="blueText cryptoText link" href={crypto.crypto_link} target="_blank">{crypto.crypto_metadata_name}</a>
                                                        <br></br>
                                                        <img className="cryptoSmall" data-name={crypto.crypto_metadata_name} src={crypto.crypto_logo} data-id={crypto.id} ></img>
                                                    </div>
                                                </div>
                                            )
                                            : <h5>You Are not interested in any Cryptos</h5>

                                        }
                                    </div>

                                </div>
                            }
                            {activeCryptoSettingsItem == "Crypto I Own" &&
                                <div>
                                    <h3 className="mb-3 text-start">Cryptocurrencies I Own</h3>
                                    <div className="d-flex flex-row text-center justify-content-start ml-5">
                                        {ownObj.length > 0
                                            ? ownObj.map((crypto, i) =>
                                                <div key={"ownObj " + i} className="mr-5">
                                                    <div className="my-2 cryptos ">
                                                        <a className="blueText cryptoText link" href={crypto.crypto_link} target="_blank">{crypto.crypto_metadata_name}</a>
                                                        <br></br>
                                                        <img className="cryptoSmall" data-name={crypto.crypto_metadata_name} data-address={crypto.crypto_address} data-id={crypto.id} src={crypto.crypto_logo}></img>
                                                    </div>
                                                </div>
                                            )
                                            : <h5>You Don't Own Any Cryptos</h5>

                                        }
                                    </div>

                                </div>
                            }
                            {activeCryptoSettingsItem == "Update Crypto Portfolio" &&
                                <div>
                                    <h3 className="mb-3">Update Crypto Portfolio</h3>
                                    <div className="text-left mb-5">
                                        <h4 className="blueText  mb-3">ADD Cryptos to Your Portfolio:</h4>
                                        {cryptoLeft != undefined && cryptoLeft.length > 0
                                            ? <div className="w-50 mb-3">
                                                <Select
                                                    className="dropdown"
                                                    required
                                                    onChange={handleDropdownChange}
                                                    options={cryptoLeft}
                                                    isMulti={true}
                                                    autoBlur={false}
                                                />
                                                <h6 className="redText  my-3" id="addCryptoResponse"></h6>

                                                <div className=" mt-1"><button className="py-1 btn btn-primary button-font" onClick={this.addCryptos}>Add Cryptos to Portfolio</button></div>
                                            </div>
                                            : <h5 className=" mb-3">All Cryptos have been added to your Crypto Portfolio</h5>

                                        }

                                    </div>
                                    {/* <div className="text-left">
                                <h4 className="blueText margin-L-15 mb-3">REMOVE Cryptos From Your Portfolio:</h4>
                            </div> */}

                                </div>

                            }
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}


const mapStateToProps = state => ({
    user_crypto: state.UserInfo.user_crypto,
    activeCryptoSettingsItem: state.Settings.activeCryptoSettingsItem,
    cryptoLeft: state.Settings.cryptoLeft,
    selectedCryptos: state.CryptoSelected.selectedCryptos,

});

const matchDispatchToProps = dispatch => {
    return bindActionCreators({ _loadProfile, handleCryptoSettingsMenuItemClick, _cryptoOptionsLeft, handleDropdownChange, _addCryptos }, dispatch);
}


export default connect(mapStateToProps, matchDispatchToProps)(CryptocurrencySettings);

