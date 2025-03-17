'use client'
// pages/users.js
import { useEffect, useState } from 'react';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch('/api/users/getUsers');
        if (!res.ok) {
          throw new Error('Failed to fetch users');
        }
        const data = await res.json();
        console.log(data)
        setUsers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div style={{ padding: '20px' }}>
      <h1>Users List</h1>
      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <table style={{ borderCollapse: 'collapse', width: '50%' }}>
          <thead>
            <tr>
              <th style={{ border: '1px solid black', padding: '8px' }}>Username</th>
              <th style={{ border: '1px solid black', padding: '8px' }}>Password</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td style={{ border: '1px solid black', padding: '8px' }}>{user.username}</td>
                <td style={{ border: '1px solid black', padding: '8px' }}>{user.password}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <p>
        <a href="/">Back to Register</a>
      </p>
    </div>
  );
}