
import React, { useState, useCallback } from 'react';
import Abacus from './components/Abacus';
import Button from './components/Button';
import LabelModal from './components/LabelModal';
import { NUM_WIRES, INITIAL_BEADS_ON_LEFT, MAX_HISTORY_SIZE, BEADS_PER_WIRE } from './constants';

const App: React.FC = () => {
  const initialBeadsConfig = Array(NUM_WIRES).fill(INITIAL_BEADS_ON_LEFT);
  const [beadsConfig, setBeadsConfig] = useState<number[]>(initialBeadsConfig);
  const [history, setHistory] = useState<number[][]>([]);

  // State for bead labels
  const [beadLabels, setBeadLabels] = useState<Record<string, string>>({}); // Key: "wireIndex-beadIndexOnWire"
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBeadInfo, setEditingBeadInfo] = useState<{
    wireIndex: number;
    beadIndexOnWire: number;
    currentLabel: string;
  } | null>(null);

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
        newConfig[wireIndex] = beadVisualIndex;
      } else {
        newConfig[wireIndex] = beadVisualIndex + 1;
      }
      newConfig[wireIndex] = Math.max(0, Math.min(BEADS_PER_WIRE, newConfig[wireIndex]));
      return newConfig;
    });

    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  }, [beadsConfig]);

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
    setBeadLabels({}); // Clear all bead labels
  }, [initialBeadsConfig]);

  // --- Labeling Logic ---
  const getLabelForBead = useCallback((wireIndex: number, beadIndexOnWire: number): string | undefined => {
    return beadLabels[`${wireIndex}-${beadIndexOnWire}`];
  }, [beadLabels]);

  const handleBeadLongPress = useCallback((wireIndex: number, beadIndexOnWire: number) => {
    const currentLabel = getLabelForBead(wireIndex, beadIndexOnWire) || '';
    setEditingBeadInfo({ wireIndex, beadIndexOnWire, currentLabel });
    setIsModalOpen(true);
  }, [getLabelForBead]);

  const handleModalClose = useCallback(() => {
    setIsModalOpen(false);
    setEditingBeadInfo(null);
  }, []);

  const handleLabelSubmit = useCallback((newLabel: string) => {
    if (editingBeadInfo) {
      const { wireIndex, beadIndexOnWire } = editingBeadInfo;
      const key = `${wireIndex}-${beadIndexOnWire}`;
      setBeadLabels(prevLabels => {
        const updatedLabels = { ...prevLabels };
        if (newLabel.trim() === '') {
          delete updatedLabels[key];
        } else {
          updatedLabels[key] = newLabel;
        }
        return updatedLabels;
      });
    }
    handleModalClose();
  }, [editingBeadInfo, handleModalClose]);
  // --- End Labeling Logic ---

  return (
    <div className="flex flex-col items-center space-y-6 p-4 sm:p-8 min-h-screen w-full">
      <h1 className="text-4xl sm:text-5xl font-bold text-amber-300 tracking-tight shadow-sm">
        Virtual Abacus
      </h1>
      
      <Abacus
        beadsConfig={beadsConfig}
        onBeadClick={handleBeadClick}
        onBeadLongPress={handleBeadLongPress}
        getLabelForBead={getLabelForBead}
      />

      <div className="flex space-x-4 mt-4">
        <Button onClick={handleUndo} disabled={history.length === 0}>
          Undo
        </Button>
        <Button onClick={handleReset}>
          Reset
        </Button>
      </div>

      {isModalOpen && editingBeadInfo && (
        <LabelModal
          isOpen={isModalOpen}
          onClose={handleModalClose}
          onSubmit={handleLabelSubmit}
          initialLabel={editingBeadInfo.currentLabel}
          beadIdentifier={`Wire ${editingBeadInfo.wireIndex + 1}, Bead ${editingBeadInfo.beadIndexOnWire + 1}`}
        />
      )}

      <footer className="mt-auto pt-8 text-center text-slate-400 text-sm">
        <p>Click bead to move. Long press bead to label.</p>
        <p>&copy; {new Date().getFullYear()} Col. Kernel</p>
      </footer>
    </div>
  );
};

export default App;
