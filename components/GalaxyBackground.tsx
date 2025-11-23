import React from 'react';

const GalaxyBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden bg-black">
      {/* Deep Space Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-[#1a103c] to-black opacity-90"></div>
      
      {/* Nebula Effects */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-900 rounded-full blur-[120px] opacity-30 animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-900 rounded-full blur-[120px] opacity-30 animate-pulse delay-700"></div>
      <div className="absolute top-[40%] left-[40%] w-[30%] h-[30%] bg-blue-900 rounded-full blur-[100px] opacity-20 animate-pulse delay-1000"></div>

      {/* Stars Layer (Simulated with radial gradients for performance) */}
      <div 
        className="absolute inset-0 opacity-50"
        style={{
          backgroundImage: `radial-gradient(white 1px, transparent 1px), radial-gradient(white 1px, transparent 1px)`,
          backgroundSize: '50px 50px, 100px 100px',
          backgroundPosition: '0 0, 25px 25px',
          animation: 'twinkle 5s infinite linear'
        }}
      ></div>
      
      <style>{`
        @keyframes twinkle {
          0% { opacity: 0.3; transform: translateY(0); }
          50% { opacity: 0.6; }
          100% { opacity: 0.3; transform: translateY(-20px); }
        }
      `}</style>
    </div>
  );
};

export default GalaxyBackground;
