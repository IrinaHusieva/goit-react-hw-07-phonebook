
import { useSelector, useDispatch } from 'react-redux';
import { Section } from './Section/Section';
import { Filter } from './Filter/Filter';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { addContact, deleteContact, updateFilter } from '../redux/contactsSlice';
import { nanoid } from '@reduxjs/toolkit';
import Notiflix from 'notiflix';

export const App = () => {
  const contacts = useSelector(state => state.contacts.contacts);
  const filter = useSelector(state => state.contacts.filter);
  const dispatch = useDispatch();

 const filteredContacts = contacts.filter(contact =>
  contact.name && contact.name.toLowerCase().includes(filter.toLowerCase())
);


  const addContactHandler = ({ name, number }) => {
    const existingContact = contacts.find(contact => contact.name && contact.name.toLowerCase() === name.toLowerCase());

    if (existingContact) {
      Notiflix.Notify.failure(`${name} is already in contacts`);
    return;
    }

    dispatch(addContact({ id: nanoid(), name, number }));
  };

  const filterChangeHandler = e => {
    dispatch(updateFilter(e.target.value));
  };

  const onDelete = contactId => {
    dispatch(deleteContact(contactId));
  };

  return (
    <>
      <Section title="Phonebook">
        <ContactForm onSubmit={addContactHandler} />
      </Section>

      <Section title="Contacts">
        <Filter filter={filter} handleChange={filterChangeHandler} />
        <ContactList contacts={filteredContacts} onDelete={onDelete} />
      </Section>
    </>
  );
};
