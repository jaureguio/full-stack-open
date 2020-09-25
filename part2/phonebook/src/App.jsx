import React, { useState, useEffect, Fragment } from "react";

import phonebookService from './services/phonebook'

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [number, setNumber] = useState("");
  const [filter, setFilter] = useState("");

  const handleChange = (setState) =>
    (event) =>
      setState(event.target.value)
  
  const handleDelete = ({ name, id: idToDelete }) => {
    const isConfirmed = window.confirm(`Delete ${name}?`)
    
    if(!isConfirmed) return

    phonebookService
      .deleteOne(idToDelete)
      .then(() => 
        setPersons(persons.filter(({ id }) => id !== idToDelete)))
      .catch(error => {
        if(error.message.includes('404')) {
          setPersons(persons.filter(({ id }) => id !== idToDelete))
          return window.alert(`${name} was already deleted :)`)
        }
        if(error.message.includes('Error')) {
          console.error(`Unable to delete contact: ${error}`)
          return window.alert(`Something went wrong, try refreshing the page :(`)
        }
      })
  }

  const handleSubmit = event => {
    event.preventDefault()

    const addedPerson = persons.find(({ name }) => name === newName)

    if(!newName.trim()) return
    
    if(addedPerson) {
      const confirmUpdate = window.confirm(`${addedPerson.name} is already added to phonebook, replace the old number with a new one?`)
      
      if(!confirmUpdate) return

      return phonebookService
        .updateOne(
          addedPerson.id, 
          { 
            ...addedPerson,
            number
          }
        )
        .then(updatedPerson => {
          const newPersons = [...persons]
          const personRef = newPersons.find(({ id }) => id === updatedPerson.id)
          personRef.number = number
          
          setPersons(newPersons)
        })
    }

    phonebookService
      .createOne({
        name: newName,
        number
      })
      .then(({ name, number, id }) => {
        setPersons(persons => ([
          ...persons,
          { 
            name,
            number,
            id
          },
        ]))
    
        setNewName('')
        setNumber('')
      })
  }

  let filteredPeople = persons
  if(filter.trim()) {
    filteredPeople = persons.filter(({ name }) => 
      name.toLocaleLowerCase().includes(filter.toLocaleLowerCase())
    )
  }

  useEffect(() => {
    phonebookService
      .getAll()
      .then(data => {
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
      <Persons 
        data={filteredPeople} 
        onDelete={handleDelete}
      />
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

const Persons = ({ data, onDelete }) => (
  data.map(({ name, number, id }) => (
     <Fragment key={name+id} >
      <p>
        {`${name} ${number} `}
        <button 
          onClick={() => onDelete({ name, id })}
        >
          delete
        </button>
      </p>
    </Fragment>
)));

export default App;