import React, { useState } from "react";
import { ToastContainer, toast, Bounce } from "react-toastify";

function Contacts({ contact, setContacts }) {
  const [editing, setEditing] = useState(false);
  const [editedContact, setEditedContact] = useState(contact);
  const handleDelete = () => {
    fetch(`https://jsonplaceholder.typicode.com/users/${contact.id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => console.log(data));

    setContacts((prevContacts) =>
      prevContacts.filter((c) => c.id !== contact.id)
    );
    toast.success("User Deleted!", {
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
  };
  //edit function will work on clicking the save button
  const handleEdit = () => {
    fetch(`https://jsonplaceholder.typicode.com/users/${contact.id}`, {
      method: "PUT",
      body: JSON.stringify(editedContact),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => console.log(json));

    setContacts((prevContacts) =>
      prevContacts.map((c) => (c.id === editedContact.id ? editedContact : c))
    );
    setEditing(false);

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
  };
  //handling the input change for editing if it has a nested name in the input box.
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const nestedNames = name.split(".");
    if (nestedNames.length === 1) {
      setEditedContact((prevContact) => ({
        ...prevContact,
        [name]: value,
      }));
    } else if (nestedNames.length === 2) {
      setEditedContact((prevContact) => ({
        ...prevContact,
        [nestedNames[0]]: {
          ...prevContact[nestedNames[0]],
          [nestedNames[1]]: value,
        },
      }));
    }
  };

  return (
    <>
      <div
        style={{
          border: "1px solid black",
          width: "500px",
          margin: "2px",
          padding: "5px",
        }}
      >
        {/* if editing is true it will enter the input boxes display or else it will display the data */}
        {editing ? (
          <>
            <input
              type="text"
              name="name"
              value={editedContact.name}
              onChange={handleInputChange}
              placeholder="Name"
            />
            <input
              type="text"
              name="username"
              value={editedContact.username}
              onChange={handleInputChange}
              placeholder="Username"
            />
            <input
              type="email"
              name="email"
              value={editedContact.email}
              onChange={handleInputChange}
              placeholder="Email"
            />

            <input
              type="text"
              name="address.street"
              value={editedContact.address.street}
              onChange={handleInputChange}
              placeholder="Street"
            />
            <input
              type="text"
              name="address.suite"
              value={editedContact.address.suite}
              onChange={handleInputChange}
              placeholder="Suite"
            />
            <input
              type="text"
              name="address.city"
              value={editedContact.address.city}
              onChange={handleInputChange}
              placeholder="City"
            />
            <input
              type="text"
              name="address.zipcode"
              value={editedContact.address.zipcode}
              onChange={handleInputChange}
              placeholder="Zipcode"
            />
            <input
              type="tel"
              name="phone"
              value={editedContact.phone}
              onChange={handleInputChange}
              placeholder="Phone"
            />
            <input
              type="text"
              name="website"
              value={editedContact.website}
              onChange={handleInputChange}
              placeholder="Website"
            />
            <input
              type="text"
              name="company.catchPhrase"
              value={editedContact.company.catchPhrase}
              onChange={handleInputChange}
              placeholder="Catch Phrase"
            />
            <input
              type="text"
              name="company.bs"
              value={editedContact.company.bs}
              onChange={handleInputChange}
              placeholder="Business"
            />
            <input
              type="text"
              name="company.name"
              value={editedContact.company.name}
              onChange={handleInputChange}
              placeholder="Company Name"
            />

            <br />
            <button onClick={handleEdit}>Save</button>
            <button onClick={() => setEditing(false)}>Cancel</button>
          </>
        ) : (
          <>
            <button onClick={handleDelete} style={{ float: "right" }}>
              DELETE
            </button>
            <button onClick={() => setEditing(true)} style={{ float: "right" }}>
              EDIT
            </button>

            {/* display of data through the map function from the app component   */}
            <p>ID: {contact.id}</p>
            <p>Name: {contact.name}</p>
            <p>Username: {contact.username}</p>
            <p>Email: {contact.email}</p>
            {/* had to use this function method to display the address details because it was showing undefined console.error */}
            {contact.address ? (
              <div>
                <p>
                  Address: {contact.address.street}, {contact.address.suite},{" "}
                  {contact.address.city}, {contact.address.zipcode}
                </p>
                <p>
                  Location: {contact.address.geo.lat}, {contact.address.geo.lng}
                </p>
              </div>
            ) : (
              <p>No address provided</p>
            )}
            <p>Phone: {contact.phone}</p>
            <p>Website: {contact.website}</p>
            <p>Catch Phrase: {contact.company.catchPhrase}</p>
            <p>Business: {contact.company.bs}</p>
            <p>Company Name: {contact.company.name}</p>
          </>
        )}
      </div>
    </>
  );
}

export default Contacts;
