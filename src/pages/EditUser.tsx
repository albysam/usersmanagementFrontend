import React, { useState, useEffect } from 'react';
import api from '../api';
import { useNavigate, useParams } from 'react-router-dom';

const EditUser: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<{ name: string; email: string; password: string } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    api.get(`/users/${id}`)
      .then(response => setUser(response.data))
      .catch(() => navigate('/'));
  }, [id, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (user) {
      api.put(`/users/${id}`, user)
        .then(() => navigate('/'))
        .catch(error => {
          if (error.response && error.response.status === 409) {
            setError('Email already in use by another user.');
          } else {
            setError('Error updating user.');
          }
        });
    }
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Edit User</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="mb-4">
          <label className="block text-lg font-medium mb-1">Name:</label>
          <input
            type="text"
            value={user.name}
            onChange={e => setUser({ ...user, name: e.target.value })}
            required
            className="border border-gray-300 p-2 w-full rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-lg font-medium mb-1">Email:</label>
          <input
            type="email"
            value={user.email}
            onChange={e => setUser({ ...user, email: e.target.value })}
            required
            className="border border-gray-300 p-2 w-full rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-lg font-medium mb-1">Password:</label>
          <input
            type="password"
            value={user.password}
            onChange={e => setUser({ ...user, password: e.target.value })}
            required
            className="border border-gray-300 p-2 w-full rounded"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default EditUser;
