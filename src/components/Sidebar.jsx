import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash, Sun, User, ArrowSquareOut, LogOut } from 'lucide-react';

const Sidebar = ({ onNewCase }) => {
  const navigate = useNavigate();

  const handleNewCase = () => {
    onNewCase();
    navigate('/');
  };

  const handleViewCases = () => {
    navigate('/view-cases');
  };

  return (
    <div className="w-[282px] h-screen bg-gradient-to-b from-[#F2F2F2] to-[#F2F2F2] border-r border-gray-200 flex flex-col justify-between p-5">
      {/* Top Section */}
      <div className="flex flex-col gap-4">
        {/* Logo Section */}
        <div className="flex items-center justify-center py-4">
          <div className="text-2xl font-semibold text-primary">
            SaluLink
          </div>
        </div>

        {/* New Case Button */}
        <button
          onClick={handleNewCase}
          className="w-full bg-secondary text-white px-4 py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-secondary-light transition-colors"
        >
          <span className="text-lg">+</span>
          <span className="text-base">New Case</span>
        </button>

        {/* View Cases Button */}
        <button
          onClick={handleViewCases}
          className="w-full bg-secondary text-white px-4 py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-secondary-light transition-colors"
        >
          <span className="text-base">View Cases</span>
        </button>
      </div>

      {/* Bottom Section - Menu Items */}
      <div className="flex flex-col gap-1 border-t border-gray-300 pt-4">
        <button className="w-full flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-white/50 transition-colors">
          <Trash size={20} className="text-gray-700" />
          <span className="text-sm text-gray-700">Clear conversations</span>
        </button>

        <button className="w-full flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-white/50 transition-colors">
          <Sun size={20} className="text-gray-700" />
          <span className="text-sm text-gray-700">Light mode</span>
        </button>

        <button className="w-full flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-white/50 transition-colors">
          <User size={20} className="text-gray-700" />
          <span className="text-sm text-gray-700">My account</span>
        </button>

        <button className="w-full flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-white/50 transition-colors">
          <ArrowSquareOut size={20} className="text-gray-700" />
          <span className="text-sm text-gray-700">Updates & FAQ</span>
        </button>

        <button className="w-full flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-white/50 transition-colors">
          <LogOut size={20} className="text-gray-700" />
          <span className="text-sm text-gray-700">Log out</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;

