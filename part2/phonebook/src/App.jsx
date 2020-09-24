import React, { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  const handleChange = event => setNewName(event.target.value)
  
  const handleSubmit = event => {
    event.preventDefault()

    setPersons(persons => ([
      ...persons,
      { name: newName },
    ]))
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input value={newName} onChange={handleChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(({ name }, idx) =>
        <p key={name+idx}>{name}</p>
      )}
    </div>
  );
};

export default App;