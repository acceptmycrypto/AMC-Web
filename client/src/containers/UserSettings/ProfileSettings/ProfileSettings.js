import React, { Component } from "react";
import "./ProfileSettings.css";
import { Menu } from "semantic-ui-react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { _loadProfile } from "../../../actions/userLoadActions";
import { handleProfileSettingsMenuItemClick, _changePhoto, _changeUsername, _changeEmail, _changePassword } from "../../../actions/settingsActions";




class ProfileSettings extends Component {



    componentDidMount() {
        this.props._loadProfile(localStorage.getItem("token"));
    }

    clearMessage = () => {
        if (document.querySelector("#photoResponse")) {
            document.querySelector("#photoResponse").innerHTML = "";
        } else if (document.querySelector("#usernameResponse")) {
            document.querySelector("#usernameResponse").innerHTML = "";
        } else if (document.querySelector("#emailResponse")) {
            document.querySelector("#emailResponse").innerHTML = "";
        } else if (document.querySelector("#passwordResponse")) {
            document.querySelector("#passwordResponse").innerHTML = "";
        }

    }

    changePhoto = () => {
        let token = localStorage.getItem("token");
        if (document.querySelector('input[name="crypto"]:checked') != undefined) {
            let selectedPhoto = document.querySelector('input[name="crypto"]:checked').value;
            this.props._changePhoto(token, selectedPhoto);
            setTimeout(() => { this.props._loadProfile(localStorage.getItem("token")); }, 200);

        } else {
            document.querySelector("#photoResponse").innerHTML = "Select a Photo";
        }

    }

    changeUsername = (currentUsername) => {
        let token = localStorage.getItem("token");
        let newUsername = document.querySelector("#newUsername").value.trim();
        if (newUsername !== currentUsername && newUsername !== "") {

            _changeUsername(token, newUsername).then(res => {
                console.log(res.responseMessage);
                if (res.responseMessage) {
                    document.querySelector("#usernameResponse").innerHTML = res.responseMessage;
                } else {
                    this.props._loadProfile(localStorage.getItem("token"));
                    document.querySelector("#newUsername").value = "";
                }
            });

        } else if (newUsername === "") {
            document.querySelector("#usernameResponse").innerHTML = "Enter a usename";
        } else {
            document.querySelector("#usernameResponse").innerHTML = "Enter a different username";
        }

    }

    changeEmail = (currentEmail) => {
        let token = localStorage.getItem("token");
        let newEmail = document.querySelector("#newEmail").value.trim();
        if (newEmail !== currentEmail && newEmail !== "") {

            _changeEmail(token, newEmail).then(res => {
                console.log(res.responseMessage);
                document.querySelector("#emailResponse").innerHTML = res.responseMessage;
                this.props._loadProfile(localStorage.getItem("token"));
                document.querySelector("#newEmail").value = "";
            });

        } else if (newEmail === "") {
            document.querySelector("#emailResponse").innerHTML = "Enter an email address";
        } else {
            document.querySelector("#emailResponse").innerHTML = "Enter a different email address";
        }


    }

    changePassword = () => {
        let token = localStorage.getItem("token");
        let oldPassword = document.querySelector("#oldPassword").value.trim();
        let newPassword = document.querySelector("#newPassword").value.trim();
        let retypePassword = document.querySelector("#retypePassword").value.trim();

        console.log(oldPassword, newPassword);

        if (oldPassword.length > 5 && newPassword.length > 5 && retypePassword.length > 5 && newPassword === retypePassword && oldPassword !== newPassword) {
            _changePassword(token, oldPassword, newPassword).then(res => {
                console.log(res.responseMessage);
                document.querySelector("#passwordResponse").innerHTML = res.responseMessage;
                if (res.token) {
                    localStorage.setItem('token', res.token);
                }
                this.props._loadProfile(localStorage.getItem("token"));
                document.querySelector("#oldPassword").value = "";
                document.querySelector("#newPassword").value = "";
                document.querySelector("#retypePassword").value = "";
            });

            // document.querySelector("#passwordResponse").innerHTML = "success!";
        } else if (oldPassword.length < 5 || newPassword.length < 5 || retypePassword.length < 5) {
            document.querySelector("#passwordResponse").innerHTML = "Password length must be greater than 5 characters";
            document.querySelector("#oldPassword").value = "";
            document.querySelector("#newPassword").value = "";
            document.querySelector("#retypePassword").value = "";
        } else if (oldPassword === newPassword) {
            document.querySelector("#passwordResponse").innerHTML = "New Password must be different than your Current Password. Enter a different New Password.";
            document.querySelector("#oldPassword").value = "";
            document.querySelector("#newPassword").value = "";
            document.querySelector("#retypePassword").value = "";
        } else if (newPassword !== retypePassword) {
            document.querySelector("#passwordResponse").innerHTML = "New Password and Retype Pasword must match";
            document.querySelector("#oldPassword").value = "";
            document.querySelector("#newPassword").value = "";
            document.querySelector("#retypePassword").value = "";
        }

    }

    render() {

        const { user_info, activeProfileSettingsItem, handleProfileSettingsMenuItemClick } = this.props

        let photo_options = [];
        if (user_info !== undefined && user_info.length > 0 && user_info[0].photo.indexOf("fa-user") !== -1) {
            let photoArray = ["fa-user-secret", "fa-user-circle", "fa-user-astronaut", "fa-user-tie", "fa-user"];
            photo_options = photoArray.filter(photo => photo != user_info[0].photo);
        }


        return (
            <div className="d-flex flex-direction-row">

                <div className="w-100 mx-0 text-center">

                    <h1 className="text-center lightBlueText py-3">Profile Settings</h1>
                    <hr></hr>
                    <div className="d-flex flex-row">
                        <div className="w-25 mt-3 text-left">
                            <Menu pointing secondary vertical>
                                <Menu.Item
                                    name="Change Photo"
                                    active={activeProfileSettingsItem === "Change Photo"}
                                    onClick={handleProfileSettingsMenuItemClick}
                                />
                                <Menu.Item
                                    name="Change Username"
                                    active={activeProfileSettingsItem === "Change Username"}
                                    onClick={handleProfileSettingsMenuItemClick}
                                />

                                <Menu.Item
                                    name="Change Email Address"
                                    active={activeProfileSettingsItem === "Change Email Address"}
                                    onClick={handleProfileSettingsMenuItemClick}
                                />
                                <Menu.Item
                                    name="Change Password"
                                    active={activeProfileSettingsItem === "Change Password"}
                                    onClick={handleProfileSettingsMenuItemClick}
                                />
                            </Menu>
                        </div>
                        <div className="profileSettings text-left w-75 mt-4">
                            {activeProfileSettingsItem == "Change Photo" &&
                                <div id="editPhoto" className="mb-3">
                                    <h3>Change Photo</h3>
                                    <h4 className="blueText ml-5 d-flex flex-row align-items-center mb-4">Current Photo:
                                    {user_info !== undefined && user_info.length > 0 && user_info[0].photo.indexOf("fa-user") !== -1
                                            ? <i className={"fas ml-4 mb-4 py-2 px-3 settings-icon-shaded " + user_info[0].photo}></i>
                                            : null
                                        }
                                    </h4>
                                    <h4 className="blueText ml-5 d-flex flex-row align-items-start"><div className="mt-4">New Photo:</div>
                                        {photo_options !== undefined && photo_options.length > 0 &&
                                            <div className="ml-0">
                                                <div className="d-flex flex-row align-items-center ml-2">
                                                    {photo_options.map((photo, i) =>
                                                        <div key={photo + i} className="d-flex flex-column-reverse align-items-center justify-content-center ml-5 mb-4"><input key={photo + i} type="radio" name="crypto" value={photo} className="mt-2 justify-content-center" onChange={this.clearMessage} /><i className={"fas py-2 px-3 settings-icon-shaded " + photo}></i></div>
                                                    )}
                                                </div>
                                                <h6 className="redText ml-5" id="photoResponse"></h6>
                                                <button className="ml-5 py-1 btn btn-primary button-font mt-3" onClick={this.changePhoto}>Update Photo</button>
                                            </div>
                                        }
                                    </h4>


                                </div>
                            }
                            {activeProfileSettingsItem == "Change Username" &&
                                <div id="editUsername" className="mb-3">
                                    <h3 className="mb-4">Change Username</h3>
                                    <h4 className="blueText margin-L-15 mb-5">Current Username: <span className="ml-4">{user_info !== undefined && user_info.length > 0 ? user_info[0].username : null}</span></h4>
                                    <h4 className="blueText margin-L-15 mb-3">New Username: <input id="newUsername" className="ml-2" type="username" onChange={this.clearMessage} required /></h4>
                                    <h6 className="redText margin-L-15" id="usernameResponse"></h6>
                                    <div className="margin-L-15 mt-4"><button className="py-1 btn btn-primary button-font" onClick={() => { this.changeUsername(user_info[0].username) }}>Update Username</button></div>
                                </div>
                            }
                            {activeProfileSettingsItem == "Change Email Address" &&
                                <div id="editEmailAddress" className="mb-3">
                                    <h3 className="mb-4">Change Email Address</h3>
                                    <h4 className="blueText margin-L-15 mb-5">Current Email Address: <span className="ml-4">{user_info !== undefined && user_info.length > 0 ? user_info[0].email : null}</span></h4>
                                    <h4 className="blueText margin-L-15 mb-3">New Email Address: <input id="newEmail" className="ml-3" type="email" onChange={this.clearMessage} required /></h4>
                                    <h6 className="redText margin-L-15" id="emailResponse"></h6>
                                    <div className="margin-L-15 mt-4"><button className="py-1 btn btn-primary button-font" onClick={() => { this.changeEmail(user_info[0].email) }}>Update Email Address</button></div>
                                </div>
                            }
                            {activeProfileSettingsItem == "Change Password" &&
                                <div id="editPassword" className="mb-5">
                                    <h3 className="mb-4">Change Password</h3>
                                    <h4 className="blueText margin-L-15 mb-4">Current Password: <input id="oldPassword" className="ml-3" type="password" required onChange={this.clearMessage} /></h4>
                                    <h4 className="blueText margin-L-15 mb-4"><span className="mr-3">New Password: </span> <input id="newPassword" className="ml-4" type="password" required onChange={this.clearMessage} /></h4>
                                    <h4 className="blueText margin-L-15 mb-3">Retype Password: <input id="retypePassword" className="ml-3" type="password" required onChange={this.clearMessage} /></h4>
                                    <h6 className="redText margin-L-15" id="passwordResponse"></h6>
                                    <div className="margin-L-15 mt-4"><button className="py-1 btn btn-primary button-font" onClick={this.changePassword}>Update Password</button></div>
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
    user_info: state.UserInfo.user_info,
    activeProfileSettingsItem: state.Settings.activeProfileSettingsItem,

});

const matchDispatchToProps = dispatch => {
    return bindActionCreators({ _loadProfile, handleProfileSettingsMenuItemClick, _changePhoto }, dispatch);
}


export default connect(mapStateToProps, matchDispatchToProps)(ProfileSettings);
