"use client"
// ./src/app/page.tsx
import React, { useState, useEffect } from 'react';
import UserCard from './components/UserCard';
import { useAuth } from "./pages/api/auth/[...nextauth].js";
import { useRouter } from "next/navigation";

const Home = () => {
  const session = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!session) {
      // Redirect to the login page if the user is not authenticated.
      router.push("/login");
    }
  }, [session, router]);

  if (!session) {
    return null;
  }

  const [lastName, setLastName] = useState('');
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    try {
      if (!lastName) {
        // If the search input is empty, fetch all users
        const response = await fetch(`http://localhost:8000/users`);
        const data = await response.json();
        setUsers(data);
      } else {

        if (lastName.length < 3) {
            setError('Please enter at least 3 characters');
            return;
        }
        // If there is a search input, perform the search
        const response = await fetch(`http://localhost:8000/users?last_name=${encodeURIComponent(lastName)}`);
        const data = await response.json();
        setUsers(data);
      }
    } catch (error) {
      setError('Error fetching users');
    }
  };

  useEffect(() => {
    handleSearch();
  });

    const handleKeyPress = (event) => {
        handleSearch();
    };

  return (
    <div className="container mx-auto mt-4 p-4">
      <h1 className="text-3xl font-bold mb-4">Rechercher un client</h1>
      <div className="flex mb-4">
        <input
          type="text"
          className="border border-gray-400 p-2 w-full mr-2 rounded-lg"
          placeholder="Insérer un nom..."
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
      {error && <p className="text-red-500">{error}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {users.map((user) => (
          <UserCard key={user.customers_id} user={user} />
        ))}
      </div>
    </div>
  );
};
export default Home;
