import React, { useState, useEffect } from 'react';

const UserSalesModal = ({ customerId, user, closeModal }) => {
  const [sales, setSales] = useState([]);

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const response = await fetch(`http://localhost:8000/user/${customerId}/sales`);
        const data = await response.json();

        // Convert the 'total' field from string to number
        const formattedData = data.map(sale => ({
          ...sale,
          total: parseFloat(sale.total)
        }));

        setSales(formattedData);
      } catch (error) {
        console.error('Error fetching sales:', error);
      }
    };

    fetchSales();
  }, [customerId]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 cursor-default">
      <div className="bg-white p-8 w-1/2 rounded shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Ventes de {user.first_name} {user.last_name}</h2>
        <ul className="flex flex-col gap-4">
          {sales.map((sale) => (
            <li className="border p-4 rounded shadow bg-white" key={sale.sale_id}>
              <div className="font-bold">Vente {sale.sale_id}</div>
              <div><span className="font-bold">Date:</span> {sale.completed_at}</div>
              <div><span className="font-bold">Total:</span> {sale.total.toFixed(2)} {sale.currency}</div>
            </li>
          ))}
        </ul>
        <button className="bg-blue-500 text-white px-4 py-2 mt-4 cursor-pointer" onClick={closeModal}>
          Close
        </button>
      </div>
    </div>
  );
};

export default UserSalesModal;
