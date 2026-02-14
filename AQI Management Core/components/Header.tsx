import React from 'react';

export const Header: React.FC = () => {
    return (
        <header className="bg-[#2c3e50] text-white p-4 text-center">
            <h1 className="text-2xl font-bold m-0">Agri-Burn Logic Prototype</h1>
            <p className="m-0 opacity-80">Simulating Stubble Burning Coordination for Delhi NCR</p>
        </header>
    );
};