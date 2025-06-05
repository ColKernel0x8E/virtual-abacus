
import React from 'react';
import { BEAD_SIZE_TW_UNIT } from '../constants';
import useLongPress from '../hooks/useLongPress';

interface BeadProps {
  onClick: () => void;
  onLongPress: () => void;
  label?: string;
}

const Bead: React.FC<BeadProps> = ({ onClick, onLongPress, label }) => {
  const beadBaseClasses = "rounded-full cursor-pointer transition-all duration-150 ease-in-out transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-amber-200 focus:ring-opacity-75 relative flex items-center justify-center";
  const beadSizeClasses = `w-${BEAD_SIZE_TW_UNIT} h-${BEAD_SIZE_TW_UNIT}`; // e.g., w-6 h-6
  const beadColorClasses = "bg-amber-400 hover:bg-amber-300 shadow-md";

  const longPressHandlers = useLongPress({
    onLongPress: (e) => {
      e.preventDefault(); // Prevent context menu / text selection etc.
      onLongPress();
    },
    onClick: onClick,
  });

  const ariaLabel = label ? `Bead, labeled ${label}` : 'Bead';

  return (
    <div
      {...longPressHandlers}
      className={`${beadBaseClasses} ${beadSizeClasses} ${beadColorClasses}`}
      role="button"
      aria-label={ariaLabel}
      tabIndex={0} // Keep it focusable
      onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
        // Retain existing keyboard interaction for click, long press is mouse/touch only for now
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault(); 
          onClick(); // Standard click for keyboard users
        }
      }}
    >
      {label && (
        <span className="absolute text-slate-800 text-[10px] font-bold select-none pointer-events-none">
          {label}
        </span>
      )}
    </div>
  );
};

export default Bead;
