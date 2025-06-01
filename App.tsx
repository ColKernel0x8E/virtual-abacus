
import React, { useState, useCallback } from 'react';
import Abacus from './components/Abacus';
import Button from './components/Button';
import { NUM_WIRES, INITIAL_BEADS_ON_LEFT, MAX_HISTORY_SIZE, BEADS_PER_WIRE } from './constants';

const App: React.FC = () => {
  const initialBeadsConfig = Array(NUM_WIRES).fill(INITIAL_BEADS_ON_LEFT);
  const [beadsConfig, setBeadsConfig] = useState<number[]>(initialBeadsConfig);
  const [history, setHistory] = useState<number[][]>([]);

  const handleBeadClick = useCallback((wireIndex: number, beadVisualIndex: number) => {
    setHistory(prevHistory => {
      const newHistoryStack = [...prevHistory, beadsConfig];
      if (newHistoryStack.length > MAX_HISTORY_SIZE) {
        return newHistoryStack.slice(newHistoryStack.length - MAX_HISTORY_SIZE);
      }
      return newHistoryStack;
    });

    setBeadsConfig(prevConfig => {
      const newConfig = [...prevConfig];
      const currentLeftCount = newConfig[wireIndex];

      if (beadVisualIndex < currentLeftCount) {
        // Clicked a bead in the left group: move it and beads to its right (within the left group) to the right side
        newConfig[wireIndex] = beadVisualIndex;
      } else {
        // Clicked a bead in the right group (or empty left group): move it and beads to its left (within the right group) to the left side
        newConfig[wireIndex] = beadVisualIndex + 1;
      }
      // Ensure bead count doesn't exceed BEADS_PER_WIRE or go below 0
      newConfig[wireIndex] = Math.max(0, Math.min(BEADS_PER_WIRE, newConfig[wireIndex]));
      return newConfig;
    });

    // Blur the active element to prevent focus styling from sticking to the wrong bead after re-render.
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  }, [beadsConfig]); // beadsConfig is a dependency because it's used in setHistory closure

  const handleUndo = useCallback(() => {
    if (history.length > 0) {
      const lastState = history[history.length - 1];
      setBeadsConfig(lastState);
      setHistory(prevHistory => prevHistory.slice(0, -1));
    }
  }, [history]);

  const handleReset = useCallback(() => {
    setBeadsConfig(initialBeadsConfig);
    setHistory([]); 
  }, [initialBeadsConfig]);

  return (
    <div className="flex flex-col items-center space-y-6 p-4 sm:p-8 min-h-screen w-full">
      <h1 className="text-4xl sm:text-5xl font-bold text-amber-300 tracking-tight shadow-sm">
        Virtual Abacus
      </h1>
      
      <Abacus beadsConfig={beadsConfig} onBeadClick={handleBeadClick} />

      <div className="flex space-x-4 mt-4">
        <Button onClick={handleUndo} disabled={history.length === 0}>
          Undo
        </Button>
        <Button onClick={handleReset}>
          Reset
        </Button>
      </div>
      <footer className="mt-auto pt-8 text-center text-slate-400 text-sm">
        <p>Click on a bead to move it and others in its group.</p>
        <p>&copy; {new Date().getFullYear()} AI Abacus Inc.</p>
      </footer>
    </div>
  );
};

export default App;
