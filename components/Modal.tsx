
import React from 'react';
import CloseIcon from './icons/CloseIcon';

interface ModalProps {
  show: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  showCloseButton?: boolean;
}

const Modal: React.FC<ModalProps> = ({ show, onClose, title, children, showCloseButton = true }) => {
  if (!show) {
    return null;
  }

  return (
    <div 
        className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in"
        style={{ animationDuration: '300ms' }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
    >
      <div 
        className="fixed inset-0 bg-black/70 z-40 transition-opacity"
        onClick={onClose}
      />
      <div
        className="relative z-50 w-full max-w-md bg-slate-800/90 p-6 md:p-8 rounded-xl border border-white/20 text-center shadow-2xl shadow-black/50"
      >
        <h3 id="modal-title" className="text-xl md:text-2xl font-bold text-white mb-4 tracking-wide">{title}</h3>
        <div className="text-sm md:text-base [&>p>strong]:font-bold [&>p>strong]:text-white/90">
          {children}
        </div>
        {showCloseButton && (
          <button
              onClick={onClose}
              className="absolute top-3 right-3 p-2 text-gray-400 hover:text-white transition-colors"
              aria-label="Close modal"
          >
              <CloseIcon />
          </button>
        )}
      </div>
    </div>
  );
};

export default Modal;
