import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';

import '../css/usage.css';

const Usage = () => {
  const [isHovering, setIsHovering] = useState(false);
  const containerRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const image = imageRef.current;

    const handleMouseEnter = () => {
      setIsHovering(true);
      gsap.to(image, {
        display: 'block',
        opacity: 1,
        scale: 1,
        duration: 0.5,
      });
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
      gsap.to(image, {
        opacity: 0,
        scale: 0.8,
        duration: 0.5,
        onComplete: () => gsap.set(image, { display: 'none' }),
      });
    };

    const handleMouseMove = (event) => {
      if (isHovering) {
        const rect = container.getBoundingClientRect();
        gsap.to(image, {
          x: event.clientX - rect.left - 230,
          y: event.clientY - rect.top - 100,
          duration: 0.6,
        });
      }
    };

    const handleResize = () => {
      if (window.innerWidth <= 768) {
        container.removeEventListener('mouseenter', handleMouseEnter);
        container.removeEventListener('mouseleave', handleMouseLeave);
        container.removeEventListener('mousemove', handleMouseMove);
      } else {
        container.addEventListener('mouseenter', handleMouseEnter);
        container.addEventListener('mouseleave', handleMouseLeave);
        container.addEventListener('mousemove', handleMouseMove);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
      container.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, [isHovering]);

  return (
    <div className="flex flex-col xl:flex-row xl: xl:justify-between bg-green-600 text-black min-h-screen px-4 md:px-40 gap-0" ref={containerRef}>
      <div className="w-full xl:max-w-[30vw] my-5 flex flex-col gap-2 md:gap-28 mx-0">
        <h1 className="heading text-3xl md:text-5xl mb-2 md:mb-4 font-poppins font-bold mt-8 md:mt-14 text-black">
          Experience Unmatched Security and Seamless Syncing with Locksync
        </h1>
       
      </div>
      <div className="w-full md:max-w-xl my-5 flex flex-col justify-start gap-10 md:gap-40 text-black">
        <div className="right-elem">
          <h2 className="text-lg font-bold mb-3 text-white">Why Use Locksync?</h2>
          <p className="text-base md:text-lg font-bold">
            In today's digital age, data security and accessibility are paramount. Locksync offers a seamless, secure, and efficient way to sync and share your files across multiple devices. With our state-of-the-art encryption, you can be assured that your data is safe from prying eyes. Our platform is designed to be user-friendly, allowing you to easily manage your files with just a few clicks. Whether you're collaborating with colleagues, sharing photos with family, or just looking for a reliable backup solution, Locksync has got you covered. Experience the peace of mind that comes with knowing your data is protected and always accessible whenever and wherever you need it.
          </p>
        </div>
        <div className="right-elem">
          <h2 className="text-lg font-bold mb-3 text-white">How to Use Locksync?</h2>
          <p className="text-base md:text-lg font-bold">
            Using Locksync is simple and straightforward. Just sign up for an account, upload your files, and start sharing them securely with others. Our intuitive interface and robust features make file management effortless and efficient, ensuring you stay organized and in control.
          </p>
        </div>
      </div>
      <img
        ref={imageRef}
        src="https://image.lexica.art/full_webp/848bf230-437a-454d-9652-982173366162"
        alt="Locksync Usage"
        className="absolute pointer-events-none hidden md:block"
        style={{
          display: 'none',
          opacity: 0,
          scale: 0.8,
          width: '200px',
          height: '200px',
          borderRadius: '50%',
          objectFit: 'cover',
        }}
      />
    </div>
  );
};

export default Usage;
