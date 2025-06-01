
import React from 'react';
import Bead from './Bead';
import { BEADS_PER_WIRE, GAP_WIDTH_TW_UNIT } from '../constants';

interface WireProps {
  wireIndex: number;
  numBeadsOnLeft: number;
  onBeadClick: (wireIndex: number, beadVisualIndex: number) => void;
}

const Wire: React.FC<WireProps> = ({ wireIndex, numBeadsOnLeft, onBeadClick }) => {
  return (
    <div className="flex items-center justify-center my-1 relative h-10 select-none">
      {/* The visual wire/rod */}
      <div className="absolute top-1/2 left-0 right-0 h-1.5 bg-slate-500 -translate-y-1/2 rounded-full -z-10 shadow"></div>
      
      <div className="flex items-center space-x-0"> {/* Left beads group */}
        {Array.from({ length: numBeadsOnLeft }).map((_, i) => (
          // `i` here is the absolute visual index of the bead (0 to numBeadsOnLeft - 1)
          <Bead 
            key={`bead-${wireIndex}-${i}`} 
            onClick={() => onBeadClick(wireIndex, i)} 
          />
        ))}
      </div>

      {/* Gap between left and right bead groups */}
      <div className={`w-${GAP_WIDTH_TW_UNIT} shrink-0`}></div>

      <div className="flex items-center space-x-0"> {/* Right beads group */}
        {Array.from({ length: BEADS_PER_WIRE - numBeadsOnLeft }).map((_, i) => {
          // The absolute visual index for a right bead is its position in the right group (i) + numBeadsOnLeft
          const beadVisualIndex = numBeadsOnLeft + i;
          return (
            <Bead 
              key={`bead-${wireIndex}-${beadVisualIndex}`} 
              onClick={() => onBeadClick(wireIndex, beadVisualIndex)} 
            />
          );
        })}
      </div>
    </div>
  );
};

export default Wire;