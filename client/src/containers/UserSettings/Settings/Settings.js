import React, { Component } from "react";
import "./Settings.css";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { Link } from "react-router-dom";
import Layout from "../../../containers/Layout";
import { Menu } from "semantic-ui-react"
import ProfileSettings from "../ProfileSettings";
import PrivacySettings from "../PrivacySettings";
import CryptocurrencySettings from "../CryptocurrencySettings";
import TransactionsSettings from "../TransactionsSettings";
import { _isLoggedIn } from "../../../actions/loggedInActions";
import { setInitialSettingsState, handleSettingsMenuItemClick } from "../../../actions/settingsActions";



class Settings extends Component {

    componentDidMount = async () => {
        await this.props._isLoggedIn(localStorage.getItem('token'));
        if (await this.props.userLoggedIn) {
            await console.log("user logged in");
            await this.props.setInitialSettingsState();

        } else {
            // localStorage.removeItem('token');
            await this.props.history.push('/');
        }
    }

    render() {
        const { error, loading, userLoggedIn, activeSettingsItem, handleSettingsMenuItemClick } = this.props;

        if (error) {
            return <div>Error! {error.message}</div>;
        }

        return (


            <div>
                <Layout >
                    <div className="mr-5 ml-5">
                        <Menu color={"teal"} inverted widths={3}>
                            <Menu.Item name="Profile Settings" active={activeSettingsItem === "Profile Settings"} onClick={handleSettingsMenuItemClick} />
                            {/* <Menu.Item
                            name="Privacy Settings"
                            active={activeSettingsItem === "Privacy Settings"}
                            onClick={this.handleSettingsMenuItemClick}
                        /> */}
                            <Menu.Item
                                name="Cryptocurrency"
                                active={activeSettingsItem === "Cryptocurrency"}
                                onClick={handleSettingsMenuItemClick}
                            />
                            <Menu.Item
                                name="Confirmed Order Details"
                                active={activeSettingsItem === "Transactions"}
                                onClick={handleSettingsMenuItemClick}
                            />
                        </Menu>
                        <div>
                            {activeSettingsItem == "Profile Settings" && <ProfileSettings />}
                            {/* { activeSettingsItem == "Privacy Settings" && <PrivacySettings/>} */}
                            {activeSettingsItem == "Cryptocurrency" && <CryptocurrencySettings />}
                            {activeSettingsItem == "Transactions" && <TransactionsSettings />}


                        </div>
                    </div>
                </Layout >

            </div>

        );
    }
}

const mapStateToProps = state => ({
    loading: state.LoggedIn.loading,
    error: state.LoggedIn.error,
    userLoggedIn: state.LoggedIn.userLoggedIn,
    activeSettingsItem: state.Settings.activeSettingsItem
});

const matchDispatchToProps = dispatch => {
    return bindActionCreators({ setInitialSettingsState, _isLoggedIn, handleSettingsMenuItemClick }, dispatch);
}


export default connect(mapStateToProps, matchDispatchToProps)(Settings);

