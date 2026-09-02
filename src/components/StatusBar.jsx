import React from 'react';
import { Wifi, Battery } from 'lucide-react';

export default function StatusBar() {
  return (
    <div className="flex justify-between items-center px-6 pt-3 pb-2 text-xs font-semibold text-gray-900 select-none">
      <span>9:41</span>
      <div className="flex items-center space-x-1.5">
        <Wifi className="w-3.5 h-3.5 stroke-[2.5]" />
        <div className="w-4 h-2.5 border border-gray-900 rounded-xs relative flex items-center p-0.5">
          <div className="h-full bg-gray-900 rounded-2xs w-3/4" />
          <div className="absolute -right-1 w-0.5 h-1 bg-gray-900 rounded-r-xs" />
        </div>
      </div>
    </div>
  );
}
