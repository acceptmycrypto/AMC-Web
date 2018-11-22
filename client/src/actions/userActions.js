export const openModal = () => {

    // action
        // made up of two parts 1. type 2. payload
    return {
        type: 'OPEN_MODAL', //what does the action do = title of action
        payload: {visible: true} // any data you need to return
    }
};


export const closeModal = () => {

    // action
        // made up of two parts 1. type 2. payload
    return {
        type: 'CLOSE_MODAL', //what does the action do = title of action
        payload: {visible: false} // any data you need to return
    }
};


export const handleToggleChange = (event) => {
    let target = event.target.checked; // checkbox has property checked = true or checked = false;

    if (target) { // if Owned/Interected Crypto Portfolio checkbox is checked show interested coins

    //   this.hideOrShowCoin("show");
      return{
          type:'SHOW_ALL_INTERESTED_CRYPTO',
          payload:{
            crypto_view: "interested", 
            qr: false, 
            add_address: false, 
            users_cryptos_id: null,
            current_crypto_name: null,
            hideOrShowCoin: "show"
          }
      }

    } else { // if Owned/Interested Crypto Portfolio checkbox is not checked show owned coins

    //   this.hideOrShowCoin("show");
      return{
        type:'SHOW_ALL_OWNED_CRYPTO',
        payload:{
          crypto_view: "owned", 
          qr: false, 
          add_address: false, 
          users_cryptos_id: null,
          current_crypto_name: null,
          hideOrShowCoin: "show"
        }
    }
    }
  }

  