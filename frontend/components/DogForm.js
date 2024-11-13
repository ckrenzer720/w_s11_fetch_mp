import { useAnimate } from "framer-motion";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const initialForm = { name: "", breed: "", adopted: false };

// Use this form for both POST and PUT requests!
export default function DogForm({ dog, reset, fetchDogs }) {
  const navigate = useNavigate();
  const [values, setValues] = useState(initialForm);
  const [breeds, setBreeds] = useState([]);
  useEffect(() => {
    fetch("/api/dogs/breeds")
      .then((res) => res.json())
      .then((data) => setBreeds(data.toSorted()))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (dog) setValues(dog);
    else setValues(initialForm);
  }, [dog]);

  const PUTdog = () => {};
  const POSTdog = () => {};

  const onSubmit = (event) => {
    event.preventDefault();
    const click = dog ? PUTdog : POSTdog;
    click();
  };
  const onChange = (event) => {
    const { name, value, type, checked } = event.target;
    setValues({
      ...values,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const onReset = (evt) => {
    evt.preventDefault();
    setValues(initialForm);
    reset;
  };

  return (
    <div>
      <h2>{dog ? "Update Dog" : "Create Dog"}</h2>
      <form onSubmit={onSubmit}>
        <input
          name="name"
          value={values.name}
          onChange={onChange}
          placeholder="Name"
          aria-label="Dog's name"
        />
        <select
          name="breed"
          value={values.breed}
          onChange={onChange}
          aria-label="Dog's breed"
        >
          <option value="">---Select Breed---</option>
          {breeds.map((breed) => (
            <option key={breed}>{breed}</option>
          ))}
        </select>
        <label>
          Adopted:{" "}
          <input
            type="checkbox"
            name="adopted"
            checked={values.adopted}
            onChange={onChange}
            aria-label="Is the dog adopted?"
          />
        </label>
        <div>
          <button type="submit">{dog ? "Update Dog" : "Create Dog"}</button>
          <button onClick={onReset} aria-label="Reset form">
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}
