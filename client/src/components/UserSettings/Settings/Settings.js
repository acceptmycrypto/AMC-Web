import React, { Component } from "react";
import "./Settings.css";
import { connect } from "react-redux";
import {bindActionCreators} from 'redux';
import { Link } from "react-router-dom";
import Layout from "../../../containers/Layout";
import { Menu } from "semantic-ui-react"
import ProfileSettings from "../ProfileSettings";
import PrivacySettings from "../PrivacySettings";
import CryptocurrencySettings from "../CryptocurrencySettings";
import TransactionsSettings from "../TransactionsSettings";
import { _isLoggedIn } from "../../../actions/loggedInActions";



class Settings extends Component {

    constructor() {
        super();

        this.state = {
            activeItem: "Profile Settings",
            color: "teal"
        };
    }

    handleItemClick = (e, { name }) => {
        this.setState({ activeItem: name })
    }

    componentDidMount() {
        this.props._isLoggedIn(localStorage.getItem('token'));
    }
    


    render() {
    const { error, loading, userLoggedIn } = this.props;

    if (error) {
      return <div>Error! {error.message}</div>;
    }

    if (loading) {
      return <div>Loading...</div>;
    }
    if (userLoggedIn) {
      console.log("user logged in");
      
    }else{
        // localStorage.removeItem('token');
        this.props.history.push('/');
    }
        const { color } = this.state
        const { activeItem } = this.state

        return (


            <div>
                <Layout >
                <div className="mr-4 ml-4">
                    <Menu color={color} inverted widths={4}>
                        <Menu.Item name="Profile Settings" active={activeItem === "Profile Settings"} onClick={this.handleItemClick} />
                        <Menu.Item
                            name="Privacy Settings"
                            active={activeItem === "Privacy Settings"}
                            onClick={this.handleItemClick}
                        />
                        <Menu.Item
                            name="Cryptocurrency"
                            active={activeItem === "Cryptocurrency"}
                            onClick={this.handleItemClick}
                        />
                        <Menu.Item
                            name="Pending Transactions"
                            active={activeItem === "Transactions"}
                            onClick={this.handleItemClick}
                        />
                    </Menu>
                    <div>
                        { this.state.activeItem == "Profile Settings" && <ProfileSettings/>}
                        { this.state.activeItem == "Privacy Settings" && <PrivacySettings/>}
                        { this.state.activeItem == "Cryptocurrency" && <CryptocurrencySettings/>}
                        { this.state.activeItem == "Transactions" && <TransactionsSettings/>}


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
    userLoggedIn: state.LoggedIn.userLoggedIn
  });
  
  const matchDispatchToProps = dispatch =>{
    return bindActionCreators({_isLoggedIn}, dispatch);
  }
  
  
  export default connect(mapStateToProps, matchDispatchToProps)(Settings);
  
