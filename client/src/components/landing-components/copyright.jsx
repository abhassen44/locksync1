// components/Copyrights.jsx
import React from 'react';

const Copyrights = () => {
  return (
    <div className="max-w-4xl mx-auto my-16 p-4 text-center">
      <p className="text-sm text-gray-500">
        © {new Date().getFullYear()} Locksync. All rights reserved.
      </p>
    </div>
  );
};

export default Copyrights;
