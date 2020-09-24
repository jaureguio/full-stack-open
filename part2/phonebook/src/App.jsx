import React, { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", contact: "040-123456" },
    { name: "Ada Lovelace", contact: "39-44-5323523" },
    { name: "Dan Abramov", contact: "12-43-234345" },
    { name: "Mary Poppendieck", contact: "39-23-6423122" },
  ]);
  const [newName, setNewName] = useState("");
  const [contact, setContact] = useState("");
  const [filter, setFilter] = useState("");

  const handleChange = (setState) => (event) => setState(event.target.value)
  
  const handleSubmit = event => {
    event.preventDefault()

    const isAdded = persons.some(({ name }) => name === newName)

    if(!newName.trim()) {
      return
    } else if(isAdded) {
      return alert(`${newName} is already added to phonebook`)
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

  let filteredPeople = persons
  if(filter.trim()) {
    filteredPeople = persons.filter(({ name }) => 
      name.toLocaleLowerCase().includes(filter)
    )
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter 
        text='name'
        filter={filter}
        onChange={handleChange(setFilter)}
      />
      <h3>Add a new</h3>
      <PersonForm 
        name={newName}
        contact={contact}
        onSubmit={handleSubmit}
        onNameChange={handleChange(setNewName)}
        onContactChange={handleChange(setContact)}
      />
      <h3>Numbers</h3>
      <Persons data={filteredPeople} />
    </div>
  );
};

const PersonForm = ({ 
  name, 
  contact, 
  onNameChange, 
  onContactChange, 
  onSubmit 
}) => (
  <>
    <form onSubmit={onSubmit}>
      <div>
        name:
        <input value={name} onChange={onNameChange} />
      </div>
      <div>
        number:
        <input value={contact} onChange={onContactChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  </>
);

const Filter = ({ text, filter, onChange }) => (
  <>
    <div>
      Search by {text}:
      <input value={filter} onChange={onChange} />
    </div>
  </>
);

const Persons = ({ data }) => (
  data.map(({ name, contact }, idx) => (
    <p key={name + idx}>
      {name} {contact}
    </p>
)));

export default App;