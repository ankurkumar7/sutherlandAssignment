import React, { useState } from 'react';
import { TextField } from '@mui/material';

const GlobalSearch = ({ contacts, setFilteredContacts, isMockData = false }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query) => {
    let filtered = [];
     
    if(isMockData){
        filtered = contacts.filter(
          (user) =>
            user.name.toLowerCase().includes(query) ||
            user.email.toLowerCase().includes(query) ||
            user.username.toLowerCase().includes(query)
        );
    } else {
        filtered = contacts.filter((contact) =>
        contact.displayName.toLowerCase().includes(query.toLowerCase())
      );
    }
    
    setFilteredContacts(filtered);
    setSearchQuery(query);
  };

  return (
    <TextField
      label="Search"
      value={searchQuery}
      size="md"
      style={{ marginBottom: '16px' }}
      onChange={(e) => handleSearch(e.target.value)}
    />
  );
};

export default GlobalSearch;
