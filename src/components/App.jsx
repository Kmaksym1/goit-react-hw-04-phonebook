// import { Component } from "react";
import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import { ContactForm } from './contactForm/contactForm.jsx';
import ContactList from './contactList/contactList.jsx';
import { Filter } from './contactList/filter.jsx';

export const App = () => {
  const [contacts, setContacts] = useState([
    // { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    // { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    // { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  ]);
  const [filtered] = useState('');

 

  useEffect(() => {
    const data = localStorage.getItem('cont');
    console.log("data",data)
    if (data !== []) {
      console.log("contactsLocaltoNEW",JSON.parse(data))
      return setContacts(JSON.parse(data))
    };
    // console.log("JSON.parse(data)", JSON.parse(data))
    // console.log("contactsLocal",contacts)
    
  }, []);
  console.log("contacts",contacts)
  useEffect(() => {
    
    contacts && localStorage.setItem('cont', JSON.stringify(contacts));
    console.log("JSON.stringify(contacts)",JSON.stringify(contacts))
  }, [contacts]);

  const createName = data => {
    const newUser = {
      ...data,
      id: nanoid(3),
    };
    const nameAlreadyInContacts = contacts.find(
      ({ name }) => name === data.name
    );
    if (nameAlreadyInContacts) {
      return Notify.info(`${data.name} is already in contacts`);
    }
    setContacts([...contacts, newUser]);
  };

  const changeFilter = filter => {
    filter = filter.toLowerCase();
  };

  const handleDelete = idDel => {
    setContacts(prevContacts => {
      return prevContacts.filter(({ id }) => id !== idDel);
    });
  };
  const vicibleContacts = contacts.filter(({ name }) =>
    name.toLowerCase().includes(filtered)
  );

  return (
    <div
      style={{
        width: '50vh',
        display: 'block',
        fontSize: '40px',
        margin: 'auto',
      }}
    >
      <h1>Phonebook</h1>
      <ContactForm createName={createName} />
      <h2>Contacts</h2>
      <Filter onChange={changeFilter} />
      <ContactList
        contacts={vicibleContacts}
        del={handleDelete}
        stateToLocal={contacts}
      />
    </div>
  );
};


