
import React from 'react';
import Wire from './Wire';
import { NUM_WIRES } from '../constants';

interface AbacusProps {
  beadsConfig: number[]; // Array where each element is the count of beads on the left for that wire
  onBeadClick: (wireIndex: number, beadVisualIndex: number) => void;
  onBeadLongPress: (wireIndex: number, beadIndexOnWire: number) => void;
  getLabelForBead: (wireIndex: number, beadIndexOnWire: number) => string | undefined;
}

const Abacus: React.FC<AbacusProps> = ({ beadsConfig, onBeadClick, onBeadLongPress, getLabelForBead }) => {
  return (
    <div className="bg-amber-700 p-3 sm:p-5 rounded-lg shadow-xl inline-block border-4 border-amber-800">
      <div className="space-y-0.5 sm:space-y-1">
        {Array.from({ length: NUM_WIRES }).map((_, i) => (
          <Wire
            key={i}
            wireIndex={i}
            numBeadsOnLeft={beadsConfig[i]}
            onBeadClick={onBeadClick}
            onBeadLongPress={onBeadLongPress}
            getLabelForBead={getLabelForBead}
          />
        ))}
      </div>
    </div>
  );
};

export default Abacus;
