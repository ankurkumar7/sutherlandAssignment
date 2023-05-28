import React, { useEffect, useState } from 'react';
import { signIn, signOut, getToken, getAccount } from './Auth';
import { useMsal } from '@azure/msal-react';

import { getContacts, getMockUsers } from './api.js';
import ContactTable from './ContactTable';
import GlobalSearch from './GlobalSearch';
import UserTable from './UsersTable';
import { Button } from '@mui/material';
// import { Contactt}
// im

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState({});

  const msal = useMsal();

  const [accessToken, setAccessToken] = useState(null);
  const [contacts, setContacts] = useState([]);
  const [mockData, setMockData] = useState([]);

  const [filteredContacts, setFilteredContacts] = useState([]);
  const [filteredMockData, setFilteredMockData] = useState([]);

  const handleSignIn = async () => {
    const response = await signIn();
    // const account = getAccount();
    if (response?.uniqueId) {
      setLoggedIn(true);
      setUserData(response.account);
    } else {
      setLoggedIn(false);
    }
    console.log('Signed in:', response);
  };

  const handleSignOut = () => {
    msal.instance.logoutRedirect();
    console.log(msal);
    console.log('Signed out');
  };

  const handleGetData = async () => {
    return alert('contact data not available')
    const token = await getToken();
    console.log('Token:', token);
    setAccessToken(token);
    fetchData(token);
    // we can make api call using Token, don't have office365 access api giving error, so used mock data
  };

  const HandleGetMockData = () => fetchMockData();

  useEffect(() => {
    const account = getAccount();
    setUserData(account);
    setLoggedIn(account);
  }, [])



  const fetchData = async (token) => {
    const data = await getContacts(token);
    console.log('contacts', data);
    setContacts(data);
    // setFilteredContacts(data);
  };

  const fetchMockData = async () => {
    const data = await getMockUsers();
    console.log('contacts', data);
    setMockData(data);
    setFilteredMockData(data);
  };


  return (
    <div>
      {loggedIn ? (
        <div>
          <div style={{ display: "flex", justifyContent:'space-around', alignItems: 'center'  }}>
            <div>
              <p>Hi {userData.name}, have a good day!</p>
              <p>You're signed in as: {userData?.userName}</p>
            </div>
            <div style={{ alignItems: 'center' }}>
              <Button style={{ margin: 10 }} color="primary" variant="contained" onClick={handleSignOut}>Sign Out</Button>
              <Button style={{ margin: 10 }} color="primary" variant="contained" onClick={handleGetData}>Get Data</Button>
              <Button style={{ margin: 10 }} color="primary" variant="contained" onClick={HandleGetMockData}>Get Mock Data</Button>
            </div>
          </div>

          {contacts.length > 0 ? <>
            <GlobalSearch contacts={contacts} setFilteredContacts={setFilteredContacts} />
            <ContactTable contacts={filteredContacts} />
          </> : ''}

          {mockData.length > 0 ?
            <>
              <GlobalSearch contacts={mockData} setFilteredContacts={setFilteredMockData} isMockData={true} />
              <UserTable users={filteredMockData} />
            </> : ''}
        </div>
      ) : (
          <div style={{ display: "flex", justifyContent:'start'}}>
            <p>Hello, Guest user, please click here to   </p>
            <Button style={{ margin: 10 }} color="success" variant="contained" onClick={handleSignIn}>Sign In</Button>
          </div>
      )}
    </div>
  );
}

export default App;
