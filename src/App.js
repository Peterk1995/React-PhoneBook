import {useState, useEffect} from 'react'

import noteService from './services/persons'

// Just a comment I added in


const Header = () => {
  return (
  <h1> PhoneBook </h1>
  )
}

const PersonForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        name: <input 
          value={props.newName}
          onChange={props.handleNoteChange}
        />
        phone: <input
          value={props.newNumber}
          onChange={props.handleNumberChange}
        />
        <button type="submit">Save</button>
      </div>
    </form>
  )
}

const Person = ({ name, number }) => {
  return (
    <div>
      <p>{name} | Number: {number}</p>
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  useEffect(() => {
    noteService
    .getAll()
    .then(response => {
      console.log(response.data)  // Log the data to the console
      setPersons(response.data)
    })
  }, [])

  const addPersons = (event) => {
    event.preventDefault()
    console.log('i clicked the button', event.target.value)
    const newPerson = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }

    const isDuplicate = persons.some(p => p.name === newPerson.name)

  if (isDuplicate) {
  alert(`${newName} This name is already in the phonebook`) 
  return
  } else {
  console.log('This name is not a duplicate')
}
    // reset newNumber to an empty string
      // reset newName to an empty string

      setPersons(persons => [...persons, newPerson])
      noteService
        .create(newPerson)
        .then(returnedPerson => {
          setNewNumber('')
          setNewName('')
        })
        .catch(error => {
          console.error(error)
          setPersons(persons => persons.filter(p => p.name !== newPerson.name))
          alert('An error occurred while saving the person')
        })
  }

  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }



  const handleSubmit = (event) => {
    event.preventDefault()
    addPersons(event)
    // reset newNumber to an empty string
  }

  return(
    
    <div>
      <Header/>
      <PersonForm
       handleSubmit={handleSubmit}
       newName={newName}
       newNumber={newNumber}
       handleNoteChange={handleNoteChange}
       handleNumberChange={handleNumberChange}
       
      />
   
    <h2>Numbers</h2>
    <div>
    <h3>
    {persons.map((p) => (
  <Person key={p.id} name={p.name} number={p.number} />
))}

    </h3>
    </div>
    
  </div>

  )
}

export default App
