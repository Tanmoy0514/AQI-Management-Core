import React from 'react';
import { Construction } from 'lucide-react';

const PlaceholderView: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center space-y-6 opacity-60">
        <Construction size={80} className="animate-pulse opacity-50" />
        <div>
            <h2 className="text-3xl font-bold">Module Offline</h2>
            <p>This section is currently under development.</p>
        </div>
    </div>
  );
};

export default PlaceholderView;