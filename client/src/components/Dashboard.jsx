import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [userEmail, setUserEmail] = useState('');
  const [sharedAccounts, setSharedAccounts] = useState([]);

  useEffect(() => {
    const fetchSharedAccounts = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/users/shared', { withCredentials: true });
        setUserEmail(res.data.user);
        setSharedAccounts(res.data.sharedAccounts);
      } catch (error) {
        console.error(error.response.data);
      }
    };

    fetchSharedAccounts();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:5000/api/users/logout', {}, { withCredentials: true });
      alert('Logged out successfully');
      window.location.href = '/';  // Redirect to the landing page or login page
    } catch (error) {
      console.error('Logout error:', error.response.data);
    }
  };

  const handleRevoke = async (account) => {
    try {
      await axios.post('http://localhost:5000/api/users/revoke', { account }, { withCredentials: true });
      alert('Account access revoked successfully');
      // Update the shared accounts list after revocation
      setSharedAccounts(sharedAccounts.filter(acc => acc !== account));
    } catch (error) {
      console.error('Revoke error:', error.response.data);
    }
  };

  return (
    <div className="bg-slate-900 py-16 text-white px-8 min-h-screen">
      <div className="max-w-7xl mx-auto flex flex-col gap-8">
        
        {/* Dashboard Header */}
        <h1 className="text-5xl font-bold mb-8">Dashboard</h1>
        
        {/* User Email Display */}
        <div className="text-2xl mb-6 flex gap-7">
          {userEmail && (
            <>
              <span className="font-semibold">Logged in as: {userEmail}</span>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Logout
              </button>
            </>
          )}
        </div>
        
        {/* Shared Accounts Section */}
        <div>
          <h2 className="text-3xl font-bold mb-4">Users' Account</h2>
          <ul className="list-disc pl-6">
            {sharedAccounts.length > 0 ? (
              sharedAccounts.map((account, index) => (
                <li key={index} className="text-xl mb-2 flex justify-between">
                  {account}
                  <button
                    onClick={() => handleRevoke(account)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Revoke Access
                  </button>
                </li>
              ))
            ) : (
              <li className="text-xl">No shared accounts available</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
