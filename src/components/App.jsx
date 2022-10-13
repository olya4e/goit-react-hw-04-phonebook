import { useState } from "react"
import { nanoid } from "nanoid";
import { ContactForm } from './ContactForm/ContactForm '
import { ContactList } from "./ContactList/ContactList"
import { Filter } from "./Filter/Filter";
import { LOCALSTORAGE_KEY } from "../constants/constants";
import css from './ContactForm/ContactForm.module.css'

export const App = () => {
  const [contacts, setContacts] = useState([])
  const [filter, setFilter] = useState('')

  const addContact = (name, number) => {
    let isAdded = false
    let newContact = {
      id: nanoid(),
      name: name,
      number: number,
    }
    contacts.map((contact) =>{
      if (contact.name.toLowerCase() === name.toLowerCase()) {
        isAdded = true
        alert(`${name} is already in contacts`)
      }})
    if (!isAdded) {
      return setContacts(prev => [...prev, newContact])
    }
   
  }
  

  const handleSubmitForm = (e) => {
    e.preventDefault()
    const { name, number } = e.target.elements
    addContact(name.value, number.value)
    name.value = ''
    number.value = ''
  }
  const handleChangeInput = (e) => {
      const{name, value}=e.target
    setContacts(name=value)
  }
  const handleChangeFilter = (e) => {
    setFilter(e.target.value)
  }
  const onDeleteContact = (deelteContact) => {
    setContacts(prevState =>
      prevState.filter(contact => contact.id !== deelteContact))
  }
  const onFilterContact = () => {
    if (contacts) {
      return contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase()),
    );
    }
  }
  
  return (
      <div className={css.container}>
  <h1>Phonebook</h1>
        <ContactForm onSubmit={handleSubmitForm} onChange={handleChangeInput}/>
        <h2>Contacts</h2>
        <Filter value={filter} handleChangeFilter={handleChangeFilter} />
        <ContactList contacts={onFilterContact()} onDeleteContact={onDeleteContact} /> 
      </div> 
    )
}

