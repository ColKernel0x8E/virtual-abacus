
import React, { useState, useEffect } from 'react';
import Button from './Button';

interface LabelModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (label: string) => void;
  initialLabel?: string;
  beadIdentifier: string; // e.g., "Wire 1, Position 3"
}

const LabelModal: React.FC<LabelModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialLabel = '',
  beadIdentifier,
}) => {
  const [label, setLabel] = useState(initialLabel);

  useEffect(() => {
    setLabel(initialLabel);
  }, [initialLabel, isOpen]);

  if (!isOpen) {
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validate that label is a non-negative integer or empty
    if (label === '' || /^\d+$/.test(label)) {
        const labelToSubmit = label === '' ? '' : parseInt(label, 10).toString(); // Normalize (e.g. "05" to "5")
         onSubmit(labelToSubmit);
    } else {
      // Basic validation feedback, could be improved with a message
      alert("Label must be a non-negative integer or empty to remove.");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Allow only digits or empty string
    if (value === '' || /^\d*$/.test(value)) {
      setLabel(value);
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="label-modal-title"
    >
      <div 
        className="bg-slate-700 p-6 rounded-lg shadow-xl w-full max-w-md"
        onClick={(e) => e.stopPropagation()} // Prevent click inside modal from closing it
      >
        <h2 id="label-modal-title" className="text-2xl font-semibold text-amber-300 mb-4">
          Label Bead <span className="text-sky-300">{beadIdentifier}</span>
        </h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="beadLabelInput" className="block text-sm font-medium text-slate-300 mb-1">
            Enter non-negative integer label (or leave empty to remove):
          </label>
          <input
            id="beadLabelInput"
            type="text" // Use text to allow empty and manage digits via pattern/onChange
            value={label}
            onChange={handleInputChange}
            placeholder="e.g., 5 or 42"
            className="w-full px-3 py-2 bg-slate-600 text-white border border-slate-500 rounded-md focus:ring-sky-400 focus:border-sky-400 caret-sky-400"
            autoFocus
          />
          <div className="mt-6 flex justify-end space-x-3">
            <Button type="button" onClick={onClose} className="bg-slate-500 hover:bg-slate-400">
              Cancel
            </Button>
            <Button type="submit">
              {initialLabel && label === '' ? 'Remove Label' : 'Save Label'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LabelModal;
