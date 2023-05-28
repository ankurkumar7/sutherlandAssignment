import { Client } from '@microsoft/microsoft-graph-client';

export const getContacts = async (accessToken) => {
  try {
    const client = Client.init({
      authProvider: (done) => {
        done(null, accessToken);
      },
    });

    const contacts = await client.api('/me/contacts').get();
    return contacts.value;
  } catch (error) {
    console.error('Error retrieving contacts:', error);
    return [];
  }
};

export const getMockUsers = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const data = await response.json();
        return data;
      } catch (error) {
        console.error('Error fetching user data:', error);
        return [];
      }
}

