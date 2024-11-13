import React, { useState, useEffect } from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import DogForm from "./DogForm";
import DogsList from "./DogsList";

export default function App() {
  const [dogs, setDogs] = useState([]);
  const [currentID, setCurrentID] = useState(null);

  useEffect(() => {
    fetchDogs();
  }, []);

  const fetchDogs = () => {
    fetch("/api/dogs")
      .then((res) => {
        if (!res.ok) throw new Error("Problem GETing dogs");
        return res.json();
      })
      .then((data) => setDogs(data))
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <nav>
        <NavLink to="/">Dogs</NavLink>
        <NavLink to="/form">Form</NavLink>
      </nav>
      <Routes>
        <Route
          path="/"
          element={
            <DogsList
              dogs={dogs}
              fetchDogs={fetchDogs}
              setCurrentID={setCurrentID}
            />
          }
        />
        <Route
          path="/form"
          element={
            <DogForm
              dog={currentID && dogs.find((dog) => dog.id == currentID)}
              fetchDogs={fetchDogs}
              onReset={() => setCurrentID(null)}
            />
          }
        />
      </Routes>
    </div>
  );
}
