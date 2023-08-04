import React, { useState } from 'react';
import UserSalesModal from './UserSalesModal';

const UserCard = ({ user }) => {
  const [showModal, setShowModal] = useState(false);

  const handleCardClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="border p-4 rounded shadow bg-white cursor-pointer" onClick={handleCardClick}>
      <h3 className="text-xl font-semibold mb-2">{user.first_name} {user.last_name}</h3>
      <p>Email: {user.email}</p>
      <p>Phone: {user.phone}</p>
      <p>Country: {user.country}</p>

      {showModal && (
        <UserSalesModal customerId={user.customers_id} closeModal={handleCloseModal} showModal={showModal} user={user} />
      )}
    </div>
  );
};

export default UserCard;
