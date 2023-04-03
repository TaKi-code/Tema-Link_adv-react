import React, { useState, useEffect } from 'react';

function App() {
  const [contacts, setContacts] = useState([]);
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  useEffect(() => {
    const storedContacts = JSON.parse(localStorage.getItem('contacts'));
    if (storedContacts) {
      setContacts(storedContacts);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleAddContact = (event) => {
    event.preventDefault();
    setContacts([...contacts, { name, phoneNumber }]);
    setName('');
    setPhoneNumber('');
  };

  const handleDeleteContact = (index) => {
    const updatedContacts = [...contacts];
    updatedContacts.splice(index, 1);
    setContacts(updatedContacts);
  };

  const ContactList = () => {
    if (contacts.length === 0) {
      return <p>Nu există contacte salvate.</p>;
    }

    return (
      <ul>
        {contacts.map((contact, index) => (
          <li key={index}>
            <span>{contact.name}:</span>
            <span>{contact.phoneNumber}</span>
            <button onClick={() => handleDeleteContact(index)}>Șterge</button>
          </li>
        ))}
      </ul>
    );
  };

  const ContactForm = () => {
    const handleNameChange = (event) => {
      setName(event.target.value);
    };

    const handlePhoneNumberChange = (event) => {
      setPhoneNumber(event.target.value);
    };

    return (
      <form onSubmit={handleAddContact}>
        <label>
          Nume:
          <input type="text" value={name} onChange={handleNameChange} />
        </label>
        <label>
          Numar de telefon:
          <input type="text" value={phoneNumber} onChange={handlePhoneNumberChange} />
        </label>
        <button type="submit">Salveaza</button>
      </form>
    );
  };

  return (
    <div>
      <h1>Agenda Telefonica</h1>
      <ContactList />
      <ContactForm />
    </div>
  );
}

export default App;
