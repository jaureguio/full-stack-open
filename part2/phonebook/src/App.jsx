import React, { useState, useEffect } from "react";
import axios from 'axios';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [number, setNumber] = useState("");
  const [filter, setFilter] = useState("");

  const handleChange = (setState) => (event) => setState(event.target.value)
  
  const handleSubmit = event => {
    event.preventDefault()

    const isAdded = persons.some(({ name }) => name === newName)

    if(!newName.trim()) return
    
    if(isAdded) {
      return alert(`${newName} is already added to phonebook`)
    }

    setPersons(persons => ([
      ...persons,
      { 
        name: newName,
        number
      },
    ]))

    setNewName('')
    setNumber('')
  }

  let filteredPeople = persons
  if(filter.trim()) {
    filteredPeople = persons.filter(({ name }) => 
      name.toLocaleLowerCase().includes(filter.toLocaleLowerCase())
    )
  }

  useEffect(() => {
    axios.get('http://localhost:3001/persons')
      .then(({ data }) => {
        setPersons(data)
      })
  }, [])

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
        number={number}
        onSubmit={handleSubmit}
        onNameChange={handleChange(setNewName)}
        onNumberChange={handleChange(setNumber)}
      />
      <h3>Numbers</h3>
      <Persons data={filteredPeople} />
    </div>
  );
};

const PersonForm = ({ 
  name, 
  number, 
  onNameChange, 
  onNumberChange, 
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
        <input value={number} onChange={onNumberChange} />
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
  data.map(({ name, number }, idx) => (
    <p key={name + idx}>
      {name} {number}
    </p>
)));

export default App;