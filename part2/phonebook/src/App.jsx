import React, { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { 
      name: 'Arto Hellas',
      contact: '040-1234567', 
    }
  ]);
  const [newName, setNewName] = useState("");
  const [contact, setContact] = useState();

  const handleChange = (setState) => (event) => setState(event.target.value)
  
  const handleSubmit = event => {
    event.preventDefault()

    const isAdded = persons.some(({ name }) => name === newName)

    if(!newName.trim()) {
      return
    } else if(isAdded) {
      alert(`${newName} is already added to phonebook`)
      return
    }

    setPersons(persons => ([
      ...persons,
      { 
        name: newName,
        contact
      },
    ]))

    setNewName('')
    setContact('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: 
          <input 
            value={newName} 
            onChange={handleChange(setNewName)} 
          />
        </div>
        <div>
          number: 
          <input 
            value={contact} 
            onChange={handleChange(setContact)} 
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(({ name, contact }, idx) =>
        <p key={name+idx}>{name} {contact}</p>
      )}
    </div>
  );
};

export default App;