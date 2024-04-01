import React, { useState } from "react";
import { ToastContainer, toast, Bounce } from "react-toastify";

function AddContact({ onAddContact }) {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    street: "",
    suite: "",
    city: "",
    zipcode: "",
    phone: "",
    website: "",
    companyName: "",
    catchPhrase: "",
    business: "",
    lat: "37.7749",
    lng: "-122.4194",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("https://jsonplaceholder.typicode.com/users/", {
      method: "POST",
      body: JSON.stringify({
        name: formData.name,
        username: formData.username,
        email: formData.email,
        address: {
          street: formData.street,
          suite: formData.suite,
          city: formData.city,
          zipcode: formData.zipcode,
          geo: {
            lat: "37.7749",
            lng: "-122.4194",
          },
        },
        phone: formData.phone,
        website: formData.website,
        company: {
          name: formData.companyName,
          catchPhrase: formData.catchPhrase,
          bs: formData.business,
        },
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("New contact added:", data);
        onAddContact(data);
        // Reset form fields
        setFormData({
          name: "",
          username: "",
          email: "",
          street: "",
          suite: "",
          city: "",
          zipcode: "",
          phone: "",
          website: "",
          companyName: "",
          catchPhrase: "",
          business: "",
        });
      })
      .catch((error) => {
        console.error("Error adding contact:", error);
      });
    toast.success("New Data Added!", {
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

  return (
    <div>
      <h2>Add New Contact</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="text"
          name="street"
          placeholder="Street"
          value={formData.street}
          onChange={handleChange}
        />
        <input
          type="text"
          name="suite"
          placeholder="Suite"
          value={formData.suite}
          onChange={handleChange}
        />
        <input
          type="text"
          name="city"
          placeholder="City"
          value={formData.city}
          onChange={handleChange}
        />
        <input
          type="text"
          name="zipcode"
          placeholder="Zipcode"
          value={formData.zipcode}
          onChange={handleChange}
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
        />
        <input
          type="text"
          name="website"
          placeholder="Website"
          value={formData.website}
          onChange={handleChange}
        />
        <input
          type="text"
          name="companyName"
          placeholder="Company Name"
          value={formData.companyName}
          onChange={handleChange}
        />
        <input
          type="text"
          name="catchPhrase"
          placeholder="Catch Phrase"
          value={formData.catchPhrase}
          onChange={handleChange}
        />
        <input
          type="text"
          name="business"
          placeholder="Business"
          value={formData.business}
          onChange={handleChange}
        />
        <br />
        <button type="submit">Add Contact</button>
      </form>
    </div>
  );
}

export default AddContact;
