import React from 'react';
import { Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';

const ContactTable = ({ contacts }) => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell>Email</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {contacts.map((contact) => (
          <TableRow key={contact.id}>
            <TableCell>{contact.displayName}</TableCell>
            <TableCell>{contact.emailAddresses[0]?.address}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ContactTable;
