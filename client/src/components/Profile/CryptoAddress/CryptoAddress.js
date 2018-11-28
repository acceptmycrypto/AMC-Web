import React from "react";
import "./CryptoAddress.css";

const CryptoAddress = props => {

    return (

        <div className="addressForm d-flex flex-column">
            <form id="addAddressForm" onSubmit={(event)=> {props.updateCryptos(event, props.crypto_id, props.current_crypto_name, localStorage.getItem('token'))}}>
                <input className="mx-3" id="addressFormInput" type="text" name="crypto_address" placeholder="Enter address" required />
                <button className="addAddressButton btn btn-outline-primary btn-sm my-2"> Add Address </button>
            </form>
        </div>


    );
}


export default CryptoAddress;