import React, { useState, useEffect } from "react"
import PersonForm from './components/PersonForm'
import People from './components/People'
import Filter from './components/Filter'
import Notification from './components/Notification'

import peopleService from './services/people'

const App = () => {
  const [people, setPeople] = useState([])
  const [newName, setNewName] = useState("")
  const [number, setNumber] = useState("")
  const [filter, setFilter] = useState("")
  const [notification, setNotification] = useState(null)

  const handleChange = (setState) =>
    (event) =>
      setState(event.target.value)
  
  const showNotification = (content, type = 'success') => {
    setNotification({
      content,
      type
    })
    setTimeout(() => {
      setNotification(null);
    }, 3000)
  }

  const handleDelete = ({ name, id: idToDelete }) => {
    const isConfirmed = window.confirm(`Delete ${name}?`)
    
    if(!isConfirmed) return

    peopleService
      .deleteOne(idToDelete)
      .then(() => {
        setPeople(people.filter(({ id }) => id !== idToDelete))

        showNotification('Contact succesfully deleted', 'success')
      })
      .catch(error => {
        if(error.response.status === '404') {
          setPeople(people.filter(({ id }) => id !== idToDelete))
          showNotification(`Information of ${name} has already been removed from server`, 'error')
          return 
        }
        if(error.message.includes('Error')) {
          console.error(`Unable to delete contact: ${error}`)
          showNotification(`Something went wrong, try refreshing the page :(`, 'error')
          return 
        }
      })
  }

  const handleSubmit = event => {
    event.preventDefault()

    const addedPerson = people.find(({ name }) => name === newName)

    if(!newName.trim()) return
    
    if(addedPerson) {
      const confirmUpdate = window.confirm(`${addedPerson.name} is already added to phonebook, replace the old number with a new one?`)
      
      if(!confirmUpdate) return

      return peopleService
        .updateOne(
          addedPerson.id, 
          { 
            ...addedPerson,
            number
          }
        )
        .then(updatedPerson => {
          const newPeople = [...people]
          const personRef = newPeople.find(({ id }) => id === updatedPerson.id)
          personRef.number = number
          
          setPeople(newPeople)

          setNewName("");
          setNumber("");
          showNotification(`Updated ${updatedPerson.name}`, 'success')
        })
        .catch(error => {
          showNotification(error.response.data.error, 'error')
        })
    }

    peopleService
      .createOne({
        name: newName,
        number,
      })
      .then(({ name, number, id }) => {
        setPeople((people) => [
          ...people,
          {
            name,
            number,
            id,
          },
        ]);

        setNewName("");
        setNumber("");
        showNotification(`Added ${name}`, "success");
      })
      .catch(error => {
        showNotification(error.response.data.error, "error");
      });
  }

  let filteredPeople = people

  if(filter.trim()) {
    filteredPeople = people.filter(({ name }) => 
      name.toLocaleLowerCase().includes(filter.toLocaleLowerCase())
    )
  }

  useEffect(() => {
    peopleService
      .getAll()
      .then(data => {
        setPeople(data)
      })
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification} />
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
      <People 
        data={filteredPeople} 
        onDelete={handleDelete}
      />
    </div>
  )
}

export default App