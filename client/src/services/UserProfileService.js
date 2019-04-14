// imported in UserProfile
export async function _updateCryptoTable (crypto_address,id, token){
        const crypto_settings = {
            method: "POST",
            headers: {
              "Accept": "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({crypto_address, id, token})
          };
      
          const data = await fetch("/profile/addAddress?_method=PUT", crypto_settings)
            .then(response => response.json())
            .then(json => {
              return json;
            })
            .catch(e => {
              return e
            });

        const user_settings  = {
          method: "POST",
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({token})
        };
          
      
          const userProfileData = await fetch("/profile", user_settings);
          const user_info = await userProfileData.json();
      
          const userCryptoData = await fetch("/profile/crypto", user_settings);
          const user_crypto = await userCryptoData.json();
          const crypto_view = await "owned";
          const add_address = await false;
      
          return { user_info, user_crypto, crypto_view, add_address };
}



// imported in UserProfile
export async function _loadProfile (token) {
  const settings = {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({token})
  };
  const profile = await fetch("/profile", settings)
  const user_info = await profile.json();

  const profile_crypto = await fetch("/profile/crypto", settings)
  const user_crypto = await profile_crypto.json();


  const profile_friends = await fetch("/profile/friends", settings)
  const friends_array = await profile_friends.json();

  const profile_transactions = await fetch("/profile/user/transactions", settings)
  const transactions = await profile_transactions.json();


  
  return({user_info, user_crypto, friends_array, transactions});

}


