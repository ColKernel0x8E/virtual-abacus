
import React from 'react';
import Bead from './Bead';
import { BEADS_PER_WIRE, GAP_WIDTH_TW_UNIT } from '../constants';

interface WireProps {
  wireIndex: number;
  numBeadsOnLeft: number;
  onBeadClick: (wireIndex: number, beadVisualIndex: number) => void;
  onBeadLongPress: (wireIndex: number, beadIndexOnWire: number) => void;
  getLabelForBead: (wireIndex: number, beadIndexOnWire: number) => string | undefined;
}

const Wire: React.FC<WireProps> = ({ wireIndex, numBeadsOnLeft, onBeadClick, onBeadLongPress, getLabelForBead }) => {
  return (
    <div className="flex items-center justify-center my-1 relative h-10 select-none">
      {/* The visual wire/rod */}
      <div className="absolute top-1/2 left-0 right-0 h-1.5 bg-slate-500 -translate-y-1/2 rounded-full -z-10 shadow"></div>
      
      <div className="flex items-center space-x-0"> {/* Left beads group */}
        {Array.from({ length: numBeadsOnLeft }).map((_, i) => {
          const beadIndexOnWire = i;
          return (
            <Bead 
              key={`bead-${wireIndex}-${beadIndexOnWire}`} 
              onClick={() => onBeadClick(wireIndex, beadIndexOnWire)}
              onLongPress={() => onBeadLongPress(wireIndex, beadIndexOnWire)}
              label={getLabelForBead(wireIndex, beadIndexOnWire)}
            />
          );
        })}
      </div>

      {/* Gap between left and right bead groups */}
      <div className={`w-${GAP_WIDTH_TW_UNIT} shrink-0`}></div>

      <div className="flex items-center space-x-0"> {/* Right beads group */}
        {Array.from({ length: BEADS_PER_WIRE - numBeadsOnLeft }).map((_, i) => {
          const beadIndexOnWire = numBeadsOnLeft + i;
          return (
            <Bead 
              key={`bead-${wireIndex}-${beadIndexOnWire}`} 
              onClick={() => onBeadClick(wireIndex, beadIndexOnWire)} 
              onLongPress={() => onBeadLongPress(wireIndex, beadIndexOnWire)}
              label={getLabelForBead(wireIndex, beadIndexOnWire)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Wire;
