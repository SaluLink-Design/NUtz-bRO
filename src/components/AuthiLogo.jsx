import React from 'react';

const AuthiLogo = ({ className = '' }) => {
  return (
    <div className={`flex flex-col items-center ${className}`}>
      {/* Authi Logo with Gradient */}
      <div className="relative w-28 h-28">
        <svg viewBox="0 0 115 116" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <circle cx="57.5" cy="58" r="50" fill="url(#gradient1)" opacity="0.8"/>
          <circle cx="57.5" cy="58" r="40" fill="url(#gradient2)" opacity="0.9"/>
          <circle cx="57.5" cy="58" r="30" fill="url(#gradient3)"/>
          
          <defs>
            <radialGradient id="gradient1" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(57.5 58) rotate(90) scale(50)">
              <stop offset="0%" stopColor="#9F62ED"/>
              <stop offset="100%" stopColor="#9F62ED" stopOpacity="0.44"/>
            </radialGradient>
            <radialGradient id="gradient2" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(57.5 58) rotate(90) scale(40)">
              <stop offset="0%" stopColor="#B98BF3"/>
              <stop offset="100%" stopColor="#CA90ED" stopOpacity="0"/>
            </radialGradient>
            <radialGradient id="gradient3" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(57.5 58) rotate(90) scale(30)">
              <stop offset="0%" stopColor="#FFFFFF"/>
              <stop offset="17%" stopColor="#FFFFFF"/>
              <stop offset="34%" stopColor="#CEA9FF"/>
              <stop offset="100%" stopColor="#9F62ED" stopOpacity="0"/>
            </radialGradient>
          </defs>
        </svg>
      </div>
      
      {/* Authi 1.0 Text */}
      <div className="mt-2">
        <h2 className="text-4xl font-normal text-gray-900">Authi 1.0</h2>
      </div>
    </div>
  );
};

export default AuthiLogo;

