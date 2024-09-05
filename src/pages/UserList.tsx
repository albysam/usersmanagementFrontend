import React, { useEffect, useState } from 'react';
import api from '../api'; // Adjust the import path as needed
import { Link } from 'react-router-dom';

interface User {
  id: number;
  name: string;
  email: string;
  createdAt: string; // Date string
  updatedAt: string; // Date string
}

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api.get('/users')
      .then(response => setUsers(response.data))
      .catch(err => setError('Error fetching users.'));
  }, []);

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      api.delete(`/users/${id}`)
        .then(() => setUsers(users.filter(user => user.id !== id)))
        .catch(err => setError('Error deleting user.'));
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">User List</h1>
      {error && <div className="text-red-500 text-center mb-4">{error}</div>}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
          <thead className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <tr>
              <th className="py-3 px-6 text-left font-semibold text-lg">Name</th>
              <th className="py-3 px-6 text-left font-semibold text-lg">Email</th>
              <th className="py-3 px-6 text-left font-semibold text-lg">Created At</th>
              <th className="py-3 px-6 text-left font-semibold text-lg">Updated At</th>
              <th className="py-3 px-6 text-left font-semibold text-lg">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id} className="border-b border-gray-300 hover:bg-gray-50">
                <td className="py-3 px-6">{user.name}</td>
                <td className="py-3 px-6">{user.email}</td>
                <td className="py-3 px-6">{new Date(user.createdAt).toLocaleString()}</td>
                <td className="py-3 px-6">{new Date(user.updatedAt).toLocaleString()}</td>
                <td className="py-3 px-6 flex space-x-2">
                  <Link
                    to={`/edit/${user.id}`}
                    className="text-blue-500 hover:text-blue-700 font-semibold"
                  >
                    Edit
                  </Link>
                  <button
                    className="text-red-500 hover:text-red-700 font-semibold"
                    onClick={() => handleDelete(user.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;
