
import React from 'react';
import { BEAD_SIZE_TW_UNIT } from '../constants';

interface BeadProps {
  onClick: () => void;
}

const Bead: React.FC<BeadProps> = ({ onClick }) => {
  const beadBaseClasses = "rounded-full cursor-pointer transition-all duration-150 ease-in-out transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-amber-200 focus:ring-opacity-75";
  const beadSizeClasses = `w-${BEAD_SIZE_TW_UNIT} h-${BEAD_SIZE_TW_UNIT}`; // e.g., w-6 h-6
  const beadColorClasses = "bg-amber-400 hover:bg-amber-300 shadow-md";

  return (
    <div
      onClick={onClick}
      className={`${beadBaseClasses} ${beadSizeClasses} ${beadColorClasses}`}
      role="button"
      tabIndex={0}
      onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault(); // Prevent page scroll on space
          onClick();
        }
      }}
    ></div>
  );
};

export default Bead;
