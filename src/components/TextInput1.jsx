import React from 'react';

export default function TextInput1({ label, value, onChange, ...prop }) {
    console.log('Rendering TextInput1 for ${label}:', value);
    return (
      <div className="mb-4 relative flex flex-col">
        <div className="flex items-center mb-2">
          <div className="w-40 flex-shrink-0 pr-2 flex justify-between items-center">
            <span className="text-black font-semibold sm:text-sm whitespace-nowrap">{label}</span>
            <span className="ml-1">:</span>
          </div>
          <input 
            className="flex-grow bg-neutral pl-2 py-1 w-[300px] rounded-md border border-purple-200 focus:outline-purple-200 text-black font-medium sm:text-sm"
            name={label}
            placeholder={`Enter your ${label.toLowerCase()} here`}
            value={value}
            onChange={(e) => {
                console.log(`Input changed for ${label}:`, e.target.value);
                onChange(e);
              }}
            {...prop}
          />
        </div>
      </div>
    );
  }