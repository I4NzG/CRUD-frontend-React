import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = { email, password };

    try {
      const response = await fetch('http://localhost:4023/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        throw new Error('Email o contraseña no válidos');
      }

      const result = await response.json();
      alert(`Inicio de sesión exitoso: ${result.message}`);
      localStorage.setItem('token', result.token);
      navigate('/dashboard'); // Redirige al dashboard después del inicio de sesión exitoso
    } catch (error) {
      alert(error.message);
    }
  };

  const handleRegister =  () => {
    navigate('/register');
  };

  const handleUpdatePassword = () => {
    navigate('/UpdatePassword');
  };

  return (
    <div>
      <h1>Iniciar Sesión</h1>
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
        <button type="submit">Iniciar Sesión</button>
        <button onClick={handleRegister}>Registrarse</button>
        <button onClick={handleUpdatePassword}>Olvide mi contraseña</button> 
        
      </form>
    </div>
  );
}

export default Login;
