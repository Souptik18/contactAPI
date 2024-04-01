import React, { useState } from "react";
import Contacts from "../components/Contacts";
import AddContact from "../components/AddContact";
import { ToastContainer, toast, Bounce } from "react-toastify";
function App() {
  const [contacts, setContacts] = useState([]);

  //fetching all the contact array of objects with fetch feature

  function handleContacts() {
    fetch("https://jsonplaceholder.typicode.com/users/")
      .then((response) => response.json())
      .then((data) => setContacts(data));

    toast.success("Contacts Fetched!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  }

  function handleAddContact(newContact) {
    setContacts((prevContacts) => [...prevContacts, newContact]);
  }
  return (
    <div className="container-body">
      <h2>User Data Information</h2>

      <button
        style={{ margin: "10px", padding: "5px" }}
        onClick={() => handleContacts()}
      >
        Click to fetch Contacts
      </button>
      {/* mapping the contacts array of objects to display them on the screen */}
      <div className="container">
        {contacts.map((contact) => (
          <Contacts
            key={contact.id}
            contact={contact}
            setContacts={setContacts}
          />
        ))}
      </div>
      <br />
      <br />
      <AddContact onAddContact={handleAddContact} />
      <ToastContainer />
    </div>
  );
}

export default App;
