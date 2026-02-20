import React from 'react';
import { Construction } from 'lucide-react';

interface GovernmentPortalProps {
  darkMode: boolean;
}

const GovernmentPortal: React.FC<GovernmentPortalProps> = ({ darkMode }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center space-y-6 opacity-60">
        <Construction size={64} className="text-blue-500 animate-pulse" />
        <div>
            <h2 className="text-2xl font-bold">Portal Under Construction</h2>
            <p>This module is currently being integrated with global satellite data.</p>
        </div>
    </div>
  );
};

export default GovernmentPortal;