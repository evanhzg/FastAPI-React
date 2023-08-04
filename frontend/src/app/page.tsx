"use client"
// ./src/app/page.tsx
import React, { useState } from 'react';
import UserCard from './components/UserCard';

const Home = () => {
  const [lastName, setLastName] = useState('');
  const [users, setUsers] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await fetch(`http://localhost:8000/users?last_name=${encodeURIComponent(lastName)}`);
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  return (
    <div className="container mx-auto mt-4 p-4">
      <h1 className="text-3xl font-bold mb-4">Rechercher un client</h1>
      <div className="flex mb-4">
        <input
          type="text"
          className="border border-gray-400 p-2 w-full mr-2"
          placeholder="Insérer un nom..."
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {users.map((user) => (
          <UserCard key={user.customers_id} user={user} />
        ))}
      </div>
    </div>
  );
};

export default Home;
