// components/Contact.jsx
import React from 'react';

const Contact = () => {
  return (
    <div className="text-white py-16 px-8">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-start gap-8">
        
        {/* Main Contact Info Section */}
        <div className="flex-1 mb-8 lg:mb-0">
          <h2 className="text-4xl font-bold mb-4">Want to collabrate in our app Contact Us!</h2>
          <p className="text-lg mb-4">We'd love to hear from you! Drop us a line at:</p>
          <div className="mb-4">
            <a href="https://mail.google.com/mail/u/0/?tab=rm&ogbl#inbox?compose=CllgCHrlFSrJZSQWgzHpNMqqkLBWpjPRGWkSrMVDrvLdrlLCTptBtppjmcBHrCRpGNxjzhJzhHg" className="text-lg text-gray-300 underline hover:text-white">
            abhassen44@gmail.com
            </a>
          </div>
          <p className="text-lg mb-2">Our Social:</p>
          <div className="flex flex-wrap gap-4">
            <a href="https://www.linkedin.com/in/abhas-sen-1a0862282/" className="bg-gray-800 px-4 py-2 rounded-full hover:bg-gray-700">LinkedIn</a>
            <a href="https://github.com/Abhas-Sen" className="bg-gray-800 px-4 py-2 rounded-full hover:bg-gray-700">GitHub</a>
            <a href="https://www.instagram.com/abhas_sen/" className="bg-gray-800 px-4 py-2 rounded-full hover:bg-gray-700">Instagram</a>
           
          </div>
        </div>

        {/* Location Section */}
        <div className="flex-1">
          <h3 className="text-2xl font-bold mb-4">Our Location:</h3>
          <p className="text-lg mb-2">JABALPUR,</p>
          <p className="text-lg mb-2">MADHYA PRADESH ,INDIA</p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
