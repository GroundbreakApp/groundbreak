import React, { useState } from 'react';
import axios from 'axios';

const Form = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log("Submit clicked")
    try {
        console.log("Making get call to zoom")

        const response = await axios.post('https://groundbreak.onrender.com/metrics/zoom', null, {
        params: {
            firstName: firstName,
            lastName: lastName,
            email: email,
        },
        });

        console.log(response)
        setFirstName('');
        setLastName('');
        setEmail('');
    } catch (error) {
        console.error('Error joining Zoom webinar:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="firstName">First Name:</label>
        <input
          type="text"
          id="firstName"
          value={firstName}
          onChange={(event) => setFirstName(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="lastName">Last Name:</label>
        <input
          type="text"
          id="lastName"
          value={lastName}
          onChange={(event) => setLastName(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default Form;


