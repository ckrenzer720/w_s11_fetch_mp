/* 
https 'Hyper Text Tranfer Protocol Safe/Secure'
TCP/IP 'transmission control protocol, internet protocol
DNS 'Domain Name System' -- Turns Domain names into IP Addresses -> Google Amazon etc
Status Codes => {
  100s - Information requests -> when server recieves requests and processes
  200s - Successful requests
  300s = Redirects if websites have moveed to other domain names
  400s = Client Erros -> if here, something on your end (frontend) is broken
  500s = Server Erros -> if here, something on the backend is broken
}
*/

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function DogsList({ dogs, fetchDogs, setCurrentID }) {
  const navigate = useNavigate();
  const editDogButton = (id) => {
    // set the id as the current id
    setCurrentID(id);
    // navigate to the form
    navigate("form");
  };
  const deleteDogButton = (id) => {
    fetch(`/api/dogs/${id}`, { method: "DELETE" })
      .then((res) => {
        if (!res.ok) throw new Error("Problem DELETing");
        fetchDogs();
        setCurrentID(null);
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <h2>Dogs Shelter</h2>
      <ul>
        {dogs.map((dog) => (
          <li key={dog.id}>
            {dog.name}, {dog.breed}, {dog.adopted ? "" : "NOT"} adopted
            <div>
              <button onClick={() => editDogButton(dog.id)}>Edit</button>
              <button onClick={() => deleteDogButton(dog.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
