import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = {email, password };

    try {
      const response = await fetch('http://localhost:4023/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        throw new Error('Error al registrar el usuario');
      }

      const result = await response.json();
      alert(`Usuario registrado con ID: ${result.id}`);
      navigate('/login'); // Redirige al login después del registro exitoso
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div id>
      <h1>Registrar</h1>
      <form onSubmit={handleSubmit}>
          <div>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label>Contraseña:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit">Registrar</button>
        </form>
    </div>
  
    
  );
}

export default Register;
