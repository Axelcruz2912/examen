import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [pets, setPets] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://18.191.154.44/api/pets')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => setPets(data))
      .catch((error) => {
        console.error('Error fetching pets:', error);
        setError('No se pudieron cargar los datos.');
      });
  }, []);

  const filteredPets = pets.filter((pet) =>
    pet.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="App">
      <h1>Lista de Perros</h1>
      <input
        type="text"
        placeholder="Buscar por nombre..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {error ? (
        <p className="error-message">{error}</p>
      ) : (
        <div className="pet-list">
          {filteredPets.map((pet) => (
            <div key={pet.nombre} className="pet-card">
              <h2>{pet.nombre}</h2>
              <p>Edad: {pet.edad} años</p>
              <p>Raza: {pet.raza}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
