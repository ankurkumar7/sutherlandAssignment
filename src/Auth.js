import { UserAgentApplication } from 'msal';
// import 

import { msalConfig } from './authConfig';
import { useMsal } from '@azure/msal-react';

const auth = new UserAgentApplication(msalConfig);

export const signIn = async () => {
  try {
    const response = await auth.loginPopup();
    console.log(response);
    return response;
  } catch (error) {
    console.error('Error signing in:', error);
  }
};

export const signOut = () => {
  auth.logout();
};

export const getToken = async () => { //debugger
  try {
    const response = await auth.acquireTokenSilent({
      scopes: ["User.Read"]
    });
    return response.accessToken;
  } catch (error) {
    console.log(error);
    console.log(error.errorMessage);
    if (error.errorMessage && error.errorMessage.indexOf('interactive authorization') !== -1) {
      try {
        await auth.acquireTokenPopup({
          scopes: ["User.Read"]
        });
        console.log('auth', auth);
        console.log(auth.accessToken);
        return auth.accessToken;
      } catch (innerError) {

        console.error('Error token:', innerError);
      }
    } else {
      console.error('Error token:', error);
    }
  }
};

export const getAccount = () => {
  return auth.getAccount();
};
