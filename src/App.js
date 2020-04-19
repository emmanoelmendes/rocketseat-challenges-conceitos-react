import React, { useState, useEffect } from "react";
import axios from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    axios.get('repositories').then(response => {
      setRepositories(response.data)
    })
  }, [])

  async function handleAddRepository() {
    const response = await axios.post('repositories', {
      title: `novo project ${new Date()}`,
      url: `url${new Date()}`,
      techs: []
    })

    setRepositories([...repositories, response.data])
  }

  async function handleRemoveRepository(id) {
    const repositoryIndex = repositories.findIndex(
      (repository) => repository.id === id
    )

    const response = await axios.delete(`repositories/${id}`);
  
    if (response.status === 204) {
      repositories.splice(repositoryIndex, 1)
      setRepositories([...repositories])
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}>
            {repository.title}

            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
        
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
