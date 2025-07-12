// LoadingSpinner.jsx
import React from 'react';
import { Loader, Bell } from 'lucide-react';

export function LoaderSpinner() {
  return (
    <div className="flex justify-center items-center p-6">
      {/* apply Tailwind's spin animation */}
      <Loader className="animate-spin text-blue-600" size={48} />
    </div>
  );
}
