import React, { useState, useEffect } from 'react';

function Dashboard() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:4023/users', {
          method: 'GET',
          headers: {
            'Authorization': token,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error('Error fetching users');
        }

        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      <table>
        <thead>
          <tr>
            <th>Email</th>
            <th>Contraseña</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.user_id}>
              <td>{user.email}</td>
              <td>{user.password}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Dashboard;
