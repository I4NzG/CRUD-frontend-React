import React, { useState } from 'react';

function UpdatePassword() {
  const [email, setEmail] = useState('');  // Correcto uso de useState
  const [password, setPassword] = useState('');  

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert('Por favor, complete ambos campos');
      return;
    }

    const user = { password };

    try {
      const response = await fetch(`http://localhost:4023/user/${email}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al actualizar la contraseña');
      }
      
      alert(`Usuario con email: ${email} actualizado!`);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div>
      <h1>Recuperar Contraseña</h1>
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
        <button type="submit">Actualizar contraseña</button>
      </form>
    </div>
  );
}

export default UpdatePassword;
